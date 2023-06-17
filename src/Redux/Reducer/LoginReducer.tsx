
import { combineReducers } from 'redux';
import loginKeys from '../Constants/LoginKeys';
import { commonKeys } from '../Constants/CommonKeys';
import { LoginModl, UserInfo } from '../../Modals/LoginModl';
import blogsReducer from './BlogsReducer';
import storyReducer from './StoriesReducer';
import workoutReducer from './WorkoutReducer';
import bannerReducer from './BannerReducer';
import forgotPwdReducer from './ForgotPwdReducer';
import mealReducer from './MealReducer';
import paymentReducer from './PaymentReducer';
import { isDate } from 'moment';
import commonReducer from './CommonReducer';
import { userProfileApi } from '../ReduxAPIHandler/LoginApis';
import guidesReducer from './GuideReducer';
import reminderReducer from './ReminderReducer';
import ReliefReducer from './ReliefReducer';


const INITIAL_STATE = {
  loginData: undefined as any as LoginModl,
  isLoaderVisible: false,
  userInfoStatus: false,
  isSignup: false,
  authError: undefined as any,
  userInfo: undefined as any as UserInfo,
}

export const saveLoginInfo = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    case loginKeys.LOGOUT:
      return {
        state: undefined,
      };

    case loginKeys.SAVE_TOKEN:

      let token = action.payload.success == undefined ? '' : action.payload.success.token;
      let type = action.payload.success == undefined ? '' : action.payload.success.type;
      let mealId = action.payload.success != undefined && action.payload.success.mealplan != null ? action.payload.success.mealplan : '';
      let workId = action.payload.success != undefined && action.payload.success.workoutplan != null ? action.payload.success.workoutplan : '';

      let loginData: LoginModl = {
        token: token,
        type: type,
        mealplan: mealId,
        workoutplan: workId,
      };
      return {
        ...state,
        loginData: loginData,
        isLoaderVisible: false,
      };

    case loginKeys.UPDATE_SIGNUP_STATUS:
      return { ...state, isSignup: action.payload.status, loginData: undefined };

    case loginKeys.SAVE_USER_INFO:
      return { ...state, userInfo: action.payload };

    case loginKeys.SAVE_USER_RESP:
      return { ...state, userInfoStatus: action.payload };

    case loginKeys.UPDATE_STEPS:
      let info = state.userInfo
      info.step_target = action.payload;
      return { ...state, userInfo: info };

    case commonKeys.API_FAILED:
      return { ...state, isLoaderVisible: false, authError: { data: '' }, };

    case commonKeys.API_START:
      return { ...state, isLoaderVisible: true };

    case commonKeys.API_SUCCESS:
      return { ...state, isLoaderVisible: false, authError: undefined };

    case loginKeys.ERROR:
      return {
        ...state,
        authError: action.payload,
        isLoaderVisible: false
      };

    default:
      return state;
  }
}

export default combineReducers({
  userInfo: saveLoginInfo,
  blogsData: blogsReducer,
  storiesData: storyReducer,
  workoutData: workoutReducer,
  bannerData: bannerReducer,
  pwdData: forgotPwdReducer,
  mealData: mealReducer,
  paymentData: paymentReducer,
  commonData: commonReducer,
  guidesData: guidesReducer,
  reminderData: reminderReducer,
  homeReliefData:ReliefReducer,
});
