import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Intro from '../Containers/Intro';
import Login from '../Containers/Login';
import SignUp from '../Containers/SignUp';
import OTP from '../Containers/OTP';
import ForgotPassword from '../Containers/ForgotPassword';
import ChangePassword from '../Containers/ChangePassword';
import Welcome from '../Containers/Welcome';
import InitialBodyDetail from '../Containers/InitialBodyDetail';
import WelcomeMessage from '../Containers/WelcomeMessage';
import AppBottomTabNavigator from './TabbarNavigation';
import IntroVideo from '../Containers/IntroVideo/Index';
import SplashScreen from '../Containers/SplashScreen';
import GetStarted from '../Containers/GetStarted';


const stackManager = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    Intro: Intro,
    Login: Login,
    SignUp: SignUp,
    OTP: OTP,
    ForgotPassword: ForgotPassword,
    ChangePassword: ChangePassword,
    Welcome: Welcome,
    GetStarted: GetStarted,
    WelcomeMessage: WelcomeMessage,
    InitialBodyDetail: InitialBodyDetail,
  }
)

const AppSwitcher = createSwitchNavigator({
  stack: stackManager,
  homeStack: AppBottomTabNavigator,
})

const AppContainer = createAppContainer(AppSwitcher);
export default AppContainer;