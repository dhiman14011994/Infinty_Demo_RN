import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import loginKeys from '../Constants/LoginKeys';
import { Alert } from 'react-native';
import validator from 'validator';
import { saveLoginInfo, errorLoginInfo, apiSuccess } from '../Actions/LoginActions';
import { apiStart } from '../Actions/CommonActions';
import { saveFOrgotPwdResp, saveVerifyforgotOtp, statusChangePwd } from '../Actions/ForgotPwdActions';


//Validate login API data and return a true/false
function vaildateLoginParams(params: any) {
  if (params.email.length > 0 && !validator.isEmail(params.email)) {
    Alert.alert('Please enter valid email.');
    return false;
  }
  else if (params.mobile.length > 0 && params.countryCode <= 0) {
    Alert.alert('Please enter country code.');
    return false;
  }
  else if (params.mobile.length > 0 && !validator.isMobilePhone(params.mobile)) {
    Alert.alert('Please enter valid a phone number.');
    return false;
  }
  return true
}


//Verify Otp 
export function* verifyForgotOtp(params: any) {
  yield put(apiStart())
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + params.token,
    }

    const response = yield RequestManager.postRequest(api.POST_VERIFY_FORGOT_OTP, {otp: params.otp}, header);
    yield put(saveLoginInfo(response));
    yield put(saveVerifyforgotOtp(true));
  } catch (e) {
    setTimeout(() => {
      Alert.alert('', e.error)
    }, 50);
    yield put(saveVerifyforgotOtp(false));
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}


//Send Otp 
export function* sendForgotPwdOtp(params: any) {
  yield put(apiStart())
  try {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    const response = yield RequestManager.postRequest(api.POST_FORGOT_PWD, params, header);
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveFOrgotPwdResp({ status: true, token: response.success.token }));
  } catch (e) {
    if (e.error.includes('HTTP 400')) {
      Alert.alert('Please enter a valid mobile number.')
    }
    else {
      Alert.alert('', e.error)
    }
    yield put({ type: commonKeys.API_FAILED, message: e.error });
    yield put(saveFOrgotPwdResp({ status: false, token: '' }));
  }
}

//Change Password 
export function* changePassword(data: any) {
  yield put(apiStart())
  let url: string = api.POST_CHANGE_FORGOT_PASSWORD;
  try {
    let header: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + data.token
    }
    if (data.isChange) {
      url = api.POST_CHANGE_PASSWORD;
    }
    const response = yield RequestManager.postRequest(url, data.params, header);
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(statusChangePwd(true));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e });
    yield put(statusChangePwd(false));
  }
}



