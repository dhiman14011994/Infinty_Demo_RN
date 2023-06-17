import React, { Component } from "react";
import { SafeAreaView, Image, Text, TextInput, View, Alert, BackHandler, Modal } from "react-native";
import { styles } from "./styles";
import customStyles from '../../Constants/Styles'
import RedButton from "../../Components/RedButton";
import strings from "../../Constants/Strings";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { changePwd, statusChangePwd } from "../../Redux/Actions/ForgotPwdActions";
import { saveLoginInfo } from "../../Redux/Actions/LoginActions";
import AsyncStorage from "@react-native-community/async-storage";
import { localize } from "../../Resources/Strings";
import TitleHeader from "../../Components/TitleHeader";
import FixedTxtFld from "../../Components/FixedLabelTxtField";
import Images from '../../Utils/ImageGenerator';
import SuccessPopup from "../../Components/SuccessPopup";

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  changePwd: any,
  apiResponse: any,
  updateApiStatus: any,
  token: any,
  saveToken: any,
}

class ChangePassword extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
    correctOldPwd: false,
    correctNewPwd: false,
    oldSecure: true,
    isSecure: true,
    isSecure1: true,
    showPopup: false,
    pwdError: '',
  }

  componentWillReceiveProps(props: any) {
    if (props.apiResponse.changePwdStatus != undefined && props.apiResponse.changePwdStatus) {
      this.handleCallBack();
      this.props.updateApiStatus();
    }
  }

  validatePassword() {
    let self = this;
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        let password = self.state.confirmPwd
        let error = ''
        if (password.length < 8) {
          error = 'Minimum of 8 characters, ';
        }
        if (password.search(/.*[A-Z]/) < 0) {
          error = error + '1 uppercase letter, ';
        }
        if (password.search(/.*[a-z]/) < 0) {
          error = error + '1 lowercase letter, ';
        }
        if (password.search(/[0-9]/) < 0) {
          error = error + '1 number, ';
        }
        if (self.state.newPwd != self.state.confirmPwd) {
          error = error + 'Password missmatch.';
        }
        self.setState({ pwdError: error, correctNewPwd: error.length > 0 ? false : true })
        if (error.length > 0) {
          //reject(false);
        }
        else {
          resolve(true);
        }
      }, 50);
    })
  }

  handleTxtInput(text: string, index: any) {
    if (index == 1) {
      this.setState({ oldPwd: text })
    }
    else if (index == 2) {
      let isCorrect = text === this.state.confirmPwd;
      this.setState({ newPwd: text, correctNewPwd: isCorrect })
      this.validatePassword();
    }
    else if (index == 3) {
      let isCorrect = text === this.state.newPwd;
      this.setState({ confirmPwd: text, correctNewPwd: isCorrect })
      this.validatePassword();
    }    
  }

  async onSubmit() {
    let self = this;
    let isChange = this.props.navigation.state.params.type == '1' ? true : false;
    let token = isChange ? this.props.token : this.props.navigation.state.params.token;
    await this.validatePassword().then(function (result: any) {
      if (result) {
        let params: any = {
          "password": self.state.newPwd,
          "c_password": self.state.confirmPwd,
        }
        if (isChange) {
          params['old_password'] = self.state.oldPwd;
        }
        self.props.changePwd({ params: params, token: token, isChange: isChange })
      }
    }).catch(function (error: any) {
      console.log('Error: ', error)
    })
  }

  handleCallBack() {
    this.setState({ showPopup: true });
    setTimeout(() => {
      setTimeout(() => {
        this.setState({ showPopup: false });
      }, 500);
      this.logout();
    }, 1500);
  }

  private async logout() {
    try {
      await AsyncStorage.setItem('loginData', '');
      this.props.saveToken({ 'success': { 'token': '' } })
      this.props.navigation.navigate('Login')
    } catch (error) {
      Alert.alert(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal visible={this.state.showPopup} animationType={'slide'}>
          <SuccessPopup title={localize.PWD_UPDATED_SUCCESSFULLY} message={''} />
        </Modal>
        <TitleHeader
          isHeader={false}
          title={this.props.navigation.state.params.type == '1' ? localize.CHANGE_PWD : localize.SET_NEW_PWD}
          leftBtnActn={() => this.props.navigation.goBack()}
        />
        <View style={styles.contentVw}>
          {this.props.navigation.state.params.type == '1' ?
            <FixedTxtFld type={'default'} text={this.state.oldPwd} placeholder={localize.ENTER_CURRENT_PWD} changeText={(text: any) => this.handleTxtInput(text, 1)} letfImg={Images.LOCK} rightImg={this.state.oldSecure ? Images.EYE : Images.EYE_REVEL} isSecure={this.state.oldSecure} onPress={() => this.setState({ oldSecure: !this.state.oldSecure })} />
            : null}
          <FixedTxtFld type={'default'} text={this.state.newPwd} placeholder={localize.ENTER_NEW_PWD} changeText={(text: any) => this.handleTxtInput(text, 2)} letfImg={Images.LOCK} rightImg={this.state.isSecure ? Images.EYE : Images.EYE_REVEL} isSecure={this.state.isSecure} onPress={() => this.setState({ isSecure: !this.state.isSecure })} />
          <FixedTxtFld type={'default'} text={this.state.confirmPwd} placeholder={localize.CONFIRM_NEW_PWD} changeText={(text: any) => this.handleTxtInput(text, 3)} letfImg={Images.LOCK} rightImg={this.state.isSecure1 ? Images.EYE : Images.EYE_REVEL} isSecure={this.state.isSecure1} onPress={() => this.setState({ isSecure1: !this.state.isSecure1 })} />
          <Text style={styles.validationTxt}>{this.state.pwdError}</Text>
          <RedButton isDisable={!this.state.correctNewPwd} title={localize.UPDATE_PWD} onPress={() => this.onSubmit()} />
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.pwdData,
    token: state.loginReducer.userInfo.loginData.token,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    changePwd: (data: any) => dispatch(changePwd(data)),
    updateApiStatus: () => dispatch(statusChangePwd(false)),
    saveToken: (data: any) => dispatch(saveLoginInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);