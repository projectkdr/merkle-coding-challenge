
export type StoriesState = {
  topStoryStatus: Status,
  topStoryIds: number[],
  storyDetailsStatus: Status,
  storyDetails: StoryDetail[]
}

export type StoryDetail = {
  author: string,
  authorKarma: number,
  storyScore: number,
  storyDate: string,
  storyTitle: string,
  storyUrl: string,
  storyId: number
}

export type StoryItemData = {
  by: string,
  id: number,
  score: number,
  time: number,
  title: string,
  url: string
}

export type UserData = {
  about: string,
  created: number,
  id: string,
  karma: number,
  submitted: number[]
}

export enum Status {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}