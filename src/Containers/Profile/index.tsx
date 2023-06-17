/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import { saveLoginInfo, getUserInfo } from '../../Redux/Actions/LoginActions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { UserInfo } from '../../Modals/LoginModl';
import { getSteps } from '../../Utils/HealthKit';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  saveToken: any;
  token: any;
  getUserProfile: any;
  userProfile: UserInfo;
}

class Profile extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    steps: 0,
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state !== undefined && event.state.routeName === 'Profile') {
        this.props.getUserProfile({ token: this.props.token });
      }
    });
  }

  async componentWillReceiveProps(props: any) {
    if (props.userProfile.step_target > 0) {
      let data = await getSteps();
      this.setState({ steps: data });
    }
  }

  //Render setting dark text views
  renderDarkTextVw(image: any, index: any, title: string) {
    return (
      <View>
        <TouchableOpacity style={styles.settingBtn} activeOpacity={0.8} onPress={() => this.handleTap(index)}>
          <Image source={image} style={styles.settingImg} />
          <Text style={styles.settingTxt}>{title}</Text>
          <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
        </TouchableOpacity>
        <View style={[styles.borderVw, { height: 1 }]} />
      </View>
    );
  }

  private handleTap(index: any) {
    switch (index) {
      case 1:
        this.props.navigation.navigate('FitnessStats');
        break;

      case 2:
        this.props.navigation.navigate('Challenges');
        break

      case 3:
        this.props.navigation.navigate('MyPlan');
        break;

      case 5:
        this.props.navigation.navigate('InviteFriend');
        break;

      case 7:
        this.props.navigation.navigate('WaterReminder');
        break;

      case 8:
        this.props.navigation.navigate('MyDevices');
        break;

      case 9:
        this.logoutBtn();
        break;

      default:
        break;
    }
  }

  //Logout action
  private logoutBtn() {
    Alert.alert(
      'Do you want to Log Out?',
      '',
      [
        {
          text: 'NO',
          onPress: () => { },
        },
        {
          text: 'YES',
          onPress: () => this.logout(),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }

  private async logout() {
    try {
      await AsyncStorage.setItem('loginData', '');
      this.props.saveToken({ success: { token: '' } });
      this.props.navigation.navigate('Login');
    } catch (error) {
      Alert.alert(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Profile'}
          isMultiple={true}
          leftBtnActn={() => this.props.navigation.navigate('Reminders')}
          right2BtnActn={() => this.props.navigation.navigate('Settings')}
          btnImage={Images.NOTIFICATION}
          right2Image={Images.SETTING}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollVw}>
          <View style={styles.imgNameCntnr}>
            <RKImageLoder
              style={styles.profileImg}
              src={this.props.userProfile.image}
              tempImg={require('../../Assets/dummy.png')}
            />
            <View style={styles.nameStepsCntnr}>
              {this.props.userProfile === undefined ? null : (
                <Text style={styles.nameTxt}>{this.props.userProfile.name} </Text>
              )}
              {this.props.userProfile === undefined ? null :
                <Text style={styles.emailTxt}>{this.props.userProfile.email}</Text>
              }
              <TouchableOpacity style={styles.editBtn} onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text style={styles.editTxt}>{'Edit Profile'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.optnCntnr}>
            {this.renderDarkTextVw(
              Images.IC1,
              1,
              'Fitness Stats',
            )}
            {this.renderDarkTextVw(
              Images.IC2,
              2,
              'Challenges',
            )}
            {this.renderDarkTextVw(
              Images.IC,
              3,
              'My Plans',
            )}
            {this.renderDarkTextVw(
              Images.IC4,
              5,
              'Invite Friends',
            )}
            {this.renderDarkTextVw(
              Images.IC,
              7,
              'Water Reminder',
            )}
            {this.renderDarkTextVw(
              Images.IC5,
              8,
              'My Fitness Devices',
            )}
            <TouchableOpacity style={styles.settingBtn} activeOpacity={0.8} onPress={() => this.handleTap(9)}>
              <Image source={Images.LOGOUT} style={styles.settingImg} />
              <Text style={styles.logoutTxt}>{'Log out'}</Text>
            </TouchableOpacity>
            <View
              style={styles.marginVw}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUserProfile: (data: any) => dispatch(getUserInfo(data)),
    saveToken: (data: any) => dispatch(saveLoginInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
