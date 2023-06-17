import storyKeys from "../Constants/StoriesKeys";

export const saveStoriesList = (data: any) => ({
  type: storyKeys.SAVE_STORIES,
  payload: data,
});

export const getStoriesDetails = (data: any) => ({
  type: storyKeys.GET_STORIES_DETAILS,
  payload: data,
});

export const saveStoriesDetails = (data: any) => ({
  type: storyKeys.SAVE_STORIES_DETAILS,
  payload: data,
});

export const getSimilarStoriesDetails = (data: any) => ({
  type: storyKeys.GET_SIMILAR_STORIES_DETAILS,
  payload: data,
});

export const saveSimilarStoriesDetails = (data: any) => ({
  type: storyKeys.SAVE_SIMILAR_STORIES_DETAILS,
  payload: data,
});

export const getSimilarStories = (data: any) => ({
  type: storyKeys.GET_SIMILAR_STORIES,
  payload: data,
});

export const saveSimilarStories = (data: any) => ({
  type: storyKeys.SAVE_SIMILAR_STORIES,
  payload: data,
});

export const getBannerStories = (data: any) => ({
  type: storyKeys.GET_BANNER_STORIES,
  payload: data,
});

export const saveBannerStories = (data: any) => ({
  type: storyKeys.SAVE_BANNER_STORIES,
  payload: data,
});