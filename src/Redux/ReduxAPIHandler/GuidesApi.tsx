import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { Alert } from 'react-native';
import { GuideModl } from '../../Modals/GuidesModl';


//Stories Api 
export async function getGuidesList(params: any, token: any) {

  return await new Promise(async function (resolve) {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    await RequestManager.postRequest(api.POST_GET_DATA, params, header).then(async function (response: any) {
      let data = await setGuidesData(response.success);
      resolve(data);
    })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
  });
}

//Creating stories modl array from raw data
async function setGuidesData(response: any) {
  return await new Promise(function (resolve, reject) {
    let storyArr: GuideModl[] = [] as GuideModl[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let story: GuideModl = {
        id: data.id,
        title: data.title,
        sub_title: data.sub_title,
        tag_line: data.tag_line,
        tags: data.tags,
        video_url: data.video_url,
        description: data.description,
        image: data.image,
        pdf: data.pdf,
      }
      storyArr.push(story);
    }
    resolve(storyArr)
  })
}
//-------------------------------------------------------------------------
//--------------------------------------------------------------------------
//Story Detail Api 
export async function getGuidesDtls(params: any, token: any) {
  return await new Promise(async function (resolve) {
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    await RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header).then(async function (response: any) {
      let data = await setGuieDtls(response.success);
      resolve(data);
    })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
  });
}

//Creating stories modl array from raw data
async function setGuieDtls(response: any) {
  return await new Promise(function (resolve, reject) {
    let story: GuideModl = {
      id: response.id,
      title: response.title,
      sub_title: response.sub_title,
      tag_line: response.tag_line,
      tags: response.tags,
      video_url: response.video_url,
      description: response.description,
      image: response.image,
      pdf: response.pdf,
    }
    resolve(story)
  })
}