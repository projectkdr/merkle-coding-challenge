# Hacker News Top Stories

This is a webpage that displays 10 random Hacker News stories using the Hacker News API. The stories are listed in ascending order based on their score. The UI includes the following information for each story:

- Story title
- Story URL
- Story timestamp
- Story score
- Author ID
- Author karma score
- A dummy image (not from API – just a static asset)

## Endpoints Used

- Top stories: `https://hacker-news.firebaseio.com/v0/topstories.json`
- Story item: `https://hacker-news.firebaseio.com/v0/item/${id}.json`
- User: `https://hacker-news.firebaseio.com/v0/user/${id}.json`

API documentation can be found at [https://github.com/HackerNews/API](https://github.com/HackerNews/API).

## Requirements

- UI must be responsive
- CSS must be compiled with a preprocessor
- Do not use a UI library or CSS framework

## Bonus Points

- Visual eye-candy and user experience
- Use a modern Javascript framework
- Use Typescript
