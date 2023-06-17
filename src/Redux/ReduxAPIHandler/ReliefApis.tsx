import { put } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert } from 'react-native';

import { HomeRemedies, HomeRemediesDtls, ReliefExercise, ReliefExerciseDtls } from '../../Modals/ReliefModl';
import {
  saveHomeRemediesData,
  saveSrchHomeRemediesData,
  saveHomeRemedies,
  saveReliefExercise,
  saveReliefExerciseData,
  saveSrchReliefExerciseData
} from '../Actions/ReliefAction';
import { apiStart } from '../Actions/CommonActions';


export function* getHomeRemediesDataList(params: any, token: any, isCat: boolean) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const response = yield RequestManager.postRequest(api.POST_GET_DATA, params, header,);

    if (isCat) {
      const modlData = yield setHomeRemediesData(response.success);
      if (params.filters == undefined) {
        yield put(saveHomeRemediesData(modlData));
      } else {
        yield put(saveSrchHomeRemediesData(modlData));
      }
    } else {
      // const modlData = yield setReliefExerciseData(response.success);
      // if (params.filters == undefined) {
      //   yield put(saveReliefExerciseData(modlData));
      // } else {
      //   yield put(saveSrchReliefExerciseData(modlData));
      // }
    }
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setHomeRemediesData(response: any) {
  return await new Promise(function (resolve) {
    let HomeRemediesArr: HomeRemedies[] = [] as HomeRemedies[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let homeRemedies: HomeRemedies = {
        id: data.id,
        title: data.title,
        enabled: data.enabled,
        pace: data.pace == null ? '' : data.pace,
        equipment_req: data.equipment_req == null ? '' : data.equipment_req,
        image: data.image,
        duration: data.duration,
        videos:
          data.videos == null
            ? ''
            : data.videos.split('/')[data.videos.split('/').length - 1],
      };
      HomeRemediesArr.push(homeRemedies);
    }
    resolve(HomeRemediesArr);
  });
}

export function* getReliefExerciseDataList(params: any, token: any, isCat: boolean) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const response = yield RequestManager.postRequest(
      api.POST_GET_DATA,
      params,
      header,
    );

    if (isCat) {
      const modlData = yield setReliefExerciseData(response.success);
      if (params.filters == undefined) {
        yield put(saveReliefExerciseData(modlData));
      } else {
        yield put(saveSrchReliefExerciseData(modlData));
      }
    } else {
      // const modlData = yield setReliefExerciseData(response.success);
      // if (params.filters == undefined) {
      //   yield put(saveReliefExerciseData(modlData));
      // } else {
      //   yield put(saveSrchReliefExerciseData(modlData));
      // }
    }
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}


async function setReliefExerciseData(response: any) {
  return await new Promise(function (resolve) {
    let ReliefExerciseArr: ReliefExercise[] = [] as ReliefExercise[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let reliefExercise: ReliefExercise = {
        id: data.id,
        title: data.title,
        image: data.image,
        videos:
          data.videos == null
            ? ''
            : data.videos.split('/')[data.videos.split('/').length - 1],
        tags: data.tags,
        description: data.description,
        sub_title: data.sub_title,
      };
      ReliefExerciseArr.push(reliefExercise);
    }
    resolve(ReliefExerciseArr);
  });
}


// ReliefExercise and HomeRemedies details Api
export function* getReliefExerciseDetails(params: any, token: any,) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
    // yield put(apiStart());
    const response = yield RequestManager.postRequest(
      api.POST_GET_DATA_BY_ID,
      params,
      header,
    );
    const modlData = yield setReliefExerciseDetails(response.success);
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveReliefExercise(modlData));
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setReliefExerciseDetails(response: any) {
  return await new Promise(function (resolve) {
    let workout: ReliefExerciseDtls = {
      id: response.id,
      title: response.title,
      image: response.image,
      description: response.description,
      enabled: response.enabled,
      videos:
        response.videos == null
          ? ''
          : response.videos.split('/')[response.videos.split('/').length - 1],
      tags: response.tags,
      sub_title: response.sub_title,
    };
    resolve(workout);
  });
}


// ReliefExercise details Api


export function* getHomeRemediesDetails(params: any, token: any) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
    // yield put(apiStart());
    const response = yield RequestManager.postRequest(
      api.POST_GET_DATA_BY_ID,
      params,
      header,
    );
    const modlData = yield setHomeRemediesDetails(response.success);
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveHomeRemedies(modlData));
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setHomeRemediesDetails(response: any) {
  return await new Promise(function (resolve) {
    let workout: HomeRemediesDtls = {
      id: response.id,
      title: response.title,
      image: response.image,
      description: response.description,
      enabled: response.enabled,
      videos:
        response.videos == null
          ? ''
          : response.videos.split('/')[response.videos.split('/').length - 1],
      tags: response.tags,
    };
    resolve(workout);
  });
}


//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Releif Data
export async function getReliefDataList(params: any, token: any) {
  return await new Promise(async function (resolve) {

    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    await RequestManager.postRequest(api.POST_GET_DATA, params, header).then(async function (response: any) {
      let data = await setReliefExerciseData(response.success);
      resolve(data);
    })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching Releif Data
export async function getRemediesDataList(params: any, token: any) {
  return await new Promise(async function (resolve) {

    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    await RequestManager.postRequest(api.POST_GET_DATA, params, header).then(async function (response: any) {
      let data = await setHomeRemediesData(response.success);
      resolve(data);
    })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}
