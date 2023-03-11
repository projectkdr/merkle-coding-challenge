import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Status } from '../../models/storiesModels'
import { fetchStoryDetailsAsyncAction, fetchTopStoriesAsyncAction } from '../../store/asyncActions/storiesAsyncActions'
import { AppDispatch, RootState } from '../../store/storeConfig'
import { ErrorMessage } from './../../constants/constant'

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { storyDetailsStatus, topStoryStatus } = useSelector((state: RootState) => state.stories)

  useEffect(() => {
    dispatch(fetchTopStoriesAsyncAction())
  }, [dispatch])

  useEffect(() => {
    if (topStoryStatus === Status.SUCCESS) {
      dispatch(fetchStoryDetailsAsyncAction())
    }
  }, [dispatch, topStoryStatus])

  return (
    <div>
      {topStoryStatus === Status.SUCCESS && storyDetailsStatus === Status.SUCCESS ? (
        <Outlet />
      ) : topStoryStatus === Status.FAILED || storyDetailsStatus === Status.FAILED ? (
        <h1>{ErrorMessage.DEFAULT}</h1>
      ) : null}
    </div>
  )
}

export default Layout
