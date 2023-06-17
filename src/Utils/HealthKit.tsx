import React, { Component } from 'react';
import AppleHealthKit from 'rn-apple-healthkit';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import RequestManager from '../APIManager';
import api from '../Constants/API';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Platform } from 'react-native';
import Moment from 'moment';

//Get Steps
export function getSteps() {
  return new Promise(function (resolve, reject) {
    if (Platform.OS === 'ios') {
      resolve(appleHealthSteps());
    }
    else {
      resolve(googleFitSteps());
    }
  })
}


//Fetching steps count from  
export function appleHealthSteps() {

  return new Promise(function (resolve, reject) {

    let options = {
      permissions: {
        read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
        write: []
      }
    };

    AppleHealthKit.initHealthKit(options, (err: Object, res: Object) => {
      if (err) {
        resolve(0)
        return;
      }
      AppleHealthKit.getStepCount(null, (err, results) => {
        if (results == undefined) {
          resolve(0)
        }
        else {
          resolve(results.value)
        }
      });
    });
  })
}

export async function googleFitSteps() {

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_BODY_READ,
    ],
  }

  return new Promise(function (resolve, reject) {
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          GoogleFit.getDailySteps()
            .then((res) => {
              if (res.length >= 3) {
                if (res[2].steps.length > 0) {
                  resolve(res[2].steps[0].value)
                }
                else {
                  resolve(0)
                }
              }
              resolve(0)
            })
            .catch((err) => { console.warn(err), resolve(0) })

        } else {
          console.log("AUTH_DENIED", authResult);
          resolve(0)
        }
      })
      .catch(() => {
        resolve(0)
        console.log("AUTH_ERROR");
      })
  })
}


//Get Steps
export function getWeeklySteps() {
  return new Promise(function (resolve, reject) {
    if (Platform.OS === 'ios') {
      resolve(appleHealthWeeklySteps(1));
    }
    else {
      resolve(googleFitWeeklSteps());
    }
  })
}


//Fetching steps count from  
export function appleHealthWeeklySteps(day: number) {

  return new Promise(function (resolve, reject) {
    let options = {
      permissions: {
        read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
        write: []
      }
    };

    AppleHealthKit.initHealthKit(options, async (err: Object, res: Object) => {
      if (err) {
        resolve([])
        return;
      }
      else {
        await generateSteps(day, [], resolve);
      }
    });
  })
}

function generateSteps(dayCount: number, array: any[], resolve: any) {
  return new Promise(function () {

    let i = dayCount;

    let curr1 = new Date
    let week: any[] = array
    let first = curr1.getDate() - curr1.getDay() + i
    let day = new Date(curr1.setDate(first)).toISOString()

    let options = {
      date: day,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (results == undefined) {
        week.push(0)
      }
      else {
        week.push(results.value)
      }
      if (i == 7) {
        resolve(week)
      }
      else {
        generateSteps(i + 1, week, resolve)
      }
    });


  });
}

export async function googleFitWeeklSteps() {

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_BODY_READ,
    ],
  }
  return new Promise(function (resolve, reject) {
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {

          GoogleFit.getWeeklySteps()
            .then((res) => {
              let week: any[] = [];
              for (let i = 1; i <= 7; i++) {
                let curr1 = new Date
                let first = curr1.getDate() - curr1.getDay() + i
                let day = new Date(curr1.setDate(first)).toISOString()
                let date = Moment(day).format('yyyy-MM-DD');
                let value = 0;
                for (let j = 0; j < res[2].steps.length; j++) {
                  const element = res[2].steps[j];
                  if (date == element.date) {
                    value = element.value;
                    break;
                  }
                }
                week.push(value);
              }

              resolve(week)
            })
            .catch((err) => { console.warn(err), resolve(0) })
        } else {
          console.log("AUTH_DENIED", authResult);
          resolve([])
        }
      })
      .catch(() => {
        resolve([])
        console.log("AUTH_ERROR");
      })
  })
}