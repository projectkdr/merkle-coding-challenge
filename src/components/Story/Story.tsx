import React from 'react'
import { ReactComponent as ClockIcon } from '../../assets/img/icon-clock.svg'
import DummyImage from '../../assets/img/News_Dummy_Image.jpg'
import { StoryDetail } from '../../models/storiesModels'
import styles from './Story.module.scss'

const Story = ({ author, authorKarma, storyDate, storyScore, storyTitle, storyUrl }: StoryDetail) => {
    return (
        <div className="col-width">
            <div className={styles.container}>
                <div className="animation-range">
                    <div className={styles.image_wrapper}>
                        <a
                            href={storyUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className={styles.image}>
                                <img
                                    alt="Dummy Img"
                                    src={DummyImage}
                                />
                            </div>
                        </a>
                        <div className={styles.score}>{storyScore}</div>
                    </div>
                    <div className={styles.author}>
                        {author} - {authorKarma}
                    </div>
                    <div className={`title ${styles.title}`}>
                        <a
                            href={storyUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {storyTitle}
                        </a>
                    </div>
                    <div className={styles.date}>
                        <ClockIcon />
                        <span>{storyDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Story
