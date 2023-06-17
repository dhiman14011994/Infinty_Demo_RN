import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert, Keyboard, Modal, BackHandler } from 'react-native';
import { styles } from './styles';
import FixedTxtFld from '../../Components/FixedLabelTxtField';
import RedButton from '../../Components/RedButton';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { saveLoginInfo, loginApi, socialLoginApi, logout } from '../../Redux/Actions/LoginActions';
import appleAuth, { AppleButton, AppleAuthRequestOperation, AppleAuthRequestScope, AppleAuthCredentialState, } from '@invertase/react-native-apple-authentication';
import Images from '../../Utils/ImageGenerator';
import TitleHeader from '../../Components/TitleHeader';
import { localize } from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../Constants/Colors';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  loginUser: any,
  socialLogin: any,
  loginResponse: any,
  saveToken: any,
  logout: any;

}

class Login extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    mobile: '',
    password: '',
    name: '',
    isSecure: true,
    showLoader: false,
    isDisable: true,
  }

  isCurrentView = true;
  isFbLogin = false;

  componentDidMount() {
    this.props.navigation.addListener('willBlur', (event: any) => {
      if (event.lastState.routeName == 'Login') {
        this.isCurrentView = false;
      }
    });
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'Login') {
        if (
          event.lastState == undefined ||
          (event.lastState.routeName != 'SignUp' && event.lastState.routeName != 'ChangePassword')
        ) {
          this.props.logout();
        }
        this.isCurrentView = true;
      }
    });

    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButtonClick());
  }

  componentWillReceiveProps(props: any) {
    if (this.isCurrentView && props.loginResponse.loginData != undefined && !props.loginResponse.isLoaderVisible) {
      if (props.loginResponse.loginData.token != undefined && props.loginResponse.loginData.token != '') {
        this.saveLoginInfo(props.loginResponse.loginData);
      }
    }
  }

  handleBackButtonClick = () => {
    if (this.isCurrentView) {
      BackHandler.exitApp();
      return true;
    }
  };

  // Google Login Code
  googleSignIn = async () => {
    this.isFbLogin = false;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ name: userInfo.user.givenName })

      let params = {
        "name": userInfo.user.givenName,
        "email": userInfo.user.email,
        "provider": "google",
        "provider_id": userInfo.user.id
      }
      this.props.socialLogin(params)
    } catch (error) {
      console.log('GOOGLE ERROR: ', error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  //Apple Code
  async appleSignin() {
    // performs login request
    AppleAuthRequestOperation.LOGOUT;
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // user is authenticated
      let givenName = appleAuthRequestResponse.fullName?.givenName != null ? appleAuthRequestResponse.fullName?.givenName : '';
      let familyName = appleAuthRequestResponse.fullName?.familyName != null ? appleAuthRequestResponse.fullName?.familyName : '';
      let email = appleAuthRequestResponse.email != null ? appleAuthRequestResponse.email : appleAuthRequestResponse.user;
      this.setState({ name: givenName + ' ' + familyName })
      let params = {
        "name": givenName + ' ' + familyName,
        "email": email,
        "provider": "apple",
        "provider_id": appleAuthRequestResponse.user
      }
      this.props.socialLogin(params)
    }
  }

  //Facebook Code
  fbSignIn() {
    let self = this
    this.isFbLogin = true;
    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()

          );
          console.log('RESULT: ', result)
          self.getData()
        }
      },
      function (error: any) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  //Asking for facebook data permission 
  getData() {
    this.isFbLogin = true;
    const infoRequest = new GraphRequest(
      '/me?fields=first_name,last_name,email',
      null,
      this.responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  //Facebook Login Callback
  private responseInfoCallback = (error: any, result: any) => {
    if (error) {
      console.log('Error fetching data: ', error);
    } else {
      this.setState({ name: result.first_name + ' ' + result.last_name })
      let params = {
        "name": result.first_name + ' ' + result.last_name,
        "email": result.email == undefined || result.email == '' ? result.id : result.email,
        "provider": "facebook",
        "provider_id": result.id
      }
      this.props.socialLogin(params)

    }
  }

  //Login action and Api calling
  async loginBtn() {
    this.props.loginUser({ email: this.state.mobile, password: this.state.password })
  }

  //This function will store login data to AsyncStorage to maintain use session 
  private saveLoginInfo = async (response: any) => {
    try {
      if (response.type != '' && response.type == 'register') {
        response.type = '';
        await AsyncStorage.setItem('loginData', JSON.stringify(response));
        this.isCurrentView = false;
        this.props.navigation.navigate('WelcomeMessage', { name: this.state.name })
      }
      else {
        await AsyncStorage.setItem('loginData', JSON.stringify(response));
        this.isCurrentView = false;
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  checkIfEnable() {
    setTimeout(() => {
      let disable = this.state.mobile != '' && this.state.password != '' ? false : true;
      this.setState({ isDisable: disable })
    }, 50);
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <View style={{ flex: 1 }}>
          <TitleHeader
            isHeader={true}
            title={localize.HAVE_AN_ACCOUNT}
          />
          <KeyboardAvoidingView style={styles.scrollVw} behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
            <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
              <View style={styles.loginVw}>
                {
                  appleAuth.isSupported ?
                    <TouchableOpacity onPress={() => this.appleSignin()} style={[styles.googleBtn, { backgroundColor: 'white' }]} activeOpacity={0.8}>
                      <Image source={Images.APPLE} style={styles.socialImg} />
                      <Text style={[styles.loginTxt, { color: 'black' }]}>{localize.APPLE_LOGIN}</Text>
                    </TouchableOpacity>
                    : null
                }
                <TouchableOpacity onPress={() => this.googleSignIn()} style={[styles.googleBtn, { backgroundColor: '#EA4335' }]} activeOpacity={0.8}>
                  <Image source={Images.GOOGLE} style={styles.socialImg} />
                  <Text style={styles.loginTxt}>{localize.GOOGLE_LOGIN}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.fbSignIn()} style={[styles.googleBtn, { backgroundColor: '#1778F2' }]} activeOpacity={0.8}>
                  <Image source={Images.FB} style={styles.socialImg} />
                  <Text style={styles.loginTxt}>{localize.FB_LOGIN}</Text>
                </TouchableOpacity>

                <View style={styles.orVw}>
                  <View style={{ height: 1, width: '100%', backgroundColor: color.APP_PINK_COLOR, position: 'absolute' }} />
                  <Text style={styles.orSignInTxt}>{localize.OR_SIGN_IN}</Text>
                </View>

                <FixedTxtFld type={'default'} text={this.state.mobile} placeholder={localize.EMAIL_MOBILE_NUMBER} changeText={(text: any) => { this.setState({ mobile: text }), this.checkIfEnable() }} letfImg={Images.EMAIl} />
                <FixedTxtFld type={'default'} text={this.state.password} placeholder={localize.PASSWORD} changeText={(text: any) => { this.setState({ password: text }), this.checkIfEnable() }} letfImg={Images.LOCK} rightImg={this.state.isSecure ? Images.EYE : Images.EYE_REVEL} isSecure={this.state.isSecure} onPress={() => this.setState({ isSecure: !this.state.isSecure })} />
                <TouchableOpacity style={styles.forgotPwdBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPwdTxt}>{localize.FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
                <RedButton isDisable={this.state.isDisable} lowMargin={true} title={'Sign in'} onPress={() => this.loginBtn()} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} activeOpacity={0.8}>
                  <Text style={styles.haveAnCoounttxt}>{localize.HAVE_AN_ACC_ALREADY}<Text style={styles.signupTxt}>{localize.SIGNUP}</Text></Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    loginResponse: state.loginReducer.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    loginUser: (data: any) => dispatch(loginApi(data)),
    socialLogin: (data: any) => dispatch(socialLoginApi(data)),
    saveToken: (data: any) => dispatch(saveLoginInfo(data)),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);