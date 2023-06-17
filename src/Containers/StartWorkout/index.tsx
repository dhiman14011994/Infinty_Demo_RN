import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, Dimensions, FlatList, Alert, BackHandler } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import RKImageLoder from '../../Utils/RKImageLoder';
import Moment from 'moment';
import StartWorkoutCell from '../../Cells/StartWorkoutCell';
import { UserWorkout, CategoryData, Excercis } from '../../Modals/WorkoutModl';
import { getWorkoutPlanData } from '../../Redux/Actions/WorkoutsActions';
import { connect } from 'react-redux';
import { hideNavigationBar, showNavigationBar, } from 'react-native-navigation-bar-color';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  userWorkout: UserWorkout,
  workoutId: any,
  getuserWorkouts: any,
  token: string,
}

class StartWorkout extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    date: Moment(Date()).format('yyyy-MM-DD'),
    currentDay: new Date().getDay(),
  }

  isCurrentView = true;

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'StartWorkout') {
        // if (this.props.workoutId != undefined && this.props.workoutId != null && this.props.workoutId != '' && this.props.userWorkout == undefined) {
        this.getActiveWorkouts(this.state.date);
        hideNavigationBar();
        showNavigationBar();
        this.isCurrentView = true;
        // }
      }
    });

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButtonClick(),
    );
  }

  componentWillReceiveProps(props: any) {

  }

  handleBackButtonClick = () => {
    if (this.isCurrentView) {
      this.props.navigation.goBack();
      return true;
    }
  };

  componentWillUnmount() {
    this.isCurrentView = false;
  }

  //Fetching user current active plan exercises
  getActiveWorkouts(date: string) {
    const params = {
      "workout_plan_id": this.props.workoutId,
      "date": date
    }
    this.props.getuserWorkouts({ params: params, token: this.props.token })
  }

  weekBtnActn(index: any) {
    this.setState({ currentDay: index + 1 });
    let date = Moment().startOf('week').add('days', index + 1).format('yyyy-MM-DD')
    this.getActiveWorkouts(date)
  }

  renderWeekDays = (data: any) => {
    // var weekDay = Moment(Date()).format('ddd, MMMM DD yyyy');
    // let txtColor = weekDay.toLowerCase().includes(data.item.toLowerCase()) ? 'red' : 'black';
    let txtColor = new Date().getDay() > (data.index) ? 'black' : 'grey';
    txtColor = (this.state.currentDay == (data.index + 1)) ? 'red' : txtColor;

    return (
      <TouchableOpacity disabled={txtColor == 'grey' ? true : false} activeOpacity={0.8} style={[styles.weekDayBtn, { width: (Dimensions.get('screen').width - styles.totalPadding) / 7 }]} onPress={() => this.weekBtnActn(data.index)} >
        <Text style={[styles.weekDayTxt, { color: txtColor }]}>{data.item}</Text>
        {
          txtColor == 'red' ?
            <Text style={[styles.dateTxt, { color: txtColor }]}>{Moment().startOf('week').add('days', data.index + 1).format('MMM, DD').toUpperCase()}</Text>
            : null
        }
      </TouchableOpacity>
    )
  }


  //Creating week days
  renderWeekDay = (data: any) => {
    var weekDay = Moment(Date()).format('ddd, MMMM DD yyyy');
    var date = Moment(Date()).format('DD');
    let isCurrentDay = weekDay.toLowerCase().includes(data.item.toLowerCase()) ? true : false;
    let width = (Dimensions.get('screen').width - styles.totalPadding) / 7
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.weekDayBtn, { width: width }]} onPress={() => {}}>
        {
          isCurrentDay ?
            <View>
              <View style={[styles.weekTopVw, { width: width }]}>
                <Text style={styles.weekSelectedTxt}>{data.item}</Text>
              </View>
              <View style={[styles.weekEndVw, { width: width }]}>
                <Text style={[styles.weekSelectedTxt, { color: 'black' }]}>{date}</Text>
              </View>
            </View>
            :
            <Text style={[styles.weekDayTxt, { color: 'white' }]}>{data.item}</Text>
        }
      </TouchableOpacity>
    )
  }

  renderWorkouts = (data: any) => {
    let showBtn = this.showButton(data)
    return (
      <StartWorkoutCell showBtn={showBtn} data={data} onPress={() => this.props.navigation.navigate('WorkoutSession', { id: this.props.workoutId, index: data.index, })} />
    )
  }

  showButton(data: any) {
    if (new Date().getDay() == this.state.currentDay) {
      if (data.index != 0) {
        return !this.checkIfAllCompleted(this.props.userWorkout.categoryData[data.index - 1].excercises)
      }
      else {
        return this.checkIfAllCompleted(data.item.excercises)
      }
    }
    else {
      return true
    }
  }

  checkIfAllCompleted(exercise: Excercis[]) {
    for (let index = 0; index < exercise.length; index++) {
      const element = exercise[index];
      if (element.completed == 0) {
        return false
      }
    }
    return true
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <RKImageLoder style={styles.bannerImg} src={this.props.userWorkout.planData.image} tempImg={Images.PLACEHOLDER} />
        <View style={styles.topNavVw}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
            <Image style={styles.arrowImg} source={Images.BACK} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>{this.props.userWorkout.planData.plan_title}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsVw}>
          {/* <Text style={styles.weekTxt}>{this.props.userWorkout.planData.week_title}</Text> */}
          <View style={styles.allDataCntnr}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={weekDay}
              style={styles.tbl}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderWeekDay}
            />
            <View style={[styles.sepVw, { height: 1 }]} />
            <Text style={styles.sessionTxt}>{"TODAY'S WORKOUT SESSION"}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.userWorkout.categoryData}
              style={{ flex: 1 }}
              scrollEnabled={false}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderWorkouts}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    workoutId: state.loginReducer.userInfo.loginData.workoutplan,
    userWorkout: state.loginReducer.workoutData.userWorkout,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getuserWorkouts: (data: any) => dispatch(getWorkoutPlanData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartWorkout);

let weekDay = [
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
  'SA',
  'SU',
]