import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../Components/Header';
import { Image, Text, View, TextInput, Alert, Modal, BackHandler } from 'react-native';
import { styles } from './styles';
import customStyles from '../../Constants/Styles'
import OtpTxtField from '../../Components/OtpTxtField';
import RedButton from '../../Components/RedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import loginKeys from '../../Redux/Constants/LoginKeys';
import SuccessPopup from '../../Components/SuccessPopup';
import { verifyforgotOtp, saveVerifyforgotOtp, saveFOrgotPwdResp } from '../../Redux/Actions/ForgotPwdActions';
import TitleHeader from '../../Components/TitleHeader';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  verifyOtp: any,
  verifyForgotOtp: any,
  sendOtp: any,
  apiResponse: any,
  forgotOtpResp: any,
  verifyApiStatus: any,
  updateForgotStatus: any,
  // userInfoStatus: boolean,
}

class OTP extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  constructor(props: any) {
    super(props);
    this.timer = 0;
  }

  state = {
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
    unFilled: true,
    showLoader: false,
    isLoader: true,
    time: {} as any,
    seconds: 120
  }

  isCurrentView = true;
  inputRefs: any = {};
  timer = 0;
  verifyingTitle = 'Verifying Details';
  verifyingMessage = 'Please Wait While We Verifying Your Details';
  verifiedTitle = 'Verified';
  verifiedMessage = 'Your Account Has Been Verified';

  componentDidMount() {
    this.props.navigation.addListener('willBlur', (event: any) => {
      if (event.lastState.routeName == 'OTP') {
        this.isCurrentView = false;
      }
    });
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'OTP') {
        this.isCurrentView = true;
      }
    });
  }

  componentWillReceiveProps(props: any) {
    if (!this.isCurrentView) {
      return;
    }
    if (this.props.navigation.state.params.type == 0) {
      if (this.isCurrentView && props.apiResponse.loginData != undefined) {
        if (props.apiResponse.loginData.token != undefined && props.apiResponse.loginData.token != '') {
          this.setState({ isLoader: false });
          setTimeout(() => {
            setTimeout(() => {
              this.setState({ showLoader: false });
            }, 500);
            this.saveLoginInfo(props.apiResponse.loginData);
          }, 1500);
        }
        else {
          this.setState({ showLoader: false });
        }
      }
      else {
        this.setState({ showLoader: false });
      }
    }
    else if (this.props.navigation.state.params.type == 1) {
      if (props.forgotOtpResp != undefined && props.forgotOtpResp.verifyStatus == true) {
        this.props.navigation.navigate('ChangePassword', { type: 0, token: this.props.navigation.state.params.token });
        this.isCurrentView = false;
        this.props.verifyApiStatus();
        this.props.updateForgotStatus();
      }
    }
  }

  verifyOtp() {
    let otp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4 + this.state.otp5 + this.state.otp6;
    if (this.props.navigation.state.params.type == 0) {
      if (!this.state.unFilled) {
        this.setState({ showLoader: true })
        this.props.verifyOtp({ otp: otp, token: this.props.navigation.state.params.token })
      }
    }
    else if (this.props.navigation.state.params.type == 1) {
      this.props.verifyForgotOtp({ otp: otp, token: this.props.navigation.state.params.token })
    }

    // this.props.verifyOtp({userData: {response: {toke: ''}}, data: {opt: otp}})
  }

  handleInput = (text: string, id: any, ref: string) => {
    switch (id) {
      case 1:
        this.setState({ otp1: text })
        break;

      case 2:
        this.setState({ otp2: text })
        break;

      case 3:
        this.setState({ otp3: text })
        break;

      case 4:
        this.setState({ otp4: text })
        break;

      case 5:
        this.setState({ otp5: text })
        break;

      case 6:
        this.setState({ otp6: text })
        break;
    }

    if (ref != '') {
      this.inputRefs[ref].focus();
    }

    setTimeout(() => {
      this.checkIfOtpFilled()
    }, 10);
  }

  checkIfOtpFilled() {
    if (this.state.otp1 != '' && this.state.otp2 != '' && this.state.otp3 != '' && this.state.otp4 != '' && this.state.otp5 != '' && this.state.otp6 != '') {
      this.setState({ unFilled: false })
    }
    else {
      this.setState({ unFilled: true })
    }
  }

  setInputRef = (id: string, input: TextInput) => {
    this.inputRefs[id] = input;
  }

  //This function will store login data to AsyncStorage to maintain use session 
  private saveLoginInfo = async (response: any) => {
    try {
      await AsyncStorage.setItem('loginData', JSON.stringify(response));
      this.isCurrentView = false;
      this.props.verifyApiStatus();
      this.props.updateForgotStatus();
      this.props.navigation.navigate('WelcomeMessage', { name: this.props.navigation.state.params.name })
    } catch (error) {
      Alert.alert(error);
    }
  };

  resendOtp() {
    this.props.sendOtp({ token: this.props.forgotOtpResp.token })
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal visible={this.state.showLoader} transparent={false}>
          <SuccessPopup isLoader={this.state.isLoader} title={this.state.isLoader ? this.verifyingTitle : this.verifiedTitle} message={this.state.isLoader ? this.verifyingMessage : this.verifiedMessage} />
        </Modal>
        <TitleHeader
          isHeader={false}
          title={localize.ENTER_6_DIGIT_OTP}
          leftBtnActn={() => this.props.navigation.goBack()}
        />
        <View style={styles.contentVw}>
          <View style={styles.otpInputCntnrVw}>
            <OtpTxtField
              value={this.state.otp1}
              onTextChange={(text: string) => this.handleInput(text, 1, 'field2')}
              inputRef={(input: TextInput) => { this.setInputRef("field1", input); }}
            />
            <OtpTxtField
              value={this.state.otp2}
              onTextChange={(text: string) => this.handleInput(text, 2, 'field3')}
              inputRef={(input: TextInput) => { this.setInputRef("field2", input); }}
            />
            <OtpTxtField
              value={this.state.otp3}
              onTextChange={(text: string) => this.handleInput(text, 3, 'field4')}
              inputRef={(input: TextInput) => { this.setInputRef("field3", input); }}
            />
            <OtpTxtField
              value={this.state.otp4}
              onTextChange={(text: string) => this.handleInput(text, 4, 'field5')}
              inputRef={(input: TextInput) => { this.setInputRef("field4", input); }}
            />
            <OtpTxtField
              value={this.state.otp5}
              onTextChange={(text: string) => this.handleInput(text, 5, 'field6')}
              inputRef={(input: TextInput) => { this.setInputRef("field5", input); }}
            />
            <OtpTxtField
              value={this.state.otp6}
              onTextChange={(text: string) => this.handleInput(text, 6, '')}
              inputRef={(input: TextInput) => { this.setInputRef("field6", input); }}
            />
          </View>
          <RedButton isDisable={this.state.unFilled} title={localize.CONFIRM} onPress={() => this.verifyOtp()} />
          <TouchableOpacity style={styles.resendBtn} activeOpacity={0.8} onPress={() => this.resendOtp()}>
            <Text style={styles.resendTxt}>{localize.RESEND_OTP}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.userInfo,
    forgotOtpResp: state.loginReducer.pwdData,
    // userInfoStatus: state.loginReducer.userInfo.loginData.userInfoStatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    verifyOtp: (data: any) => dispatch({ type: loginKeys.VERIFY_OTP, data }),
    verifyForgotOtp: (data: any) => dispatch(verifyforgotOtp(data)),
    sendOtp: (data: any) => dispatch({ type: loginKeys.SEND_OTP, data }),
    verifyApiStatus: () => dispatch(saveVerifyforgotOtp(false)),
    updateForgotStatus: () => dispatch(saveFOrgotPwdResp({ status: false, token: '' }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OTP);