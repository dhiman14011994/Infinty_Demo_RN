import bannerKeys from '../Constants/BannerKeys';
import {BannerModl} from '../../Modals/BannerModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  dbBanners: [] as BannerModl[],
  workoutBanners: [] as BannerModl[],
  blogsBanners: [] as BannerModl[],
  storiesBanners: [] as BannerModl[],
  shopBanners: [] as BannerModl[],
};

export default function bannerReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        dbBanners: [],
        workoutBanners: [],
        blogsBanners: [],
        storiesBanners: [],
        shopBanners: [],
      };

    case bannerKeys.SAVE_DB_BANNER:
      return {
        ...state,
        dbBanners: action.payload,
      };

    case bannerKeys.SAVE_WORKOUT_BANNER:
      return {
        ...state,
        workoutBanners: action.payload,
      };

    case bannerKeys.SAVE_BLOGS_BANNER:
      return {
        ...state,
        blogsBanners: action.payload,
      };

    case bannerKeys.SAVE_STORIES_BANNER:
      return {
        ...state,
        storiesBanners: action.payload,
      };

    case bannerKeys.SAVE_SHOP_BANNER:
      return {
        ...state,
        shopBanners: action.payload,
      };

    default:
      return state;
  }
}
