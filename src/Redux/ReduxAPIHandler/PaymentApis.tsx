/* eslint-disable eqeqeq */
import {put} from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import {commonKeys} from '../Constants/CommonKeys';
import {Alert} from 'react-native';
import {CardModl, MyPlans} from '../../Modals/Payment';
import {
  saveCardResp,
  addCardResp,
  purchasePlanResp,
  removeCardResp,
} from '../Actions/PaymentActions';
import {apiStart} from '../Actions/CommonActions';
import Moment from 'moment';

//Card List Api
export function* getCardsList(token: any) {
  try {
    yield put(apiStart());
    const response = yield RequestManager.getRequest(api.GET_CARD, token);
    const modlData = yield setCardData(response.success);
    yield put(saveCardResp(modlData));
    yield put({type: commonKeys.API_SUCCESS});
  } catch (e) {
    if (e.error == 'No cards added!!') {
      yield put(saveCardResp([]));
      yield put({type: commonKeys.API_SUCCESS});
    } else {
      Alert.alert('', e.error);
      yield put({type: commonKeys.API_FAILED, message: e.error});
    }
  }
}

//Creating blogs modl array from raw data
async function setCardData(response: any) {
  return await new Promise(function (resolve) {
    let bannerArr: CardModl[] = [] as CardModl[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let banner: CardModl = {
        brand: data.brand,
        exp_month: data.exp_month,
        exp_year: data.exp_year,
        id: data.id,
        last4: data.last4,
      };
      bannerArr.push(banner);
    }
    resolve(bannerArr);
  });
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Validate login API data and return a true/false
function vaildateCardParams(params: any) {
  if (params.number.length <= 0) {
    Alert.alert('Please enter card number.');
    return false;
  } else if (params.number.length < 14) {
    Alert.alert('Please enter valid card number.');
    return false;
  } else if (params.cvc.length <= 0) {
    Alert.alert('Please enter cvv.');
    return false;
  } else if (params.cvc.length < 3) {
    Alert.alert('Please enter valid cvv.');
    return false;
  } else if (params.exp_month.length <= 0) {
    Alert.alert('Please enter expiry month.');
    return false;
  } else if (params.exp_month.length != 2) {
    Alert.alert('Please enter valid expiry month.');
    return false;
  } else if (params.exp_year.length <= 0) {
    Alert.alert('Please enter expiry year.');
    return false;
  } else if (params.exp_year.length != 2) {
    Alert.alert('Please enter valid expiry year.');
    return false;
  }
  return true;
}

//Add Card Api
export function* addCard(params: any, token: any) {
  if (vaildateCardParams(params)) {
    try {
      let header = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      };
      yield put(apiStart());
      yield RequestManager.postRequest(api.POST_ADD_CARD, params, header);
      yield put({type: commonKeys.API_SUCCESS});
      yield put(addCardResp(true));
    } catch (e) {
      console.log('ERROR: ', e);
      if (e.message != undefined) {
        Alert.alert('', e.message);
        yield put({type: commonKeys.API_FAILED, message: e.message});
      } else {
        if (e.error == undefined) {
          Alert.alert('', e);
          yield put({type: commonKeys.API_FAILED, message: e});
        } else {
          Alert.alert('', e.error);
          yield put({type: commonKeys.API_FAILED, message: e.error});
        }
      }
    }
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Meal Plan Detail Api
export function* purchasePlan(params: any, token: any) {
  try {
    yield put(apiStart());
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    yield RequestManager.postRequest(api.POST_PAYMENT, params, header);
    yield put(purchasePlanResp(true));
    yield put({type: commonKeys.API_SUCCESS});
  } catch (e) {
    Alert.alert('', e.error);
    yield put({type: commonKeys.API_FAILED, message: e.error});
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Remove Card
export function* removeCard(params: any, token: any) {
  try {
    yield put(apiStart());
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    yield RequestManager.postRequest(api.REMOVE_CARD, params, header);
    yield put(removeCardResp(true));
    yield put({type: commonKeys.API_SUCCESS});
  } catch (e) {
    Alert.alert('', e.error);
    yield put({type: commonKeys.API_FAILED, message: e.error});
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Plans Data
export async function getMyPlans(token: any) {
  return await new Promise(async function (resolve) {
    await RequestManager.getRequest(api.GET_MY_PLANS, token)
      .then(async function (response: any) {
        let data = await myPlans(response.success);
        resolve(data);
      })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}

//Plans Data
export async function myPlans(response: any) {
  return await new Promise(function (resolve) {
    let plansArr: MyPlans[] = [] as MyPlans[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let plan: MyPlans = {
        start_date: Moment(data.start_date).format('DD/MM/yyyy'),
        end_date: Moment(data.end_date).format('DD/MM/yyyy'),
        duration: data.duration,
        plan_type: data.plan_type,
      };
      plansArr.push(plan);
    }
    resolve(plansArr);
  });
}
