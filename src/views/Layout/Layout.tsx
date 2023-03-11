import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Status } from '../../models/storiesModels'
import { fetchStoryItemAsyncAction, fetchTopStoriesAsyncAction } from '../../store/asyncActions/storiesAsyncActions'
import { AppDispatch, RootState } from '../../store/storeConfig'

const Layout = () => {
    const dispatch = useDispatch<AppDispatch>()
    const topStoryStatus = useSelector((state: RootState) => state.stories.topStoryStatus)

    const [isAllStoriesDataLoader, setIsAllStoriesDataLoader] = useState(false)

    useEffect(() => {
        dispatch(fetchTopStoriesAsyncAction())
        console.log('Layout test')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (topStoryStatus === Status.SUCCESS) {
            dispatch(fetchStoryItemAsyncAction())
            setIsAllStoriesDataLoader(true)
        }
    }, [dispatch, topStoryStatus])

    return (
        <div>
            {/* <Header /> */}
            {topStoryStatus === Status.SUCCESS && isAllStoriesDataLoader && <Outlet />}
        </div>
    )
}

export default Layout
