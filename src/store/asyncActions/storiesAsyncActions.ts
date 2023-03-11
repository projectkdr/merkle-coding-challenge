import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Status, StoryDetail, StoryItemData, UserData } from "../../models/storiesModels"
import { formatDate } from "../../utils/helperUtils"
import { asyncThunkWrapper } from "../../utils/reduxUtils"
import { RootState } from "../storeConfig"

const API_URL = 'https://hacker-news.firebaseio.com/v0'

/**
 * Fetches the top stories IDs from the Hacker News API and returns them.
 * @returns an object with `isSuccess` (whether the request was successful) and `topStories` (an array of story IDs).
*/
export const fetchTopStoriesAsyncAction = createAsyncThunk(
  'stories/fetchTopStoriesAsyncAction',
  async (_, thunkAPI) =>
    asyncThunkWrapper(thunkAPI, async () => {
      // Fetch the top story IDs
      const response = await axios.get(`${API_URL}/topstories.json`)
      // Return an object with the response status and the story IDs
      return {
        isSuccess: response.status === 200,
        topStoryIds: response.data
      }
    })
)

/**
 * Fetches 10 random stories from the top story ids.
 * @returns an array of story details
*/
export const fetchStoryDetailsAsyncAction = createAsyncThunk(
  'stories/fetchStoryDetailsAsyncAction',
  async (_, thunkAPI) =>
    asyncThunkWrapper(thunkAPI, async () => {

      // Get the current top story ids from the Redux store
      const topStoryIds = (thunkAPI.getState() as RootState).stories.topStoryIds

      // Select 10 random story IDs from the top stories list
      const randomStoryIds = []
      for (let i = 0; i < 10; i++) {
        // Generate a random index between 0 and the length of the topStories array
        const randomIndex = Math.floor(Math.random() * topStoryIds.length)
        randomStoryIds.push(topStoryIds[randomIndex])
      }

      // Fetch the details of each story using the fetchStoryItem function
      const storyDetails = (await Promise.all(randomStoryIds.map(fetchStoryItem)))
        // Remove any undefined items from the storyDetails array
        .filter(detail => detail.author !== Status.FAILED)
        // Sort the story items in asceding order using story score
        .sort((a, b) => a.storyScore - b.storyScore)

      return { storyDetails }
    })
)

/**
 * Fetches a story item with the given ID from the Hacker News API, including its author information.
 * @param itemId The ID of the story item to fetch.
 * @returns story detail
 */
const fetchStoryItem = async (itemId: number) => {
  try {
    // Fetch the story item JSON data from the API and parse it as a StoryItemData object.
    const storyItemResponse = await fetch(`${API_URL}/item/${itemId}.json`)
    const { by: userId, id: storyId, score, time, title, url } = await storyItemResponse.json() as StoryItemData

    // Checks storyItemResponse response status and throws error if not successful (status code is not 200).
    if (storyItemResponse.status !== 200) {
      throw (storyItemResponse)
    }
    // Fetch the author JSON data from the API and parse it as a UserData object.
    const userResponse = await fetch(`${API_URL}/user/${userId}.json`)

    // Checks userResponse response status and throws error if not successful (status code is not 200).
    if (userResponse.status !== 200) {
      throw (userResponse)
    }
    const { id, karma } = await userResponse.json() as UserData


    const storyDetail: StoryDetail = {
      author: id,
      authorKarma: karma,
      storyScore: score,
      storyDate: formatDate(time),
      storyTitle: title,
      storyUrl: url,
      storyId
    }

    return storyDetail
  } catch (error) {
    console.error(error)
    return {
      author: Status.FAILED,
      authorKarma: 0,
      storyScore: 0,
      storyDate: '',
      storyTitle: '',
      storyUrl: '',
      storyId: 0
    }
  }
}