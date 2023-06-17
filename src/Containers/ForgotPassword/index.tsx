import React, { Component } from "react";
import TitleHeader from "../../Components/TitleHeader";
import { SafeAreaView, Image, Text, TextInput, View, BackHandler } from "react-native";
import { styles } from "./styles";
import customStyles from '../../Constants/Styles'
import RedButton from "../../Components/RedButton";
import { NavigationScreenProp } from 'react-navigation';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { connect } from "react-redux";
import { forgotPassword, saveFOrgotPwdResp } from "../../Redux/Actions/ForgotPwdActions";
import { localize } from "../../Resources/Strings";
import FixedTxtFld from "../../Components/FixedLabelTxtField";
import Images from '../../Utils/ImageGenerator';
import color from "../../Constants/Colors";

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  sendOtp: any,
  apiResponse: any,
  updateApiStatus: any,
}

class ForgotPassword extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    email: '' as string,
    mobile: '' as string,
    cca2: "US" as CountryCode,
    countryCode: '+1' as string,
    isError: true,
  }

  isEmail = 0;
  countryPicker: any;

  componentWillReceiveProps(props: any) {
    if (
      props.apiResponse.apiStatus !== undefined &&
      props.apiResponse.apiStatus
    ) {
      this.props.updateApiStatus();
      this.props.navigation.navigate('OTP', {
        type: 1,
        token: props.apiResponse.token,
        isEmail: this.isEmail == 1 ? true : false,
      });
    }
  }

  private selectCountry(value: any) {
    if (value.callingCode.length > 0) {
      this.setState({ cca2: value.cca2, countryCode: '+' + value.callingCode[0] })
    }
  }

  private handleTxtInput(text: string, type: any) {
    if (type === 0) {
      this.isEmail = text === '' ? 0 : 1;
      this.setState({email: text});
    } else {
      this.isEmail = text === '' ? 0 : 2;
      this.setState({mobile: text});
    }

    setTimeout(() => {
      let pwdEror = false;
      if (this.state.mobile == '' && text == '') {
        pwdEror = true
      }
      else if (type == 0 && this.state.mobile == '' && text == '') {
        pwdEror = true
      }
      else if (type == 1 && this.state.email == '' && text == '') {
        pwdEror = true
      }
      this.setState({ isError: pwdEror })
    }, 5);
  }

  private submitBtn() {
    if (!this.state.isError) {
      const params = {
        email: this.state.email,
        mobile: this.state.mobile,
        country_code: this.state.email != '' ? '' : this.state.countryCode,
      }
      this.props.sendOtp(params);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <TitleHeader
          isHeader={false}
          title={localize.FORGOT_PASSWORD}
          leftBtnActn={() => this.props.navigation.goBack()}
        />
        <View style={styles.contentVw}>
          <Text style={styles.enterOtpTxt}>{localize.OTP_REGISTER_TEXT}</Text>
          <FixedTxtFld editable={this.isEmail === 2 ? false : true} type={'default'} text={this.state.email} placeholder={'Email'} changeText={(text: any) => this.handleTxtInput(text, 0)} letfImg={Images.EMAIl} />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, }}>
            <View style={{ height: 1, width: '100%', backgroundColor: color.APP_PINK_COLOR, position: 'absolute' }} />
            <Text style={styles.orSignInTxt}>{localize.OR_SIGN_IN}</Text>
          </View>
          <View style={styles.mobileVwCntnr} >
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
            <TextInput editable={this.isEmail === 1 ? false : true} onChangeText={(text: any) => this.handleTxtInput(text, 1)} style={styles.mobileInput} placeholder={'Phone'} keyboardType={'phone-pad'} />
          </View>
          <RedButton isDisable={this.state.isError} title={'Genrate OTP'} onPress={() => this.submitBtn()} />
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.pwdData,
  };
}

function mapDispatchToProps(dispatch: any) {

  return {
    sendOtp: (data: any) => dispatch(forgotPassword(data)),
    updateApiStatus: () => dispatch(saveFOrgotPwdResp({ status: false, token: '' }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
