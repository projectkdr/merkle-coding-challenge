import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status, StoriesState, StoryDetail } from "../../models/storiesModels"
import { fetchStoryDetailsAsyncAction, fetchTopStoriesAsyncAction } from "../asyncActions/storiesAsyncActions"

// Set Initial State
const initialState: StoriesState = {
  topStoryStatus: Status.PENDING,
  topStoryIds: [],
  storyDetailsStatus: Status.PENDING,
  storyDetails: []
}

// Updates state with top stories based on success or failure of API call.
const updateStories = (state: StoriesState, action: PayloadAction<{ isSuccess: boolean, topStoryIds: number[] }>) => {
  const { isSuccess, topStoryIds } = action.payload
  state.topStoryStatus = isSuccess ? Status.SUCCESS : Status.FAILED
  state.topStoryIds = topStoryIds
}

// Updates state when top stories API call fails.
const updateStoriesRejected = (state: StoriesState) => {
  state.topStoryStatus = Status.FAILED
  state.topStoryIds = []
}

// Updates state with individual story details.
const updateStoryDetails = (state: StoriesState, action: PayloadAction<{ storyDetails: StoryDetail[] }>) => {
  const { storyDetails } = action.payload
  state.storyDetails = storyDetails
  state.storyDetailsStatus = storyDetails.length > 0 ? Status.SUCCESS : Status.FAILED
}

// Creates a slice of the Redux store for stories, defines initial state and extra reducers for API calls.
const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchTopStoriesAsyncAction.fulfilled, updateStories)
    builder.addCase(fetchTopStoriesAsyncAction.rejected, updateStoriesRejected)
    builder.addCase(fetchStoryDetailsAsyncAction.fulfilled, updateStoryDetails)
  }
})

export default storiesSlice.reducer
