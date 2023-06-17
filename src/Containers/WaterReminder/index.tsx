import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ScrollView, Image, Alert, Dimensions, Modal } from 'react-native';
import * as reminderData from './WaterReminderConst';
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import color from '../../Constants/Colors';
import RedButton from '../../Components/RedButton';
import { connect } from 'react-redux';
// import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import { saveReminder, setReminderStatus, getUserReminders } from '../../Redux/Actions/ReminderActions';
import { Reminder } from '../../Modals/ReminderModl';
import DatePickerVw from '../../Components/DatePicker';
import Images from '../../Utils/ImageGenerator';
import LinearGradient from 'react-native-linear-gradient';
import WebBrowser from '../../Components/WebBrowser';
import { REMINDER_LINK } from '../../Constants/API';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  setReminder: any,
  getReminder: any,
  status: boolean,
  updateStatus: any,
  reminder: Reminder,
  token: string
}

class WaterReminder extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    wakeSleepArr: reminderData.wakeSleepData,
    cupSizeArr: reminderData.cupSizeData,
    intervalArr: reminderData.intervalData,
    isReminderApplied: true,
    showDatePicker: false,
    showWeb: false,
    startTime: '00:00',
    endTime: '00:00',
    waterQty: '',
    interval: '',
    date: new Date(),
  }

  isWakeUp = true;

  componentDidMount() {
    this.props.getReminder({ token: this.props.token })
  }

  componentWillReceiveProps(props: any) {
    if (props.reminder != undefined) {
      this.setState({
        startTime: this.state.startTime == '00:00' ? props.reminder.start_time : this.state.startTime,
        endTime: this.state.endTime == '00:00' ? props.reminder.end_time : this.state.endTime,
        waterQty: this.state.waterQty == '' ? props.reminder.water_qty : this.state.waterQty,
        interval: this.state.interval == '' ? props.reminder.time_interval + ' min' : this.state.interval,
      })
    }
    if (props.status) {
      this.props.updateStatus();
      Alert.alert(
        'Reminder saved successfully.',
        '',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.goBack(),
          }
        ],
        { cancelable: false }
      );
    }
  }

  //Fetching blogs
  setReminder() {
    const params = {
      "start_time": this.state.startTime,
      "end_time": this.state.endTime,
      "water_qty": this.state.waterQty,
      "time_interval": this.state.interval.replace(' min', '')
    }
    this.props.setReminder({ params: params, token: this.props.token })
  }

  //Render wake up reminder cell
  private renderWakeUpCell = (data: any) => {
    let isWakeUp = data.index == 0 ? true : false;
    let time = this.state.startTime;
    let time1 = this.state.endTime;
    let isSelected = isWakeUp ? (time == '00:00' ? false : true) : (time1 == '00:00' ? false : true);
    let item = data.item;
    var date = isWakeUp ? this.state.startTime : this.state.endTime
    return (
      <TouchableOpacity onPress={() => { this.setState({ showDatePicker: true }), this.isWakeUp = isWakeUp }} activeOpacity={0.8} style={[styles.commonBtn, { borderWidth: 1, borderColor: isSelected ? color.DARK_RED : color.LIGHTER_GREY }]}>
        <Text style={styles.btnTxt}>{date}</Text>
      </TouchableOpacity>
    )
  }

  //Render wake up reminder cell
  private renderCupCell = (data: any) => {
    let item = data.item;
    let isSelected = this.state.waterQty == item.title ? true : false;
    return (
      <TouchableOpacity onPress={() => this.setState({ waterQty: item.title })} activeOpacity={0.8} style={[styles.commonBtn, { backgroundColor: isSelected ? color.APP_PINK_COLOR : color.APP_COMMON_GREY }]}>
        <Text style={styles.btnTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  //Render interval reminder cell
  private renderIntervalCell = (data: any) => {
    let item = data.item;
    let isSelected = this.state.interval == item.title ? true : false;
    return (
      <TouchableOpacity onPress={() => this.setState({ interval: item.title })} activeOpacity={0.8} style={[styles.commonBtn, { backgroundColor: isSelected ? color.APP_PINK_COLOR : color.APP_COMMON_GREY }]}>
        <Text style={styles.btnTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  //Render reminder view
  private renderReminder(title: string, type: any, array: any[]) {
    return (
      <View style={[styles.reminerCntnr, { borderBottomWidth: 1 }]}>
        <Text style={styles.titleTxt}>{title}</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.commonTbl}
          data={array}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={
            type == 0 ? this.renderWakeUpCell
              : type == 1 ? this.renderCupCell
                : this.renderIntervalCell
          }
        />
      </View>
    )
  }

  timeFormating(date: any) {
    var time: any = Moment(date).format('HH:mm');
    this.setState({ date: date, })
    if (this.isWakeUp) {
      this.setState({ startTime: time })
    }
    else {
      this.setState({ endTime: time })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal animated={true} transparent={true} visible={this.state.showDatePicker}>
          <DatePickerVw date={this.state.date} onChangeValue={(date: any) => this.timeFormating(date)} doneActn={() => this.setState({ showDatePicker: false })} />
        </Modal>
        <Modal animated={true} transparent={true} visible={this.state.showWeb} >
          <WebBrowser url={REMINDER_LINK} onCross={() => this.setState({ showWeb: false })} />
        </Modal>
        <NavigationHeader
          title={'Water Reminder'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Image source={require('../../Assets/bg.png')} style={styles.bgImg} />
        <ScrollView style={styles.scrollVw}>
          <TouchableOpacity onPress={() => this.setState({showWeb: true})} activeOpacity={0.8}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#DDF6FF', '#74D5FF']} style={styles.bannerVw}>
              <Image source={Images.WATER} style={styles.iconImg} />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.bannerTxt}>{'Healthy Beverage'}</Text>
                <View style={{ width: '100%' }}>
                  <RedButton lowMargin={true} title={'Start Subscription'} onPress={() => this.setState({showWeb: true})} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          {
            this.renderReminder('Wake up & Sleep Time', 0, this.state.wakeSleepArr)
          }
          {
            this.renderReminder('Drinking Cup Size', 1, this.state.cupSizeArr)
          }
          {
            this.renderReminder('Reminder Interval', 2, this.state.intervalArr)
          }
          {/* <View style={styles.paddingVw} /> */}
          <RedButton isDisable={!this.state.isReminderApplied} title={'Confirm'} onPress={() => this.setReminder()} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    status: state.loginReducer.reminderData.status,
    reminder: state.loginReducer.reminderData.reminder,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setReminder: (data: any) => dispatch(saveReminder(data)),
    updateStatus: () => dispatch(setReminderStatus(false)),
    getReminder: (data: any) => dispatch(getUserReminders(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterReminder);