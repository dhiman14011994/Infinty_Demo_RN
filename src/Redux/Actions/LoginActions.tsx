import loginKeys from "../Constants/LoginKeys";
import { commonKeys } from "../Constants/CommonKeys";

export const loginApi = (data: any) => ({
  type: loginKeys.LOGIN,
  payload: data,
});

export const socialLoginApi = (data: any) => ({
  type: loginKeys.SOCIAL_LOGIN,
  payload: data,
});

export const saveLoginInfo = (data: any) => ({
  type: loginKeys.SAVE_TOKEN,
  payload: data,
});

export const saveMealId = (data: any) => ({
  type: loginKeys.SAVE_MEAL_ID,
  payload: data,
});

export const apiSuccess = () => ({
  type: commonKeys.API_SUCCESS,
  payload: {},
});

export const errorLoginInfo = (data: any) => ({
  type: loginKeys.ERROR,
  payload: data,
});

export const getUserInfo = (data: any) => ({
  type: loginKeys.GET_USER_INFO,
  payload: data,
});

export const saveUserInfo = (data: any) => ({
  type: loginKeys.SAVE_USER_INFO,
  payload: data,
});

export const updateUserInfo = (data: any) => ({
  type: loginKeys.UPDATE_USER_INFO,
  payload: data,
});

export const saveUserResp = (data: any) => ({
  type: loginKeys.SAVE_USER_RESP,
  payload: data,
});

export const updateSignupStatus = (data: any) => ({
  type: loginKeys.UPDATE_SIGNUP_STATUS,
  payload: data,
});

export const updateSteps = (data: any) => ({
  type: loginKeys.UPDATE_STEPS,
  payload: data,
});

export const logout = () => ({
  type: loginKeys.LOGOUT,
  payload: {},
});



