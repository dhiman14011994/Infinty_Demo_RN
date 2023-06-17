
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image, Dimensions, Alert, Modal, ColorPropType } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
//@ts-ignore
import FlipToggle from 'react-native-flip-toggle-button';
import color from '../../Constants/Colors';
import RedButton from '../../Components/RedButton';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import AddWeightPopup from '../../Components/AddWeightPopup';
import Images from '../../Utils/ImageGenerator';
import { appleHealthWeeklySteps, getSteps, getWeeklySteps } from '../../Utils/HealthKit';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { connect } from 'react-redux';
import { UserInfo } from '../../Modals/LoginModl';
import { MealLogged } from '../../Modals/MealModl';
import { getLoggedData } from '../../Redux/Actions/MealActions';


export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
  userProfile: UserInfo;
  mealLogged: MealLogged,
  getLoggedData: any,
}

class FitnessStats extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    isKg: false,
    isWeek: false,
    index: 0,
    steps: 0,
    value: 0,
    isSteps: true,
    showWeight: false,
    weeklySteps: [],
    weeklyCal: [],
    isweeklyCal: false,
    isweeklyStep: false,
    weekText: 'TODAY',
    showList: false,
    date: Moment(Date()).format('ddd, MMMM DD yyyy'),
  }

  async componentDidMount() {

    this.getLoggedData();

    let steps = await getSteps();
    let dataStep = await getWeeklySteps();
    let datacal = this.mealGraphData1();
    let empityData = [0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < datacal.length; i++) {
      if (datacal[i] != empityData[i]) {
        this.setState({ isweeklyCal: true })
      }
      else {

        this.setState({ isweeklyCal: this.state.isweeklyCal ? true : false })
      }

    }
    //@ts-ignore
    for (let i = 0; i < dataStep.length; i++) {
      //@ts-ignore
      if (dataStep[i] != empityData[i]) {
        this.setState({ isweeklyStep: true })

      }
      else {

        this.setState({ isweeklyStep: this.state.isweeklyStep ? true : false })
      }

    }
    this.setState({ steps: steps, weeklySteps: dataStep, weeklyCal: datacal })
  }

  getLoggedData() {
    const moment = Moment();
    const moment1 = Moment();

    const from_date = moment.startOf('week');
    const to_date = moment1.endOf('week');

    let day1 = Moment(from_date, 'YYYY-MM-DD').toString();
    let date = new Date(day1)
    let dat1 = Moment(date).add(1, 'day').format('YYYY-MM-DD')

    let day2 = Moment(to_date, 'YYYY-MM-DD').toString();
    let date1 = new Date(day2)
    let dat2 = Moment(date1).add(1, 'day').format('YYYY-MM-DD');

    let endPoint = `?start_date=${dat1}&end_date=${dat2}`;

    this.props.getLoggedData({ endPoint: endPoint, token: this.props.token })
  }

  mealGraphData1() {
    let data = [];
    for (let i = 0; i < this.props.mealLogged.logGraphData.length; i++) {
      const element = this.props.mealLogged.logGraphData[i];
      data.push(element.total_calories);
    }
    return data;
  }

  viewGraph = () => {
    return <VerticalBarGraph
      data={this.state.isSteps ? this.state.weeklySteps : this.state.weeklyCal}
      labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      width={Dimensions.get('window').width - styles.totalPadding}
      height={styles.barHeight}
      barRadius={5}
      barWidthPercentage={0.2}
      barColor={color.APP_LIGHT_PINK}
      //@ts-ignore
      baseConfig={{
        xAxisLabelCount: 7,
        hasXAxisBackgroundLines: false,
        hasXAxisLabels: false,
        yAxisLabelStyle: styles.barLabelTxt,
        xAxisLabelStyle: styles.barLabelTxt,
      }}
      style={{
        marginBottom: 30,
        paddingTop: 20,
        borderRadius: 20,
        width: Dimensions.get('window').width - styles.totalPadding,
        alignSelf: 'center',
      }}
    />
  }

  getCalories() {
    return this.props.mealLogged == undefined ? 0 : this.props.mealLogged.suggested_total_calories;
  }

  getValue() {
    let setps = data == undefined ? 0 : (this.state.steps / this.props.userProfile.step_target) * 100;
    let cal = data == undefined ? 0 : (this.props.userProfile.total_calories / this.getCalories()) * 100;
    return this.state.isSteps ? setps : cal;
  }

  renderCircleGraph(dataVal: any, target: any) {
    return (
      <View style={styles.progressVw}>
      <AnimatedCircularProgress
        size={240}
        width={10}
        backgroundWidth={5}
        fill={this.getValue()}
        tintColor={color.APP_HEADER_BG_COLOR}
        tintColorSecondary={color.APP_HEADER_BG_COLOR}
        backgroundColor={color.MOSTYLY_WHITE}
        arcSweepAngle={225}
        rotation={225}
        lineCap="round"
      >
        {
          (fill) => (
            <View style={{ alignItems: 'center', width: '50%' }}>
              <Image source={this.state.isSteps ? Images.STEPS_FIT : Images.CAL} style={styles.fitImg} />
              <Text style={styles.dataTxt}>{dataVal}</Text>
            </View>
          )
        }
      </AnimatedCircularProgress>
      <View style={{ alignItems: 'center', width: '50%', position: 'absolute', right: -18, bottom: 37 }}>
        <Image source={Images.CUP} style={styles.fitImg} />
        <Text style={styles.dataTxt}>{target}</Text>
      </View>
    </View>
    )
  }

  render() {

    let dataVal = this.state.isSteps ? this.state.steps : this.props.userProfile.total_calories;
    let target = this.state.isSteps ? this.props.userProfile.step_target : this.getCalories();

    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Fitness Stats'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Modal transparent={true} visible={this.state.showWeight} animated={true} >
          <AddWeightPopup onAdd={() => this.setState({ showWeight: false })} onCross={() => this.setState({ showWeight: false })} />
        </Modal>
        <View style={styles.menuVw}>
          <View style={{ flexDirection: 'row', width: '60%' }}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => this.setState({ isSteps: !this.state.isSteps })} activeOpacity={0.8}>
              <Text style={[styles.menuBtnTxt, { color: this.state.isSteps ? 'white' : color.APP_LIGHT_COLOR }]}>{'Steps'}</Text>
              <View style={[styles.selectionVw, { height: 3, backgroundColor: this.state.isSteps ? color.APP_LIGHT_PINK : color.APP_LIGHT_BG_COLOR }]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={() => this.setState({ isSteps: !this.state.isSteps })} activeOpacity={0.8}>
              <Text style={[styles.menuBtnTxt, { color: this.state.isSteps ? color.APP_LIGHT_COLOR : 'white' }]}>{'Calories'}</Text>
              <View style={[styles.selectionVw, { height: 3, backgroundColor: this.state.isSteps ? color.APP_LIGHT_BG_COLOR : color.APP_LIGHT_PINK }]} />
            </TouchableOpacity>
          </View>
          <View style={[styles.borderVw, { width: 2 }]} />
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.weekSelectionBtn} onPress={() => this.setState({ showList: true })} activeOpacity={0.8}>
              <Text style={styles.menuBtnTxt}>{this.state.weekText}</Text>
              <Image source={Images.DOWN_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.scrollVw} scrollEnabled={!this.state.showList}>
          {
            this.state.showList ?
              <View style={{ backgroundColor: color.APP_LIGHT_BG_COLOR, marginLeft: '60%', marginRight: 15, }}>
                <TouchableOpacity style={styles.weekSelectionBtn} onPress={() => this.setState({ weekText: 'TODAY', showList: false, })} activeOpacity={0.8}>
                  <Text style={styles.listTxt}>{'TODAY'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekSelectionBtn} onPress={() => this.setState({ weekText: 'WEEKLY', showList: false, })} activeOpacity={0.8}>
                  <Text style={styles.listTxt}>{'WEEKLY'}</Text>
                </TouchableOpacity>
              </View>
              : null
          }
          {
            this.state.weeklySteps.length == 0 || this.state.weekText == 'TODAY' ? null : this.state.isSteps ? this.state.isweeklyStep ? this.viewGraph() : null : this.state.isweeklyCal ? this.viewGraph() : null
          }
          {
            this.state.weekText == 'WEEKLY' || !this.state.isSteps ? null :
             this.renderCircleGraph(dataVal, target)
          }
          {
            this.state.weekText == 'WEEKLY' || this.state.isSteps ? null :
             this.renderCircleGraph(dataVal, target)
          }
          <View style={styles.allDataVw}>
            <TouchableOpacity style={styles.commonBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('BMR')}>
              <Text style={styles.commonTxt}>{'BMR Calculator'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.commonBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('BodyFat')}>
              <Text style={styles.commonTxt}>{'Calculate Body Fat'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

let config = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  fillShadowGradientOpacity: 0,
  strokeWidth: 1,
  propsForBackgroundLines: {
    // strokeDasharray: "",
    // stroke: color.GREY,
  },
  color: (opacity = 255) => `rgba(227, 5, 19, ${0.6})`,
  labelColor: (opacity = 1) => `rgba(112, 112, 112, ${1})`,
}

let data = [
  {
    data: [
      Math.random() * 100,
      Math.random() * 100,
    ],
  },

]

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
    mealLogged: state.loginReducer.mealData.mealLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getLoggedData: (data: any) => dispatch(getLoggedData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FitnessStats);
