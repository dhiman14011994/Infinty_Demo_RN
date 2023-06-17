
import blogsKeys from '../Constants/BlogsKeys';
import { Blogs } from '../../Modals/BlogsModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  blogsList: [] as Blogs[],
  catBlogsList: [] as Blogs[],
  featuredBlogsList: [] as Blogs[],
  similarReads: [] as Blogs[],
  treandingReads: [] as Blogs[],
  blogDetail: undefined as any as Blogs,
  similarBlogDtl: undefined as any as Blogs,
  isLoaderVisible: false,
  isLiked: 0,
}

export default function blogsReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {

    case loginKeys.LOGOUT:
      return {
        blogsList: [],
        catBlogsList: [],
        featuredBlogsList: [],
        similarReads: [],
        treandingReads: [],
        blogDetail: undefined,
        similarBlogDtl: undefined,
        isLoaderVisible: false,
        isLiked: 0,
      };

    case blogsKeys.SAVE_BLOGS:
      return {
        ...state,
        blogsList: action.payload
      };

    case blogsKeys.SAVE_CAT_BLOGS:
      return {
        ...state,
        catBlogsList: action.payload
      };

    case blogsKeys.SAVE_FEATURED_BLOGS:
      return {
        ...state,
        featuredBlogsList: action.payload
      };

    case blogsKeys.SAVE_SIMILAR_BLOGS:
      return {
        ...state,
        similarReads: action.payload
      };

    case blogsKeys.SAVE_TRENDING_BLOGS:
      return {
        ...state,
        treandingReads: action.payload
      };

    case blogsKeys.SAVE_BLOG_DETAILS:
      return {
        ...state,
        blogDetail: action.payload
      };

    case blogsKeys.SAVE_SIMILAR_BLOG_DETAILS:
      return {
        ...state,
        similarBlogDtl: action.payload
      };


    case blogsKeys.SAVE_BLOG_LIKE:
      return {
        ...state,
        isLiked: action.payload
      };

    default:
      return state;
  }
}
