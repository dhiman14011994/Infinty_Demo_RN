import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert, BackHandler, SafeAreaView, TextInput, Modal } from 'react-native';
import { styles } from './styles';
import FixedTxtFld from '../../Components/FixedLabelTxtField';
import RedButton from '../../Components/RedButton';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { NavigationScreenProp } from 'react-navigation';
import { commonKeys } from '../../Redux/Constants/CommonKeys';
import loginKeys from '../../Redux/Constants/LoginKeys';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { socialLoginApi, updateSignupStatus } from '../../Redux/Actions/LoginActions';
import appleAuth, { AppleButton, AppleAuthRequestOperation, AppleAuthRequestScope, AppleAuthCredentialState, } from '@invertase/react-native-apple-authentication';
import { token } from '../../../App';
import { localize } from '../../Resources/Strings';
import Images from '../../Utils/ImageGenerator';
import TitleHeader from '../../Components/TitleHeader';
import color from '../../Constants/Colors';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  registerUser: any,
  apiResponse: any,
  socialLogin: any,
  updateSignupStatus: any,
}

class SignUp extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    name: '',
    email: '',
    userName: '',
    countryCode: '+1',
    mobile: '',
    password: '',
    cpassword: '',
    isSecure: true,
    isSecure1: true,
    isChecked: false,
    isDisable: true,
    showLogin: false,
    errors: undefined as any,
    cca2: "US" as CountryCode,
  }

  countryPicker: any;

  isCurrentView = true;
  isFbLogin = false;

  componentDidMount() {
    this.props.navigation.addListener('willBlur', (event: any) => {
      if (event.lastState.routeName == 'SignUp') {
        this.isCurrentView = false;
      }
    });
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'SignUp') {
        this.isCurrentView = true;
      }
    });

  }

  componentWillReceiveProps(props: any) {
    if (this.isCurrentView && props.apiResponse.loginData != undefined && props.apiResponse.loginData.token != undefined && props.apiResponse.loginData.token != '' && !props.apiResponse.isLoaderVisible && !props.apiResponse.isSignup) {
      this.saveLoginInfo(props.apiResponse.loginData);
    }
    else if (this.isCurrentView && !props.apiResponse.isLoaderVisible) {
      if (props.apiResponse.authError != undefined) {
        this.setState({ errors: props.apiResponse.authError })
      }
      else {
        this.setState({ errors: undefined })
        this.redirectToOtp(props.apiResponse.loginData);
      }
    }
  }

  // Google Login Code
  googleSignIn = async () => {
    this.setState({ showLogin: false })
    this.isFbLogin = false;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userName: userInfo.user.givenName })

      let params = {
        "name": userInfo.user.givenName,
        "email": userInfo.user.email,
        "provider": "google",
        "provider_id": userInfo.user.id,
        "device_token": token,
      }
      this.props.socialLogin(params)
    } catch (error) {
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
    }
  }

  //Facebook Code
  fbSignIn() {
    this.setState({ showLogin: false })
    let self = this
    this.isFbLogin = true;
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result: any) {
        if (result.isCancelled) {
        } else {
          self.getData()
        }
      },
      function (error: any) {
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
    } else {
      this.setState({ userName: result.first_name + ' ' + result.last_name })
      let params = {
        "name": result.first_name + ' ' + result.last_name,
        "email": result.email == undefined || result.email == '' ? result.id : result.email,
        "provider": "facebook",
        "provider_id": result.id,
        "device_token": token,
      }
      this.props.socialLogin(params)
    }
  }

  //Login action and Api calling
  async signupBtn() {
    if (!this.state.isChecked) {
      Alert.alert('Please accept the terms of service to continue.')
      return;
    }
    const params = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      country_code: this.state.countryCode,
      device_token: token,
    }
    this.props.registerUser(params)
  }

  //This function will store login data to AsyncStorage to maintain use session 
  private redirectToOtp = async (response: any) => {
    this.props.updateSignupStatus();
    this.props.navigation.navigate('OTP', { name: this.state.name, type: 0, token: response.token });
  };

  //Social Login handling
  private async saveLoginInfo(response: any) {
    try {
      if (response.type != '' && response.type == 'register') {
        response.type = '';
        await AsyncStorage.setItem('loginData', JSON.stringify(response));
        this.props.navigation.navigate('WelcomeMessage', { name: this.state.userName })
      }
      else {
        await AsyncStorage.setItem('loginData', JSON.stringify(response));
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      Alert.alert(error);
    }
  }

  private selectCountry(value: any) {
    if (value.callingCode.length > 0) {
      this.setState({ cca2: value.cca2, countryCode: '+' + value.callingCode[0] });
      this.checkIfEnable();
    }
  }

  checkIfEnable() {
    setTimeout(() => {
      let disable = this.state.name != '' &&
        this.state.email != '' &&
        this.state.name != '' &&
        this.state.countryCode != '' &&
        this.state.mobile != '' &&
        this.state.password != '' &&
        this.state.cpassword != '' ? false : true;
      this.setState({ isDisable: disable })
    }, 50);
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal animationType={'slide'} transparent={true} visible={this.state.showLogin} onDismiss={() => this.setState({ showLogin: false })}>
          <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'flex-end' }}>
            <View style={styles.socialVw}>
              <View style={styles.socialBgVw} />
              <TouchableOpacity style={styles.cancelBtn} onPress={() => this.setState({ showLogin: false })}>
                <Image source={Images.CANCEL} style={styles.cancelImg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.googleSignIn()} style={[styles.socialBtn, { backgroundColor: '#EA4335' }]} activeOpacity={0.8}>
                <Image source={Images.GOOGLE} style={styles.socialImg} />
                <Text style={styles.loginTxt}>{localize.GOOGLE_LOGIN}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.fbSignIn()} style={[styles.socialBtn, { backgroundColor: '#1778F2' }]} activeOpacity={0.8}>
                <Image source={Images.FB} style={styles.socialImg} />
                <Text style={styles.loginTxt}>{localize.FB_LOGIN}</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <TitleHeader
          isHeader={true}
          title={localize.CREATE_ACCOUNT}
        />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
          <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
            <View style={styles.loginVw}>
              <FixedTxtFld type={'default'} text={this.state.name} placeholder={localize.FULL_NAME} changeText={(text: any) => { this.setState({ name: text }), this.checkIfEnable() }} letfImg={Images.USER} />
              <View style={styles.mobileVwCntnr}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image style={styles.phone} source={Images.PHONE} />
                  <CountryPicker
                    onSelect={(value: any) => this.selectCountry(value)}
                    translation={'common'}
                    countryCode={this.state.cca2}
                    containerButtonStyle={{ bottom: 0, alignSelf: 'flex-end' }}
                  />
                  <Text style={styles.ccText}>{this.state.countryCode}</Text>
                </View>
                <TextInput onChangeText={(text: any) => { this.setState({ mobile: text }), this.checkIfEnable() }} style={styles.mobileInput} placeholder={localize.PHONE_NUMBER} keyboardType={'phone-pad'} placeholderTextColor={'white'} />
              </View>

              <FixedTxtFld type={'email-address'} text={this.state.email} placeholder={localize.EMAIL} changeText={(text: any) => { this.setState({ email: text }), this.checkIfEnable() }} letfImg={Images.EMAIl} />
              <FixedTxtFld type={'default'} text={this.state.password} placeholder={localize.PASSWORD} changeText={(text: any) => { this.setState({ password: text }), this.checkIfEnable() }} letfImg={Images.LOCK} rightImg={this.state.isSecure ? Images.EYE : Images.EYE_REVEL} isSecure={this.state.isSecure} onPress={() => this.setState({ isSecure: !this.state.isSecure })} />
              <FixedTxtFld type={'default'} text={this.state.cpassword} placeholder={localize.CONFIRM_PASSWORD} changeText={(text: any) => { this.setState({ cpassword: text }), this.checkIfEnable() }} letfImg={Images.LOCK} rightImg={this.state.isSecure1 ? Images.EYE : Images.EYE_REVEL} isSecure={this.state.isSecure1} onPress={() => this.setState({ isSecure1: !this.state.isSecure1 })} />

              <View style={styles.termsVw}>
                <TouchableOpacity onPress={() => this.setState({ isChecked: !this.state.isChecked })} style={styles.checkBoxBtn} activeOpacity={0.8}>
                  <Image source={this.state.isChecked ? Images.CHECK : Images.UNCHECK} style={styles.checkBoxImg} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.termsBtn} activeOpacity={0.8}>
                  <Text style={styles.readTxt}>{localize.ACCEPT_TERMS_CONDITION}</Text>
                </TouchableOpacity>
              </View>
              <RedButton isDisable={this.state.isDisable} lowMargin={true} title={localize.SIGNUP_UP_SMALL} onPress={() => this.signupBtn()} />

              <View style={styles.orVw}>
                <View style={{ height: 1, width: '100%', backgroundColor: color.APP_PINK_COLOR, position: 'absolute' }} />
                <Text style={styles.orSignInTxt}>{localize.OR_SIGN_UP}</Text>
              </View>
              {
                appleAuth.isSupported ?
                  <TouchableOpacity onPress={() => this.appleSignin()} style={[styles.googleBtn, { backgroundColor: 'white' }]} activeOpacity={0.8}>
                    <Image source={Images.APPLE} style={styles.socialImg} />
                    <Text style={[styles.loginTxt, { color: 'black' }]}>{localize.APPLE_LOGIN}</Text>
                  </TouchableOpacity>
                  : null
              }
              <TouchableOpacity onPress={() => this.setState({ showLogin: true })} activeOpacity={0.8}>
                <Text style={[styles.otherTxt, { marginTop: appleAuth.isSupported ? styles.marginTop : -10 }]}>{localize.VIEW_OTHER_SIGNIN_OPTION}</Text>
              </TouchableOpacity>
              <View style={styles.borderVw} />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} activeOpacity={0.8}>
                <Text style={styles.haveAnCoounttxt}>{localize.HAVE_AN_ACC_ALREADY}<Text style={styles.signupTxt}>{localize.SIGN_IN}</Text></Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView >
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    registerUser: (data: any) => dispatch({ type: loginKeys.SIGNUP, data }),
    socialLogin: (data: any) => dispatch(socialLoginApi(data)),
    updateSignupStatus: () => dispatch(updateSignupStatus({ status: false, token: '' })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);