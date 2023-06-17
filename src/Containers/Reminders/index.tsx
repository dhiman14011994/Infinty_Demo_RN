/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import ReminderCell from '../../Cells/ReminderCell';
import { Notification } from '../../Modals/ReminderModl';
import {
  getReminders,
  getUserNotifications,
} from '../../Redux/Actions/ReminderActions';
import { connect } from 'react-redux';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles';
import Images from '../../Utils/ImageGenerator';
//@ts-ignore
import SwitchButton from 'switch-button-react-native';
import color from '../../Constants/Colors';


export interface Props {
  navigation: NavigationScreenProp<any, any>;
  token: any;
  reminders: Notification[];
  notifications: Notification[];
  getReminders: any;
  getNotifications: any;
}

class Reminders extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    index: 0,
    isNoti: false,
  };

  componentDidMount() {
    this.getWaterReminder();
    this.getWaterNotifications();
  }

  //Creating workouts here
  private reminders = (data: any) => {
    return <ReminderCell data={data.item} />;
  };

  getWaterReminder() {
    let params = {
      table: 'notifications',
      model: 'Notification',
      filters: [{ type: 'water_reminder' }],
    };
    this.props.getReminders({ params: params, token: this.props.token });
  }

  getWaterNotifications() {
    let params = {
      table: 'notifications',
      model: 'Notification',
      filters: [{ type: 'normal' }],
    };

    this.props.getNotifications({ params: params, token: this.props.token });
  }

  render() {
    let width = (Dimensions.get('screen').width - styles.totalMargin) / 2;
    let data =
      this.state.index === 0 ? this.props.reminders : this.props.notifications;
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Reminders'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <View style={[styles.switchVw, { width: Dimensions.get('screen').width - styles.totalMargin }]}>
          <SwitchButton
            activeSwitch={this.state.index == 0 ? 1 : 2}
            onValueChange={(val: any) => this.setState({ index: val == 1 ? 0 : 2 })}
            text1={'Reminders'}
            text2='Notifications'
            defaultIndex={this.state.index == 0 ? 1 : 2}
            switchWidth={Dimensions.get('screen').width - styles.totalMargin}
            switchHeight={styles.height}
            switchdirection='ltr'
            switchBorderRadius={100}
            switchSpeedChange={300}
            switchBorderColor='transparent'
            switchBackgroundColor='#00000033'
            btnBorderColor='transparent'
            btnBackgroundColor='#fff'
            fontColor='#fff'
            activeFontColor={color.APP_PINK_COLOR}
            textStyle={styles.topMenuTxt}
          />
        </View>
        {data.length != 0 ? (
          <View style={styles.noReminderVw}>
            <Image
              source={Images.NO_NOTIFICATION}
              style={styles.noReminderImg}
            />
            <Text style={styles.noReminderTxt}>
              {'No ' +
                (this.state.index === 0 ? 'Reminders' : 'Notifications') +
                ' Yet'}
            </Text>
          </View>
        ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.tblVw}
              data={[1,1,1,1]}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.reminders}
            />
          )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
    notifications: state.loginReducer.reminderData.notification,
    reminders: state.loginReducer.reminderData.reminders,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getReminders: (data: any) => dispatch(getReminders(data)),
    getNotifications: (data: any) => dispatch(getUserNotifications(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
