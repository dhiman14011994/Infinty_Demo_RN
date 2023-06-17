
import storyKeys from '../Constants/StoriesKeys';
import { Story } from '../../Modals/StoriesModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  storyList: [] as Story[],
  similarStory: [] as Story[],
  bannerStory: [] as Story[],
  story: undefined as any as Story,
  similarDtls: undefined as any as Story,
  isLoaderVisible: false,
}

export default function storyReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        storyList: [],
        similarStory: [],
        bannerStory: [],
        story: undefined,
        similarDtls: undefined,
        isLoaderVisible: false,
      };

    case storyKeys.SAVE_STORIES:
      return {
        ...state,
        storyList: action.payload
      };

    case storyKeys.SAVE_SIMILAR_STORIES:
      return {
        ...state,
        similarStory: action.payload
      };

    case storyKeys.SAVE_BANNER_STORIES:
      return {
        ...state,
        bannerStory: action.payload
      };

    case storyKeys.SAVE_STORIES_DETAILS:
      return {
        ...state,
        story: action.payload
      };

    case storyKeys.SAVE_SIMILAR_STORIES_DETAILS:
      return {
        ...state,
        similarDtls: action.payload
      };

    default:
      return state;
  }
}
