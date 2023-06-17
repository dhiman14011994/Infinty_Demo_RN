/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, Platform, Modal, Alert, } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import { getUserInfo, updateUserInfo, saveUserResp, saveUserInfo, } from '../../Redux/Actions/LoginActions';
import { connect } from 'react-redux';
import { UserInfo } from '../../Modals/LoginModl';
import AddStepsPopup from '../../Components/AddStepsPopup';
import Images from '../../Utils/ImageGenerator';
import color from '../../Constants/Colors';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  saveToken: any;
  token: any;
  getUserProfile: any;
  saveUserData: any;
  updateUserResp: any;
  userInfoStatus: boolean;
  userProfile: UserInfo;
  updateSteps: any;
}

class MyDevices extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    steps: this.props.userProfile.step_target,
    showPopup: false,
  };

  componentWillReceiveProps(props: any) {
    if (props.userInfoStatus) {
      let info = { ...props.userProfile };
      info.step_target = this.state.steps;
      this.props.updateSteps(info);
      this.props.navigation.goBack();
      this.props.updateUserResp();
    }
  }

  //Fetching banners
  private saveUserInfoData(steps: any) {
    if (steps != 0) {
      this.setState({ steps: steps, showPopup: false });
      const params = {
        step_target: steps,
      };
      this.props.saveUserData({
        params: params,
        token: this.props.token,
        isSingle: true,
      });
    } else {
      Alert.alert('Steps must be greater then 0.');
    }
  }

  //Render Buttons
  private renderOptions(title: string, image: any) {
    return (
      <TouchableOpacity
        style={[styles.deviceBtn, {
          backgroundColor: this.props.userProfile.step_target == null ||
            this.props.userProfile.step_target == 0 ? color.APP_LIGHT_BG_COLOR : color.APP_PINK_COLOR
        }]}
        onPress={() => this.setState({ showPopup: true })}
        activeOpacity={0.8}>
        <Image
          source={Images.TICK_ROUND}
          style={styles.checkImg}
        />
        <Text style={styles.titleTxt}>{title}</Text>
        <Image source={image} style={styles.logoImg} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Fitness Devices'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Modal
          transparent={true}
          visible={this.state.showPopup}
          animated={true}>
          <AddStepsPopup
            steps={this.state.steps}
            onAdd={(steps: any) => this.saveUserInfoData(steps)}
            onCross={() => this.setState({ showPopup: false })}
          />
        </Modal>
        <View style={styles.btnCntnr}>
          <View style={styles.paddingVw} />
          {Platform.OS === 'ios'
            ? this.renderOptions(
              'Apple iWatch',
              Images.APPLE_FIT,
            )
            : this.renderOptions(
              'Google Fit',
              Images.GOOGLE_FIT,
            )}
          {/* {
          this.renderOptions('Google Fit', 0, require('../../Assets/back.png'))
        }
        {
          this.renderOptions('Apple iWatch', 1, require('../../Assets/back.png'))
        }
        {
          this.renderOptions('Samsung Gear', 2, require('../../Assets/back.png'))
        } */}
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
    userInfoStatus: state.loginReducer.userInfo.userInfoStatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUserProfile: (data: any) => dispatch(getUserInfo(data)),
    saveUserData: (data: any) => dispatch(updateUserInfo(data)),
    updateUserResp: () => dispatch(saveUserResp(false)),
    updateSteps: (data: any) => dispatch(saveUserInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDevices);
