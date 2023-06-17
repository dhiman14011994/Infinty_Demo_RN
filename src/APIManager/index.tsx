
const axios = require('axios');
// import RNFetchBlob from 'rn-fetch-blob';
// import { DocumentPickerResponse } from 'react-native-document-picker';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

class RequestManager {
  //--------------------------------------------------
  //GET REQUEST WITH PARAMS
  static async getParamsRequest(url: any, token: string, parameters: any) {
    const instance = axios.create({
      baseURL: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        accept: 'application/json',
      }
    });

    console.log('API: ', url)

    console.log('\n API Parameters: ', parameters)

    return new Promise(function (resolve, reject) {
      instance.get(url, {
        params: parameters
      })
        .then(function (response: any) {
          console.log('API Response: ', response)
          resolve(response);
        })
        .catch(function (error: any) {
          console.log('Error2: ', error.response)
          if (error.response.data.message != undefined) {
            reject({ error: error.response.data.message })
          }
          else {
            reject(error.response.data)
          }
        })
        .finally(function () {
          console.log('Error: 0')
          reject('Something went wrong. Please try again later.');
        });
    });
  }
  //--------------------------------------------------
  //GET REQUEST WITHOUT PARAMS
  static async getRequest(url: any, token: string) {
    const instance = axios.create({
      baseURL: url,
      headers: {
        'Authorization': token != '' ? 'Bearer ' + token : '',
        accept: 'application/json',
      },
    });

    console.log('API: ', url)

    console.log('API Headers: ', {
      'Authorization': token != '' ? 'Bearer ' + token : '',
      accept: 'application/json',
    })

    return new Promise(function (resolve, reject) {
      instance.get(url)
        .then(function (response: any) {
          console.log('Response: ', response)
          resolve(response.data);
        })
        .catch(function (error: any) {
          console.log('Error1: ', error.response)
          if (error.response.data.message != undefined) {
            reject({ error: error.response.data.message })
          }
          else {
            reject(error.response.data);
          }
        })
        .finally(function () {
          console.log('Error: 0')
          reject('Something went wrong. Please try again later.');
        });
    });
  }
  //--------------------------------------------------
  //POST REQUEST
  static async postRequest(url: any, params: any, headers: any) {
    const instance = axios.create({
      baseURL: url,
      headers: headers,
    });

    console.log('API: ', url)
    console.log('\nHeader Parameters: ', headers)
    console.log('\nAPI Parameters: ', params)
    return await new Promise(function (resolve, reject) {
      instance.post(url, params)
        .then(function (response: any) {
          console.log('POST API Response: ', response)
          resolve(response.data)
        })
        .catch(function (error: any) {
          if (error.response.data == undefined) {
            console.log('Post API Error: ', error.response)
            reject({ error: "Something went wrong. Please try again later." })
          }
          else {
            console.log('Post API Error: ', error.response.data);
            if (error.response.data.message != undefined) {
              reject({ error: error.response.data.message })
            }
            else {
              reject(error.response.data)
            }
          }
        });
    });
  }
  //--------------------------------------------------
  //PUT REQUEST
  static async putRequest(url: any, params: any, token: any) {

    const instance = axios.create({
      baseURL: url,
      headers: {
        'Authorization': token != '' ? 'bearer ' + token : '',
        accept: 'application/json',
      },
    });

    console.log('API Headers: ', {
      'Authorization': token != '' ? 'bearer ' + token : '',
      accept: 'application/json',
    })
    console.log('API: ', url)
    console.log('\nAPI Parameters: ', params)
    return await new Promise(function (resolve, reject) {
      instance.put(url, params)
        .then(function (response: any) {
          console.log('PUT API Response: ', response)
          resolve(response)
        })
        .catch(function (error: any) {
          console.log('PUT API Error: ', error.response)
          reject(error.response.data.error)
        });
    });
  }
  //--------------------------------------------------
  //DELETE REQUEST
  static async deleteRequest(url: any, params: any, token: any) {

    console.log("start>> url", JSON.stringify(url));
    const instance = axios.create({
      baseURL: url,
      headers: {
        'Authorization': token != '' ? 'bearer ' + token : '',
        accept: 'application/json',
      },
    });

    console.log('API Headers: ', {
      'Authorization': token != '' ? 'bearer ' + token : '',
      accept: 'application/json',
    })

    console.log('API: ', url)
    console.log('\nAPI Parameters: ', params)
    return await new Promise(function (resolve, reject) {
      instance.delete(url, params)
        .then(function (response: any) {
          console.log('DELETE API Response: ', response)
          resolve(response.data)
        })
        .catch(function (error: any) {
          console.log('DELETE API Error: ', error.response)
          reject(error.response.data.error)
        });
    });
  }
  //--------------------------------------------------
  static async uploadImage(url: any, token: string, params: any[]) {

    console.log('API: ', url)
    console.log('PARAMS: ', params)
    console.log('HEADERS: ', {
      'Authorization': token != '' ? 'Bearer ' + token : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // otherHeader: "foo",
    });

    return await new Promise(function (resolve, reject) {
      RNFetchBlob.config({ timeout: 7000 }).fetch('POST', url, {
        'Authorization': token != '' ? 'Bearer ' + token : '',
      }, params).then((res) => {
        console.log("UPLOAD RESPONSE: ", res)
        // var data = JSON.parse(res.data)
        resolve(res)
      })
        .catch((err: any) => {
          reject(err)
          console.log("Upload Error: ", err)
        })
    })
  }
}


export default RequestManager;
