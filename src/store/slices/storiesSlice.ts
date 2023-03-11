import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status, StoriesState, StoryDetail } from "../../models/storiesModels"
import { fetchStoryItemAsyncAction, fetchTopStoriesAsyncAction } from "../asyncActions/storiesAsyncActions"

const initialState: StoriesState = {
  topStoryStatus: Status.PENDING,
  topStoryIds: [],
  storyDetails: []
}

const updateStories = (state: StoriesState, action: PayloadAction<{ isSuccess: boolean, topStoryIds: number[] }>) => {
  const { isSuccess, topStoryIds } = action.payload
  state.topStoryStatus = isSuccess ? Status.SUCCESS : Status.FAILED
  state.topStoryIds = topStoryIds
}

const updateStoriesRejected = (state: StoriesState) => {
  state.topStoryStatus = Status.FAILED
  state.topStoryIds = []
}

const updateStoryItems = (state: StoriesState, action: PayloadAction<{ storyDetails: StoryDetail[] }>) => {
  state.storyDetails = action.payload.storyDetails
}

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchTopStoriesAsyncAction.fulfilled, updateStories)
    builder.addCase(fetchTopStoriesAsyncAction.rejected, updateStoriesRejected)
    builder.addCase(fetchStoryItemAsyncAction.fulfilled, updateStoryItems)
  }
})

export default storiesSlice.reducer
