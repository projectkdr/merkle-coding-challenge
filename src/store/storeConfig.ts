import { configureStore } from "@reduxjs/toolkit";
import storiesSlice from "./slices/storiesSlice"

export type AppGetState = typeof store.getState
export type RootState = ReturnType<AppGetState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    stories: storiesSlice
  }
})

export default store