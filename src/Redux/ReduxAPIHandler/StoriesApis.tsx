import { put } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert } from 'react-native';
import { Story } from '../../Modals/StoriesModl';
import { saveStoriesList, saveStoriesDetails, saveSimilarStories, saveSimilarStoriesDetails, saveBannerStories } from '../Actions/StoriesActions';


//Stories Api 
export function* getStoriesList(params: any, token: any, catType: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_GET_DATA, params, header);
    const modlData = yield setStoryData(response.success)
    if (catType == 1) {
      yield put(saveStoriesList(modlData));
    }
    else if (catType == 2) {
      yield put(saveSimilarStories(modlData));
    }
    else if (catType == 3) {
      yield put(saveBannerStories(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setStoryData(response: any) {
  return await new Promise(function (resolve, reject) {
    let storyArr: Story[] = [] as Story[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let story: Story = {
        id: data.id,
        title: data.title,
        description: data.description,
        tags: data.tags,
        enabled: data.enabled,
        pace: data.pace == null ? '' : data.pace,
        equipment_req: data.equipment_req == null ? '' : data.equipment_req,
        image: data.image,
      }
      storyArr.push(story);
    }
    resolve(storyArr)
  })
}
//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Story Detail Api 
export function* getStoriesDtls(params: any, token: any, catType: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header);
    const modlData = yield setStoryDtls(response.success)
    if(catType == 0) {
      yield put(saveStoriesDetails(modlData));
    }
    else {
      yield put(saveSimilarStoriesDetails(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setStoryDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let story: Story = {
      id: response.id,
      title: response.title,
      tags: response.tags,
      description: response.description,
      enabled: response.enabled,
      pace: response.pace == null ? '' : response.pace,
      equipment_req: response.equipment_req == null ? '' : response.equipment_req,
      image: response.image,
    }
    resolve(story)
  })
}