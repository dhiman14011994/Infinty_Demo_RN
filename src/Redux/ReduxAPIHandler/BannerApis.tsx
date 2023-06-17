/* eslint-disable eqeqeq */
import {put} from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import {commonKeys} from '../Constants/CommonKeys';
import {Alert} from 'react-native';
import {BannerModl} from '../../Modals/BannerModl';
import {
  saveDBBanner,
  saveWorkoutBanner,
  saveBlogsBanner,
  saveSuccessBanner,
} from '../Actions/BannerActions';

//DB Banners Api
export function* getBannerList(params: any, token: any, type: any) {
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
    const modlData = yield setBannerData(response.success);
    if (type == 0) {
      yield put(saveDBBanner(modlData));
    } else if (type == 1) {
      yield put(saveWorkoutBanner(modlData));
    } else if (type == 2) {
      yield put(saveBlogsBanner(modlData));
    } else if (type == 3) {
      yield put(saveSuccessBanner(modlData));
    } else if (type == 5) {
    }
  } catch (e) {
    Alert.alert('', e.error);
    yield put({type: commonKeys.API_FAILED, message: e.error});
  }
}

//----------------------------------------------------------------
//----------------------------------------------------------------
//Banners Api 
export async function getBanners(params: any, token: any) {
  return await new Promise(async function (resolve) {

    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    await RequestManager.postRequest(api.POST_GET_DATA, params, header).then(async function (response: any) {
      let data = await setBannerData(response.success);
      resolve(data);
    })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}

//Creating blogs modl array from raw data
async function setBannerData(response: any) {
  return await new Promise(function (resolve) {
    let bannerArr: BannerModl[] = [] as BannerModl[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let banner: BannerModl = {
        id: data.id,
        title: data.title,
        enabled: data.enabled,
        image: data.image,
        category_title: data.category_title,
        category_id: data.category_id,
        description: data.description,
        video_url:
          data.video_url == null
            ? ''
            : data.video_url.split('/')[data.video_url.split('/').length - 1],
      };
      bannerArr.push(banner);
    }
    resolve(bannerArr);
  });
}
