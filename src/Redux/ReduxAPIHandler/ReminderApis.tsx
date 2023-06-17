import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert } from 'react-native';
import { Reminder, Notification } from '../../Modals/ReminderModl';
import { setReminderStatus, saveReminders, saveUserReminders, saveUserNotifications } from '../Actions/ReminderActions';
import { apiStart } from '../Actions/CommonActions';
import Moment from 'moment';

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Validate login API data and return a true/false
function vaildateParams(params: any) {
  var time1 = Moment(params.start_time, 'hh:mm a');
  var time2 = Moment(params.end_time, 'hh:mm a');
  if (params.start_time == '') {
    Alert.alert('Please select wake up time.')
    return false;
  }
  else if (params.end_time == '') {
    Alert.alert('Please select sleep time.')
    return false;
  }
  else if (time2.isBefore(time1)) {
    Alert.alert('Sleep time should be greater than wake up time.')
    return false;
  }
  else if (params.water_qty == '') {
    Alert.alert('Please select drinking cup size.')
    return false;
  }
  else if (params.time_interval == '') {
    Alert.alert('Please select reminder interval.')
    return false;
  }
  return true
}

//Add Card Api 
export function* addReminder(params: any, token: any) {
  if (vaildateParams(params)) {
    try {

      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
      yield put(apiStart())
      const response = yield RequestManager.postRequest(api.POST_ADD_REMINDER, params, header);
      yield put({ type: commonKeys.API_SUCCESS });
      yield put(setReminderStatus(true));
    } catch (e) {
      if (e.message != undefined) {
        Alert.alert('', e.message)
        yield put({ type: commonKeys.API_FAILED, message: e.message });
      }
      else {
        if (e.error == undefined) {
          Alert.alert('', e)
          yield put({ type: commonKeys.API_FAILED, message: e });
        }
        else {
          Alert.alert('', e.error)
          yield put({ type: commonKeys.API_FAILED, message: e.error });
        }
      }
    }
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Reminder List Api 
export function* getRemindersApi(params: any, token: any) {
  try {
    yield put(apiStart())
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    const response = yield RequestManager.postRequest(api.POST_GET_DATA, params, header);
    const modlData = yield setRemindersData(response.success)
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveReminders(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setRemindersData(response: any) {
  return await new Promise(function (resolve, reject) {
    let arr: Reminder[] = [];
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      let reminder: Reminder = {
        id: element.id,
        start_time: element.start_time,
        end_time: element.end_time,
        water_qty: element.water_qty,
        time_interval: element.time_interval,
        uid: element.uid,
      }
      arr.push(reminder)
    }
    resolve(arr)
  })
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Reminder List Api 
export function* getUserReminderApi(token: any) {
  try {
    yield put(apiStart())
    const response = yield RequestManager.getRequest(api.GET_REMINDERS, token);
    const modlData = yield setReminderData(response.success)
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveUserReminders(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setReminderData(response: any) {
  return await new Promise(function (resolve, reject) {
    let reminder: Reminder = {
      id: response.id,
      start_time: response.start_time == '' ? '00:00' : response.start_time,
      end_time: response.end_time == '' ? '00:00' : response.end_time,
      water_qty: response.water_qty,
      time_interval: response.time_interval,
      uid: response.uid,
    }
    resolve(reminder)
  })
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Notifications List Api 
export function* getUserNotificationsApi(params: any, token: any) {
  try {
    yield put(apiStart())
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    const response = yield RequestManager.postRequest(api.POST_GET_DATA, params, header);
    const modlData = yield setNotificationData(response.success)
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveUserNotifications(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setNotificationData(response: any) {
  return await new Promise(function (resolve, reject) {
    let arr: Notification[] = [];
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      let reminder: Notification = {
        id: element.id,
        description: element.description,
        read: element.read,
        title: element.title,
        uid: element.uid,
      }
      arr.push(reminder)
    }
    resolve(arr)
  })
}