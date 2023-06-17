
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Platform, Switch, Dimensions } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import FlipToggle from 'react-native-flip-toggle-button';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import { updateUserInfo, saveUserResp } from '../../Redux/Actions/LoginActions';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  saveUserData: any,
  updateUserResp: any,
  userInfoStatus: boolean,
  token: any,
}

class InitialBodyDetail extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    isKg: true,
    isCm: true,
    date: '',
    weight: '',
    height: '',
    inches: '',
  }

  handleChange(checked: boolean) {
    this.setState({ isKg: checked });
  }

  componentWillReceiveProps(props: any) {
    if (props.userInfoStatus) {
      this.props.navigation.navigate('GetStarted');
      this.props.updateUserResp();
    }
  }

  //Fetching banners
  private saveUserInfoData() {
    const params = {
      "gender": this.props.navigation.state.params.gender,
      "height": this.state.height + (this.state.isCm ? '' : ('.' + this.state.inches)),
      "weight": this.state.weight,
      "dob": this.state.date,
    }
    this.props.saveUserData({ params: params, token: this.props.token, isSingle: false, isEdit: false })
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={Images.BG_IMAGE} style={styles.bgImg} />
        <SafeAreaView style={{ flex: 1 }} >
          <View style={styles.navBarVw}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.navBtn}>
              <Image source={Images.BACK} style={styles.btnLeftImg} />
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
            <ScrollView style={{ flex: 1 }}
              contentContainerStyle={[{ flex: 1, justifyContent: 'space-between' }]}>
              <View style={{ flex: 1,}} />
              <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
                <View style={styles.mesurementTitleVw}>
                  <Text style={styles.inputTitleTxt}>{'Weight'}</Text>
                  <View style={styles.unitsVw}>
                    <Text style={styles.unitsTxt}>{' kg '}</Text>
                    <FlipToggle
                      value={!this.state.isKg}
                      buttonWidth={styles.buttonWidth}
                      buttonHeight={styles.buttonHeight}
                      buttonRadius={styles.buttonRadius}
                      sliderWidth={styles.sliderWidth}
                      sliderHeight={styles.sliderHeight}
                      sliderRadius={styles.sliderRadius}
                      sliderOnColor={'white'}
                      sliderOffColor={'white'}
                      buttonOnColor={'#ffffff80'}
                      buttonOffColor={'#ffffff80'}
                      onToggle={(newState: any) => this.setState({ isKg: !newState })}
                    />
                    <Text style={styles.unitsTxt}>{' lb '}</Text>
                  </View>
                </View>
                <View style={styles.inputVw}>
                  <TextInput keyboardType={'numeric'} onChangeText={(text: string) => this.setState({ weight: text })} style={styles.commonInput} placeholder={'Enter Weight'} />
                  <Text style={styles.unitsSmallTxt}>{this.state.isKg ? 'kg' : 'lb'}</Text>
                </View>

                <View style={[styles.mesurementTitleVw, styles.mesurementExtndVw]}>
                  <Text style={styles.inputTitleTxt}>{'Height'}</Text>
                  <View style={styles.unitsVw}>
                    <Text style={styles.unitsTxt}>{' cm '}</Text>
                    <FlipToggle
                      value={!this.state.isCm}
                      buttonWidth={styles.buttonWidth}
                      buttonHeight={styles.buttonHeight}
                      buttonRadius={styles.buttonRadius}
                      sliderWidth={styles.sliderWidth}
                      sliderHeight={styles.sliderHeight}
                      sliderRadius={styles.sliderRadius}
                      sliderOnColor={'white'}
                      sliderOffColor={'white'}
                      buttonOnColor={'#ffffff80'}
                      buttonOffColor={'#ffffff80'}
                      onToggle={(newState: any) => this.setState({ isCm: !newState })}
                    />
                    <Text style={styles.unitsTxt}>{' ft '}</Text>
                  </View>
                </View>
                <View style={styles.inputVw}>
                  <TextInput keyboardType={'numeric'} onChangeText={(text: string) => this.setState({ height: text })} style={styles.commonInput} placeholder={'Enter Height'} />
                  <Text style={styles.unitsSmallTxt}>{this.state.isCm ? 'cm' : 'ft'}</Text>
                  {
                    !this.state.isCm ?
                      <TextInput keyboardType={'numeric'} onChangeText={(text: string) => this.setState({ inches: text })} style={styles.commonInput} placeholder={'Enter height'} />
                      : null
                  }
                  {
                    !this.state.isCm ?
                      <Text style={styles.unitsSmallTxt}>{'in'}</Text>
                      : null
                  }
                </View>
                <View style={[styles.mesurementTitleVw, styles.mesurementExtndVw]}>
                  <Text style={styles.inputTitleTxt}>{'Date of Birth'}</Text>
                </View>
                <View style={[styles.mesurementTitleVw, styles.mesurementExtndVw]}>
                  <DatePicker
                    style={{ width: Dimensions.get('screen').width - styles.totalMargin }}
                    date={this.state.date}
                    mode="date"
                    placeholder="MM/DD/YYYY"
                    format="MM/DD/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                      dateInput: [styles.inputVw, { marginBottom: 30, margin: 0, }],
                      dateText: styles.dateTxt,
                      placeholderText: styles.dateTxt,
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                  />
                </View>
                <RedButton title={localize.PROCEED} onPress={() => this.saveUserInfoData()} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    )
  }
}

function mapStateToProps(state: any) {
  console.log(state)
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userInfoStatus: state.loginReducer.userInfo.userInfoStatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    saveUserData: (data: any) => dispatch(updateUserInfo(data)),
    updateUserResp: (data: any) => dispatch(saveUserResp(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialBodyDetail);