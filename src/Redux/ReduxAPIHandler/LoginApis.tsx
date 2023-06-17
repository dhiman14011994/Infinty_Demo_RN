import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import loginKeys from '../Constants/LoginKeys';
import { Alert } from 'react-native';
import validator from 'validator';
import { saveLoginInfo, errorLoginInfo, apiSuccess, saveUserInfo, saveUserResp, updateSignupStatus } from '../Actions/LoginActions';
import { apiStart } from '../Actions/CommonActions';
import { UserInfo } from '../../Modals/LoginModl';
import { saveFOrgotPwdResp } from '../Actions/ForgotPwdActions';


//Validate login API data and return a true/false
function vaildateLoginParams(params: any) {

  let isEmail = !/^[^a-zA-Z@]*$/.test(params.email)
  if (params.email.length <= 0) {
    Alert.alert('Please enter email or mobile number.');
    return false;
  }
  else if (isEmail && !validator.isEmail(params.email)) {
    Alert.alert('Please enter valid email.');
    return false;
  }
  else if (params.password.length <= 0) {
    Alert.alert('Please enter password.');
    return false;
  }
  return true
}

//Login Api 
export function* loginUser(params: any) {
  if (vaildateLoginParams(params)) {
    try {

      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      let isEmail = !/^[^a-zA-Z@]*$/.test(params.email)
      let param = {} as any;
      param['password'] = params.password
      if (isEmail) {
        param['email'] = params.email
      }
      else {
        param['mobile'] = params.email
      }

      yield put(apiStart())
      const response = yield RequestManager.postRequest(api.POST_LOGIN, param, header);

      yield put(saveLoginInfo(response));
    } catch (e) {
      Alert.alert('', e.error)
      yield put({ type: commonKeys.API_FAILED, message: e.error });
    }
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Validate login API data and return a true/false
function vaildateSignupParams(params: any) {
  if (params.name.length <= 0) {
    Alert.alert('Please enter name.');
    return false;
  }
  else if (params.email.length <= 0) {
    Alert.alert('Please enter email.');
    return false;
  }
  else if (!validator.isEmail(params.email)) {
    Alert.alert('Please enter valid email.');
    return false;
  }
  else if (params.countryCode <= 0) {
    Alert.alert('Please enter country code.');
    return false;
  }
  else if (!validator.isMobilePhone(params.mobile)) {
    Alert.alert('Please enter valid a phone number.');
    return false;
  }
  else if (params.password.length <= 0) {
    Alert.alert('Please enter password.');
    return false;
  }
  return true
}

//SignupApi 
export function* signupUser(params: any) {
  if (vaildateSignupParams(params)) {
    yield put(apiStart())
    try {
      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      const response = yield RequestManager.postRequest(api.POST_SIGNUP, params, header);
      yield put(updateSignupStatus({status: true, token: response.success.token}));
      yield put(saveLoginInfo(response));
      yield put(saveFOrgotPwdResp({ status: true, token: response.success.token }));
      yield put({ type: commonKeys.API_SUCCESS });
    } catch (e) {
      // Alert.alert('', e)
      if (typeof e.error === 'string') {
        if (e.error.includes('HTTP 400')) {
          Alert.alert('Please enter a valid mobile number.')
        }
        else {
          Alert.alert('', e.error)
        }
        yield put({ type: commonKeys.API_FAILED, message: e.error });
      }
      else {
        yield put(errorLoginInfo(e.form_error));
      }
    }
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Verify Otp 
export function* verifyOtp(params: any) {
  // yield put(apiStart())
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + params.token,
    }

    const response = yield RequestManager.postRequest(api.POST_VERIFY_OTP, {otp: params.otp}, header);
    yield put(saveLoginInfo(response));
  } catch (e) {
    setTimeout(() => {
      Alert.alert('', e.error)
    }, 50);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Verify Otp 
export function* resendOtp(token: any) {
  yield put(apiStart())
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    const response = yield RequestManager.postRequest(api.POST_RESEND_OTP, {}, header);
    yield put({ type: commonKeys.API_SUCCESS });
  } catch (e) {
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//Social Login Api 
export function* socialLogin(params: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    yield put(apiStart())
    const response = yield RequestManager.postRequest(api.POST_SOCIAL_LOGIN, params, header);

    yield put(saveLoginInfo(response));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//MCQ List Api 
export function* userProfileApi(token: any) {
  try {
    const response = yield RequestManager.getRequest(api.GET_USER_PROFILE, token);
    const modlData = yield setUserData(response.success)
    yield put(saveUserInfo(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setUserData(response: any) {
  return await new Promise(function (resolve, reject) {
    let userInfo: UserInfo = {
      id: response.id,
      image: response.image == undefined ? '' : response.image,
      name: response.name == null ? '' : response.name,
      email: response.email == null ? '' : response.email,
      email_verified_at: response.email_verified_at == null ? '' : response.email_verified_at,
      provider: response.provider == null ? '' : response.provider,
      provider_id: response.provider_id == null ? '' : response.provider_id,
      mobile: response.mobile == null ? '' : response.mobile,
      age: response.age == null ? '' : response.age,
      gender: response.gender == null ? '' : response.gender,
      height: response.height == null ? '' : response.height,
      weight: response.weight == null ? '' : response.weight,
      stripe_customer_id: response.stripe_customer_id == null ? '' : response.stripe_customer_id,
      created_at: response.created_at == null ? '' : response.created_at,
      updated_at: response.created_at == null ? '' : response.created_at,
      country_code: response.country_code == null ? '' : response.country_code,
      dob: response.dob == null ? '' : response.dob,
      plan_id: response.plan_id == null ? '' : response.plan_id ,
      step_target: response.step_target == null ? 0 : response.step_target,
      verified: response.verified == null ? '' : response.verified,
      fat: response.fat == null ? '' : response.fat,
      carbs: response.carbs == null ? '' : response.carbs,
      protien: response.protien == null ? '' : response.protien,
      total_calories: response.total_calories == null ? '' : response.total_calories,
      meal_plan_id: response.meal_plan_id == null ? '' : response.meal_plan_id,
      workout_plan_id: response.workout_plan_id == null ? '' : response.workout_plan_id,
    }
    resolve(userInfo)
  })
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Validate login API data and return a true/false
function vaildateUSerInfo(params: any) {
  if (params.height.length <= 0) {
    Alert.alert('Please enter height.');
    return false;
  }
  else if (params.weight.length <= 0) {
    Alert.alert('Please enter weight.');
    return false;
  }
  else if (params.dob.length <= 0) {
    Alert.alert('Please enter date of birth.');
    return false;
  }
  return true
}

function vaildateUSerCompleteInfo(params: any) {
  if(params.name.length <= 0) {
    Alert.alert('Please enter name.');
    return false;
  }
  // else if(params.email.length <= 0) {
  //   Alert.alert('Please enter email.');
  //   return false;
  // }
  // else if (!validator.isEmail(params.email)) {
  //   Alert.alert('Please enter valid email.');
  //   return false;
  // }
  // else if (!validator.isMobilePhone(params.mobile)) {
  //   Alert.alert('Please enter valid a phone number.');
  //   return false;
  // }
  // else if (params.weight.length <= 0) {
  //   Alert.alert('Please enter weight.');
  //   return false;
  // }
  // else if(params.height.length <= 0) {
  //   Alert.alert('Please enter height.');
  //   return false;
  // }
  // else if(params.gender.length <= 0) {
  //   Alert.alert('Please enter gender.');
  //   return false;
  // }
 
  return true
}

//SignupApi 
export function* updateUserInfo(params: any, token: any, isSingle: boolean, isEdit: boolean) {
  let isValid: boolean = isSingle ? true : isEdit ? vaildateUSerCompleteInfo(params) : vaildateUSerInfo(params);
  if (isValid) {
    yield put(apiStart())
    try {
      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
      const response = yield RequestManager.postRequest(api.GET_UPDATE_USER_INFO, params, header);
      yield put(saveUserResp(true));
      yield put({ type: commonKeys.API_SUCCESS });
    } catch (e) {
      Alert.alert('', e.error)
      yield put({ type: commonKeys.API_FAILED, message: e.error });
    }
  }
}