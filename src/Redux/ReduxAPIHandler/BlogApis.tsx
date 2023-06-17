import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert } from 'react-native';
import { Blogs } from '../../Modals/BlogsModl';
import { saveBlogList, saveBlogDetails, saveTrendBlogList, saveCatBlogList, saveSimilarBlogList, saveFeaturedBlogList, saveSimilarBlogDetails, saveBlogLike } from '../Actions/BlogsActions';
import { apiStart } from '../Actions/CommonActions';


//Blogs Api 
export function* getBlogsList(params: any, token: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    const response = yield RequestManager.postRequest(api.POST_GET_DATA, params, header);
    const modlData = yield setBlogsData(response.success)
    if (params.category == undefined) {
      yield put(saveBlogList(modlData));
    }
    else if (params.category == 4) {
      yield put(saveSimilarBlogList(modlData));
    }
    else if (params.category == 5) {
      yield put(saveTrendBlogList(modlData));
    }
    else if (params.category == 7) {
      
      yield put(saveFeaturedBlogList(modlData));
    }
    else {
      yield put(saveCatBlogList(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Blogs Api 
export function* getBlogDetail(params: any, token: any, type: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header);
    const modlData = yield setBlogData(response.success)

    if (type == 0) {
      yield put(saveBlogDetails(modlData));
    }
    else {
      yield put(saveSimilarBlogDetails(modlData));
    }

  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating blogs modl array from raw data
async function setBlogsData(response: any) {

  return await new Promise(function (resolve, reject) {
    let blogsArr: Blogs[] = [] as Blogs[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let blog: Blogs = {
        id: data.id,
        title: data.title,
        tags: data.tags,
        sub_title: data.sub_title,
        tag_line: data.tag_line,
        description: data.description,
        enabled: data.enabled,
        pace: data.pace,
        equipment_req: data.equipment_req == null ? '' : data.equipment_req,
        image: data.image,
        video_url: data.videos == null
      ? ''
      : data.videos.split('/')[data.video_url.split('/').length - 1],
      }
      blogsArr.push(blog);
    }
    resolve(blogsArr)
  })
}

//Creating blogs modl from raw data
async function setBlogData(response: any) {

  return await new Promise(function (resolve, reject) {
    let blog: Blogs = {
      id: response.id,
      title: response.title,
      sub_title: response.sub_title,
      tags: response.tags,
      tag_line: response.tag_line,
      description: response.description,
      enabled: response.enabled,
      pace: response.pace,
      equipment_req: response.equipment_req == null ? '' : response.equipment_req,
      image: response.image,
      video_url: response.videos == null
      ? ''
      : response.videos.split('/')[response.video_url.split('/').length - 1],
    }
    resolve(blog)
  })
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Blogs Api 
export function* addLike(params: any, token: any,) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    const response = yield RequestManager.postRequest(api.ADD_LIKE, params, header);
    yield put(saveBlogLike(response.success));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//----------------------------------------------------------------
//----------------------------------------------------------------
//Health Tips Api 
export async function getHealthTips(params: any, token: any) {
  return await new Promise(async function (resolve) {

    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    await RequestManager.postRequest(api.POST_GET_DATA, params, header).then(async function (response: any) {
      let data = await setBlogsData(response.success);
      resolve(data);
    })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}
