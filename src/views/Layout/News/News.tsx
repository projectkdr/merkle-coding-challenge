import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/storeConfig'
import Story from '../../../components/Story/Story'
import styles from './News.module.scss'
const News = () => {
    const storyDetails = useSelector((state: RootState) => state.stories.storyDetails)

    return (
        <>
            <div className={styles.header_container}>
                <div className="container">
                    <div className={styles.header}>{'Hacker News Stories'}</div>
                </div>
            </div>
            <div className="container">
                <div className={styles.row}>
                    {storyDetails.map(storyDetail => (
                        <Story
                            key={storyDetail.author}
                            {...storyDetail}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default News
