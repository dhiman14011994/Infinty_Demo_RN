import bannerKeys from "../Constants/BannerKeys";

export const getDBBanner = (data: any) => ({
  type: bannerKeys.GET_DB_BANNER,
  payload: data,
});

export const saveDBBanner = (data: any) => ({
  type: bannerKeys.SAVE_DB_BANNER,
  payload: data,
});

export const saveWorkoutBanner = (data: any) => ({
  type: bannerKeys.SAVE_WORKOUT_BANNER,
  payload: data,
});

export const saveBlogsBanner = (data: any) => ({
  type: bannerKeys.SAVE_BLOGS_BANNER,
  payload: data,
});

export const saveSuccessBanner = (data: any) => ({
  type: bannerKeys.SAVE_STORIES_BANNER,
  payload: data,
});


