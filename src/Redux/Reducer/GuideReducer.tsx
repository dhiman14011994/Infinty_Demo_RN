
import { guidesKeys } from '../Constants/GuidesKeys';
import { GuideModl } from '../../Modals/GuidesModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  guidesList: [] as GuideModl[],
  similarGuides: [] as GuideModl[],
  bannerGuides: [] as GuideModl[],
  guidesDtls: undefined as any as GuideModl,
  similarGuideDtls: undefined as any as GuideModl,
}

export default function guidesReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        guidesList: [],
        similarGuides: [],
        bannerGuides: [],
        guidesDtls: undefined,
        similarGuideDtls: undefined,
      };

    case guidesKeys.SAVE_GUIDES_LIST:
      return {
        ...state,
        guidesList: action.payload
      };

    case guidesKeys.SAVE_GUIDE_BANNER:
      return {
        ...state,
        bannerGuides: action.payload
      };

    case guidesKeys.SAVE_SIMILAR_GUIDE:
      return {
        ...state,
        similarGuides: action.payload
      };

    case guidesKeys.SAVE_GUIDE_DTLS:
      return {
        ...state,
        guidesDtls: action.payload
      };

    case guidesKeys.SAVE_SIMILAR_GUIDE_DTLS:
      return {
        ...state,
        similarGuideDtls: action.payload
      };

    default:
      return state;
  }
}
