import blogsKeys from "../Constants/BlogsKeys";

export const saveBlogList = (data: any) => ({
  type: blogsKeys.SAVE_BLOGS,
  payload: data,
});

export const saveCatBlogList = (data: any) => ({
  type: blogsKeys.SAVE_CAT_BLOGS,
  payload: data,
});

export const saveSimilarBlogList = (data: any) => ({
  type: blogsKeys.SAVE_SIMILAR_BLOGS,
  payload: data,
});

export const saveTrendBlogList = (data: any) => ({
  type: blogsKeys.SAVE_TRENDING_BLOGS,
  payload: data,
});

export const saveFeaturedBlogList = (data: any) => ({
  type: blogsKeys.SAVE_FEATURED_BLOGS,
  payload: data,
});


export const getBlogDetails = (data: any) => ({
  type: blogsKeys.GET_BLOG_DETAILS,
  payload: data,
});

export const saveBlogDetails = (data: any) => ({
  type: blogsKeys.SAVE_BLOG_DETAILS,
  payload: data,
});

export const getSimilarBlogDetails = (data: any) => ({
  type: blogsKeys.GET_SIMILAR_BLOG_DETAILS,
  payload: data,
});

export const saveSimilarBlogDetails = (data: any) => ({
  type: blogsKeys.SAVE_SIMILAR_BLOG_DETAILS,
  payload: data,
});

export const addBlogLike = (data: any) => ({
  type: blogsKeys.ADD_BLOG_LIKE,
  payload: data,
});

export const saveBlogLike = (data: any) => ({
  type: blogsKeys.SAVE_BLOG_LIKE,
  payload: data,
});

export const getBlogLike = (data: any) => ({
  type: blogsKeys.GET_BLOG_LIKE,
  payload: data,
});