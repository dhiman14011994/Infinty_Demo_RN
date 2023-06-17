/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import AppContainer from './src/NavController/AppContainer';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import loginReducer from './src/Redux/Reducer/LoginReducer';
import Loader from './src/Components/Loader';
import rootSaga from './src/Redux/Saga/Saga';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';

declare const global: { HermesInternal: null | {} };

const sagaMiddleWare = createSagaMiddleware();
const rootReducer = combineReducers({
  loginReducer,
})
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export let token: string = '';

class App extends Component {


  async onSignIn() {
    try {
      firebase.crashlytics().log('Test Message!');
      firebase.crashlytics().recordError(37, "Test Error");
      firebase.crashlytics().log('User signed in.');
      firebase.crashlytics().enableCrashlyticsCollection();
      await Promise.all([
        firebase.crashlytics().setUserIdentifier("983486566251"),
        firebase.crashlytics().recordCustomError('credits', String("asdnkaushd")),
        // firebase.crashlytics().recordCustomError({
        //   role: 'admin',
        //   followers: '13',
        //   email: "anoopdhiman.aipl@gmail.com",
        //   username: "anoopdhiman"
        // }),

        // alert('here')
      ]);
    }
    catch (error) {
      console.log('<<<<<Error>>>>', error)
      Alert.alert(JSON.stringify(error))
    }

  }

  componentDidMount() {

    this.onSignIn()
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    this.configureGoogleLogin()

    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max).setDescription('My apps test channel');
    firebase.notifications().android.createChannel(channel);
    this.checkPermission()
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      token = fcmToken
      console.log('Token ', token)
    } else {
    }
    this.setState({ tokenStatus: true })
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getFcmToken()
    } catch (error) {
      this.setState({ tokenStatus: true })
    }
  }

  configureGoogleLogin() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/fitness.activity.read'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '245880670486-aldls4gk4cg9l1e1hkk0024dihe1bsqs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '245880670486-16va5hmsqbrlhrdfv35rraruggai2ulu.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        <Loader />
      </Provider>
    );
  }
};

export default App;
