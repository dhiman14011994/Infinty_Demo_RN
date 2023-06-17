import { put } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert } from 'react-native';
import {
  MCQModl,
  Answer,
  TransactionModl,
  TransactionDtlsModl,
} from '../../Modals/CommonModl';
import {
  apiStart,
  saveTransaction,
  savePolicy,
  saveHelp,
  saveTransactionDtls,
} from '../Actions/CommonActions';

//MCQ List Api
export async function getMCQList( token: any, endPoint: any) {
  return await new Promise(async function (resolve) {
    await RequestManager.getRequest(api.GET_QUESTIONS_ANSWER + endPoint, token)
      .then(function (response: any) {
        resolve(setMCQData(response.success));
      })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}


//Creating blogs modl array from raw data
async function setMCQData(response: any) {
  return await new Promise(function (resolve) {
    let mcqArr: MCQModl[] = [] as MCQModl[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let answers = [] as Answer[];

      for (let j = 0; j < data.answers.length; j++) {
        let item = data.answers[j];
        let answer: Answer = {
          id: item.id,
          title: item.title,
          resource_url: item.resource_url,
          isSelected: false,
        };
        answers.push(answer);
      }

      let mcq: MCQModl = {
        id: data.id,
        title: data.title,
        answers: answers,
      };
      mcqArr.push(mcq);
    }
    resolve(mcqArr);
  });
}
//----------------------------------------------------------
//----------------------------------------------------------
//Transaction ListApi
export function* getTransactions(token: any) {
  try {
    yield put(apiStart());
    const response = yield RequestManager.getRequest(
      api.GET_TRANSACTIONS,
      token,
    );

    const modlData = yield setTransData(response.success);
    yield put(saveTransaction(modlData));
    yield put({ type: commonKeys.API_SUCCESS });
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating blogs modl array from raw data
async function setTransData(response: any) {
  return await new Promise(function (resolve) {
    let transArr: TransactionModl[] = [] as TransactionModl[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];

      let trans: TransactionModl = {
        id: data.id,
        title: data.title,
        plan_id: data.plan_id,
        created_at: data.created_at,
        order_id: data.order_id,
        plan_type: data.plan_type,
        transaction_amount: data.transaction_amount,
        transaction_currency: data.transaction_currency,
        transaction_identifier: data.transaction_identifier,
      };
      transArr.push(trans);
    }
    resolve(transArr);
  });
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//Get Categories Api
export function* getTermsFAQ(params: any) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + params.token,
    };

    yield put(apiStart());
    const response = yield RequestManager.postRequest(
      api.POST_GET_DATA_BY_ID,
      params.params,
      header,
    );
    switch (params.type) {
      case 1:
        yield put(savePolicy(response.success.description));
        break;

      case 2:
        yield put(saveHelp(response.success.description));
        break;

      default:
        break;
    }
    yield put({ type: commonKeys.API_SUCCESS });
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//----------------------------------------------------------
//----------------------------------------------------------
//Transaction ListApi
export function* getTransactionDtls(token: any, endPoint: string) {
  try {
    yield put(apiStart());
    const response = yield RequestManager.getRequest(
      api.GET_TRANSACTION + endPoint,
      token,
    );

    const modlData = yield setTranData(response.success);
    yield put(saveTransactionDtls(modlData));
    yield put({ type: commonKeys.API_SUCCESS });
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating blogs modl array from raw data
async function setTranData(response: any) {
  return await new Promise(function (resolve) {
    let trans: TransactionDtlsModl = {
      id: response.id,
      title: response.title,
      plan_id: response.plan_id,
      created_at: response.created_at,
      order_id: response.order_id,
      plan_type: response.plan_type,
      transaction_amount: response.transaction_amount,
      transaction_currency: response.transaction_currency,
      start_date: response.start_date,
      end_date: response.end_date,
      duration: response.duration,
      transaction_identifier: response.transaction_identifier,
    };
    resolve(trans);
  });
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Delete Account
export async function redeemApi(token: any) {
  return await new Promise(async function (resolve) {
    await RequestManager.getRequest(api.GET_DELETE_ACCOUNT, token)
      .then(function (response: any) {
        resolve(response);
      })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Delete Account
export async function updateUserImage(token: string, params: any[]) {
  return await new Promise(async function (resolve) {
    await RequestManager.uploadImage(api.POST_UPLOAD_AVATAR, token, params)
      .then(function (response: any) {
        resolve(response);
      })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}
