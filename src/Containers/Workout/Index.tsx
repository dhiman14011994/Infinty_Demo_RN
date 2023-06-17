import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, View, Text, BackHandler, Dimensions, Alert, TouchableHighlightBase } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ExercisesCell from '../../Cells/ExercisesCell';
import WorkoutExercisesCell from '../../Cells/WorkoutExercisesCell';
import { NavigationScreenProp } from 'react-navigation';
import { WorkoutCat, Workouts, RecWorkout, UserWorkout } from '../../Modals/WorkoutModl';
import { connect } from 'react-redux';
import workoutKeys from '../../Redux/Constants/WorkoutKeys';
import { BannerModl } from '../../Modals/BannerModl';
import { getDBBanner } from '../../Redux/Actions/BannerActions';
import RKImageLoder from '../../Utils/RKImageLoder';
import WorkoutRecomendCell from '../../Cells/WorkoutRecomendCell';
import { getRecomMealPlans } from '../../Redux/Actions/MealActions';
import { getWorkoutPlanData, updateWorkoutExpStat, saveExerciseCatDtls, saveCatExerciseDtls } from '../../Redux/Actions/WorkoutsActions';
import image from '../../Constants/Images';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserInfo, saveLoginInfo } from '../../Redux/Actions/LoginActions';
import { UserInfo } from '../../Modals/LoginModl';
import Images from '../../Utils/ImageGenerator';
import RehabilitationCell from '../../Cells/RehabilitationCell';
import { getBanners } from '../../Redux/ReduxAPIHandler/BannerApis';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getWorkoutCat: any,
  workoutCat: WorkoutCat[],
  getWorkout: any,
  workouts: Workouts[],
  token: string,
  getRecomenWorkPlans: any,
  recMealPlans: RecWorkout[],
  workoutId: any,
  getuserWorkouts: any,
  userWorkout: UserWorkout,
  isExpired: false,
  saveId: any,
  updateWorkoutExpStat: any,
  saveExerciseCatDtls: any,
  saveCatExerciseDtls: any,
  getUserProfile: any;
  userProfile: UserInfo;
}

class Workout extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    isRecommended: false,
    isPurchased: false,
    workoutId: '',
    banners: [] as BannerModl[],
  }

  recData: any = undefined;
  prevRec: any = undefined;
  isCurrentView = true;
  isRecomended = this.props.recMealPlans.length > 0 ? true : false;

  componentDidMount() {
    this.getWorkoutCatData();
    this.getWorkoutData();
    this.getBannerData();

    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'Workout') {
        this.clearCache();
        if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.mcq) {
          this.recData = this.props.navigation.state.params.mcq;
          if (this.props.navigation.state.params.mcq != undefined && this.props.navigation.state.params.mcq.length != 0) {
            this.prevRec = this.props.navigation.state.params.mcq;
          }
          if (this.recData.length > 0) {
            this.getRecomPlansData(this.recData);
            this.props.navigation.setParams({ mcq: [] })
            this.setState({ index: 0 })
          }
        }
      }
    });
  }

  clearCache() {
    this.props.saveExerciseCatDtls();
    this.props.saveCatExerciseDtls();
  }

  async componentWillReceiveProps(props: any) {
    if (props.isExpired) {
      try {
        this.setState({ isPurchased: false })
        const value: any = await AsyncStorage.getItem('loginData');
        let userInfo: any = JSON.parse(value)
        userInfo['workoutplan'] = '';
        await AsyncStorage.setItem('loginData', JSON.stringify(userInfo));
        this.props.saveId({ success: userInfo })
        this.props.updateWorkoutExpStat();
      } catch (error) {
        Alert.alert(error);
      }
    }
    else {
      if (props.workoutId != undefined && props.workoutId != null && props.workoutId != '' && props.userWorkout == undefined) {
        this.setState({ isPurchased: true, workoutId: props.workoutId })
        this.getActiveWorkouts(props.workoutId);
      }
    }
  }

  //Fetching user current active plan exercises
  getActiveWorkouts(id: any) {
    const params = {
      "workout_plan_id": id,
    }
    this.props.getuserWorkouts({ params: params, token: this.props.token })
  }

  //Fetching Recommended Plans
  private getRecomPlansData(data: any[]) {
    if (data.length > 0) {
      const params = {
        "data": data,
        "plan_type": "workoutplan",
      }
      this.props.getRecomenWorkPlans({ params: params, token: this.props.token, type: 2 })
    }
  }

  //Fetching workout categories
  private getWorkoutCatData() {
    const params = {
      "table": "excercise_categories",
      "model": "ExcerciseCategory",
    }
    this.props.getWorkoutCat({ params: params, token: this.props.token, isCat: true })
  }

  //Fetching workout categories
  private getWorkoutData() {
    const params = {
      "table": "excercises",
      "model": "Excercise",
    }
    this.props.getWorkout({ params: params, token: this.props.token, isCat: false })
  }

  //Fetching banners
  private async getBannerData() {
    const params = {
      "table": "banners",
      "model": "Banner",
      "category": 5,
    }
    let banners = await getBanners(params, this.props.token)
    this.setState({ banners: banners });
  }

  //Creating exercises here
  private renderExercise = (data: any) => {
    return (
      <ExercisesCell data={data} onPress={() => this.props.navigation.navigate('ExerciseDetails', { id: data.item.id })} />
    )
  }

  //Creating workouts here
  private renderWorkouts = (data: any) => {
    return (
      <WorkoutExercisesCell isHome={true} data={data} onPress={() => this.props.navigation.navigate('WorkoutDetails', { id: data.item.id, tags: data.item.tags })} />
    )
  }

  //Creating recommended workouts plan
  private renderRehabilitation = (data: any) => {
    let lastIndex = (this.props.workoutCat.length - 1) == data.index ? true : false;
    return (
      <RehabilitationCell isHome={true} data={data} onPress={() => this.props.navigation.navigate('RehabilitationDtls', { id: data.item.id })} />
    )
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalMargin;
    this.isRecomended = this.state.isPurchased ? false : this.props.recMealPlans.length > 0 ? true : false;
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Workout'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollVw}>
          <View style={styles.dataVw}>
            {
              this.isRecomended || this.state.isPurchased || this.state.banners.length == 0 ? null :
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CraftPlan', { isFromMeal: false })} activeOpacity={0.8}>
                  <RKImageLoder style={styles.bannerImg} src={this.state.banners[0].image} tempImg={Images.PLACEHOLDER} />
                  <Text style={styles.banerTxt}>{this.state.banners[0].title}</Text>
                </TouchableOpacity>
            }
            {
              // this.state.isPurchased ?
              //   this.props.userWorkout == undefined ? null :
              //     <View>
              //       <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('')}>
              //         <Text style={styles.titleTxt}>{'My plan'}</Text>
              //         <Image source={require('../../Assets/rightArrow.png')} style={styles.arrowImg} />
              //       </TouchableOpacity>
              //       <TouchableOpacity onPress={() => this.props.navigation.navigate('StartWorkout')} activeOpacity={0.8} style={[styles.myWorkoutVw, { width: width }]}>
              //         <RKImageLoder style={[styles.logoImg, { width: width }]} src={this.props.userWorkout.planData.image} tempImg={image.EXERCISE_PLACE_HOLDER} />
              //         <View style={[styles.opqVw, { opacity: 0.2, width: width }]} />
              //         <View style={styles.workoutTxtVw}>
              //           <Text style={styles.workoutTxt} numberOfLines={2}>{this.props.userWorkout.planData.plan_title}</Text>
              //         </View>
              //         <Text numberOfLines={1} style={styles.startNowTxt}>{this.props.userWorkout.planData.week_title}</Text>
              //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              //           <Text style={styles.startNowTxt}>{'Start Now'}</Text>
              //           <Image style={styles.nextImg} source={require('../../Assets/next.png')} />
              //         </View>
              //       </TouchableOpacity>
              //     </View>
              //   : null
            }
            {
              // this.state.isPurchased || !this.isRecomended ? null :
              // <View>
              //   <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('')}>
              //     <Text style={styles.titleTxt}>{'Coach Recommended Plans'}</Text>
              //     <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
              //   </TouchableOpacity>
              //   <FlatList
              //     showsHorizontalScrollIndicator={false}
              //     horizontal={true}
              //     data={this.props.recMealPlans}
              //     keyExtractor={(item: any, index: any) => index.toString()}
              //     renderItem={this.renderRecommendedWorkouts}
              //   />
              // </View>
            }
            {/* {
            this.state.isPurchased || this.isRecomended || this.props.bannersList.length == 0 ? null :
              <View style={styles.getNowCntnr}>
                <Image source={require('../../Assets/coach.png')} style={styles.coachImg} />
                <View style={styles.getNowVw}>
                  <View style={styles.dummyVw} />
                  <Text style={styles.getACoachTxt}>{'GET A COACH RECOMMENDED PLAN'}</Text>
                  <TouchableOpacity style={styles.getNowBtn} onPress={() => this.props.navigation.navigate('CraftPlan', { isFromMeal: false })}>
                    <Text>{'Get Now'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
          } */}
            {/* <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('RehabilitationList')}>
              <Text style={styles.titleTxt}>{'Rehabilitation'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.topMenuTbl}
              data={this.props.workouts}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderRehabilitation}
            /> */}
            <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('WorkoutList')}>
              <Text style={styles.titleTxt}>{'Workout Plans'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              style={styles.topMenuTbl}
              data={this.props.workoutCat}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderWorkouts}
            />
            <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('WorkoutCatList')}>
              <Text style={styles.titleTxt}>{'Exercises'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.topMenuTbl}
              data={this.props.workouts}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderExercise}
            />
            <View style={styles.paddingView} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    workoutCat: state.loginReducer.workoutData.workoutCat,
    workouts: state.loginReducer.workoutData.workouts,
    bannersList: state.loginReducer.bannerData.workoutBanners,
    recMealPlans: state.loginReducer.workoutData.recWorkouts,
    workoutId: state.loginReducer.userInfo.loginData.workoutplan,
    userWorkout: state.loginReducer.workoutData.userWorkout,
    isExpired: state.loginReducer.workoutData.isExpired,
    userProfile: state.loginReducer.userInfo.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getWorkoutCat: (data: any) => dispatch({ type: workoutKeys.GET_EXERCISES_CAT, data }),
    getWorkout: (data: any) => dispatch({ type: workoutKeys.GET_WORKOUTS, data }),
    getBanners: (data: any) => dispatch(getDBBanner(data)),
    getRecomenWorkPlans: (data: any) => dispatch(getRecomMealPlans(data)),
    getuserWorkouts: (data: any) => dispatch(getWorkoutPlanData(data)),
    saveId: (data: any) => dispatch(saveLoginInfo(data)),
    updateWorkoutExpStat: () => dispatch(updateWorkoutExpStat(false)),
    saveExerciseCatDtls: () => dispatch(saveExerciseCatDtls(undefined)),
    saveCatExerciseDtls: () => dispatch(saveCatExerciseDtls(undefined)),
    getUserProfile: (data: any) => dispatch(getUserInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout);