import React, { Component } from 'react';
import { Image, FlatList, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, BackHandler, ImageStore, Alert } from 'react-native';
import NavigationHeader from "../../Components/Header";
import { styles } from './styles';
import HomeTopMenuCell from '../../Cells/HomeTopMenuCell';
import * as Progress from 'react-native-progress';
import color from '../../Constants/Colors';
import BlogsCell from '../../Cells/BlogsCell';
import ShopCollectionCell from '../../Cells/ShopCollectionCell';
import HomeBottmCell from '../../Cells/HomeBottmCell';
// import Swiper from 'react-native-custom-swiper';
import Swiper from 'react-native-swiper'
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
import PaymentPopup from '../../Components/PaymentPopup';
import blogsKeys from '../../Redux/Constants/BlogsKeys';
import { connect } from 'react-redux';
import storiesKeys from '../../Redux/Constants/StoriesKeys';
import { Blogs } from '../../Modals/BlogsModl';
import { Story } from '../../Modals/StoriesModl';
//@ts-ignore
import HTML from 'react-native-render-html';
import { BannerModl } from '../../Modals/BannerModl';
import { getDBBanner } from '../../Redux/Actions/BannerActions';
import RKImageLoder from '../../Utils/RKImageLoder';
import { getSteps } from '../../Utils/HealthKit';
import { UserInfo } from '../../Modals/LoginModl';
import { getUserInfo, saveLoginInfo } from '../../Redux/Actions/LoginActions';
import AsyncStorage from '@react-native-community/async-storage';
import { getSimilarGuideList } from '../../Redux/Actions/GuidesActions';
import { GuideModl } from '../../Modals/GuidesModl';
import { saveSimilarBlogList, saveBlogDetails, saveSimilarBlogDetails } from '../../Redux/Actions/BlogsActions';
import { saveSimilarStories, saveStoriesDetails, saveSimilarStoriesDetails } from '../../Redux/Actions/StoriesActions';
import VideoPlayer from '../../Components/VideoPlayer';
import Images from '../../Utils/ImageGenerator';
import GuidesCell from '../../Cells/GuidesCell';
import { RecWorkout, UserWorkout, WorkoutCat } from '../../Modals/WorkoutModl';
import workoutKeys from '../../Redux/Constants/WorkoutKeys';
import WorkoutExercisesCell from '../../Cells/WorkoutExercisesCell';
import { getRecomMealPlans } from '../../Redux/Actions/MealActions';
import WorkoutRecomendCell from '../../Cells/WorkoutRecomendCell';
import { getWorkoutPlanData, updateWorkoutExpStat } from '../../Redux/Actions/WorkoutsActions';
import { getGuidesList } from '../../Redux/ReduxAPIHandler/GuidesApi';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getBanners: any,
  blogsList: Blogs[],
  // getGuide: any,
  // guidesList: GuideModl[],
  token: string,
  getUserProfile: any,
  userProfile: UserInfo,
  saveSimilarBlogList: any,
  saveBlogDetails: any,
  saveSimilarBlogDetails: any,
  saveSimilarStories: any,
  saveStoriesDetails: any,
  saveSimilarStoriesDetails: any,

  //Workouts
  getWorkoutCat: any,
  workoutCat: WorkoutCat[],
  bannersList: BannerModl[],
  getBlogs: any,
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
}

class Home extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    showPlayer: false,
    isRecommended: false,
    isPurchased: false,
    workoutId: '',
    index: 0,
    steps: 0,
    target: 0,
    fat: 0,
    carbs: 0,
    protien: 0,
    totalCal: 0,
    imgArray: [
      require('../../Assets/homeBg.png'),
      require('../../Assets/homeBg.png'),
      require('../../Assets/homeBg.png'),
    ],
    guidesList: [] as GuideModl[],
  }

  videoId = '';
  recData: any = undefined;
  prevRec: any = undefined;
  mcqData: any = undefined;
  prevMcq: any = undefined;
  isCurrentView = true;
  isRecomended = this.props.recMealPlans.length > 0 ? true : false;

  async componentDidMount() {

    this.getBlogsData();
    this.getGuides();
    this.getWorkoutCatData();
    this.getBannerData();

    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'Home') {
        this.clearCache();
        this.props.getUserProfile({ token: this.props.token })
        if (this.props.navigation.state.params != undefined && (this.props.navigation.state.params.mcq || this.props.navigation.state.params.mcqData)) {
          this.recData = this.props.navigation.state.params.mcq;
          this.mcqData = this.props.navigation.state.params.mcqData;
          if (this.props.navigation.state.params.mcq != undefined && this.props.navigation.state.params.mcq.length != 0) {
            this.prevRec = this.props.navigation.state.params.mcq;
            this.prevMcq = this.props.navigation.state.params.mcqData;
          }
          if (this.recData.length > 0 || this.mcqData.ans.length > 0) {
            this.getRecomPlansData(this.recData, this.mcqData);
            this.setState({ index: 0 })
            setTimeout(() => {
              let data = this.mcqData;
              data.ans = [];
              this.props.navigation.setParams({ mcq: [], mcqData: data })
            }, 100);
          }
        }
      }
    });

    await AsyncStorage.setItem('index', '0');
  }

  clearCache() {
    this.props.saveSimilarBlogList();
    this.props.saveBlogDetails();
    this.props.saveSimilarBlogDetails();
    this.props.saveSimilarStories();
    this.props.saveStoriesDetails();
    this.props.saveSimilarStoriesDetails();
  }

  async componentWillReceiveProps(props: any) {
    this.setState({
      fat: props.userProfile.fat,
      carbs: props.userProfile.carbs,
      protien: props.userProfile.protien,
      totalCal: props.userProfile.total_calories,
    })
    if (props.userProfile.step_target > 0) {
      let data = await getSteps();
      this.setState({
        steps: data,
        target: props.userProfile.step_target,
        fat: props.userProfile.fat,
        carbs: props.userProfile.carbs,
        protien: props.userProfile.protien,
        totalCal: props.userProfile.total_calories,
      })
    }
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
      if (!this.state.isPurchased && this.props.bannersList.length == 0) {
        this.getBannerData();
      }
    }
  }

  private async handleTopMenuTap(index: any) {

    if (index == 0) {

      this.props.navigation.navigate('WaterReminder')
    }
    if (index == 1) {
      await AsyncStorage.setItem('index', '2');
      this.props.navigation.navigate('Nutrition')
    }
    else if (index == 2) {
      this.props.navigation.navigate('Challenges')
    }
    else if (index == 3) {

      this.props.navigation.navigate('RBTLive')
    }
  }

  //Creating recommended workouts plan
  private renderRecommendedWorkouts = (data: any) => {
    let lastIndex = (this.props.workoutCat.length - 1) == data.index ? true : false;
    return (
      <WorkoutRecomendCell lastIndex={lastIndex} data={data} onPress={() => this.props.navigation.navigate('StartWorkoutPlan', { id: data.item.id })} />
    )
  }

  //Creating top menu here
  private renderMenu = (data: any) => {
    return (
      <HomeTopMenuCell data={data} onPress={(index: any) => this.handleTopMenuTap(index)} />
    )
  }

  //Creating workouts here
  private renderWorkouts = (data: any) => {
    return (
      <WorkoutExercisesCell isHome={true} data={data} onPress={() => this.props.navigation.navigate('WorkoutDetails', { id: data.item.id, tags: data.item.tags })} />
    )
  }

  //Creating blogs view here
  private renderBlogs = (data: any) => {
    return (
      <BlogsCell data={data} onPress={() => this.props.navigation.navigate('BlogsDetails', { id: data.item.id })} />
    )
  }

  //Creating blogs view here
  private renderGuides = (data: any) => {
    return (
      <GuidesCell data={data} onPress={() => this.props.navigation.navigate('GuidesDetail', { id: data.item.id })} />
    )
  }

  playVideo(videoId: string) {
    this.videoId = videoId;
    this.setState({ showPlayer: true })
  }

  //Fetching Recommended Plans
  private getRecomPlansData(data: any[], mcqData: any) {
    if (data.length > 0 || mcqData.ans.length > 0) {
      const params = {
        "data": {
          "normal": {
            "ans": data,
            "plan_type": "workoutplan",
          },
          "mcq": mcqData,
        },
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

  //Fetching user current active plan exercises
  getActiveWorkouts(id: any) {
    const params = {
      "workout_plan_id": id,
    }
    this.props.getuserWorkouts({ params: params, token: this.props.token })
  }

  //Fetching banners
  private getBannerData() {
    const params = {
      "table": "banners",
      "model": "Banner",
      "category": 2,
    }
    this.props.getBanners({ params: params, token: this.props.token, type: 1 })
  }

  getBlogsData() {
    const params = {
      "table": "blogs",
      "model": "Blog",
      "filters": [{ "enabled": "1" }]
    }
    this.props.getBlogs({ params: params, token: this.props.token })
  }

  //Fetching Guieds
  private async getGuides() {
    let params = {
      "table": "guides",
      "model": "Guide",
      "filters": [{ "enabled": "1" }]
    }
    let data = await getGuidesList(params, this.props.token)
    this.setState({ guidesList: data })
    // this.props.getGuide({ params: params, token: this.props.token })
  }

  render() {
    let progress = this.state.steps / this.state.target;
    progress = isNaN(this.state.steps / this.state.target) ? 0 : progress;
    let width = Dimensions.get('screen').width - styles.barWidth;
    let imgWidth = Dimensions.get('screen').width - styles.totalMargin;
    this.isRecomended = this.state.isPurchased ? false : this.props.recMealPlans.length > 0 ? true : false;
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal animated={true} visible={this.state.showPlayer}>
          <VideoPlayer videoId={this.videoId} onCross={() => this.setState({ showPlayer: false })} />
        </Modal>
        <NavigationHeader
          title={'Training'}
          isMultiple={true}
          leftBtnActn={() => this.props.navigation.navigate('Reminders')}
          right2BtnActn={() => this.props.navigation.navigate('Messages')}
          btnImage={Images.NOTIFICATION}
          right2Image={Images.CHAT}
        />
        <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
          {
            this.isRecomended || this.state.isPurchased || this.props.bannersList.length == 0 ? null :
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CraftPlan', { isFromMeal: false })} style={styles.bannerVw} activeOpacity={1}>
                <RKImageLoder style={styles.bannerImg} src={this.props.bannersList[0].image} tempImg={Images.PLACEHOLDER} />
                <Text style={styles.bannertxt}>{this.props.bannersList[0].description}</Text>
              </TouchableOpacity>
          }
          <View style={styles.bgView}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.topMenuTbl}
              data={options}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderMenu}
            />
            {
              this.state.isPurchased ?
                this.props.userWorkout == undefined ? null :
                  <View>
                    <TouchableOpacity style={[styles.titleCntnrVw, { marginTop: 0 }]} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('')}>
                      <Text style={styles.titleTxt}>{'My Workout Plan'}</Text>
                      {/* <Image source={require('../../Assets/rightArrow.png')} style={styles.arrowImg} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('StartWorkout')} activeOpacity={0.8} style={[styles.myWorkoutVw, { width: imgWidth }]}>
                      <RKImageLoder style={[styles.logoImg, { width: imgWidth }]} src={this.props.userWorkout.planData.image} tempImg={Images.PLACEHOLDER} />
                      <View style={[styles.opqVw, { opacity: 0.2, width: imgWidth }]} />
                      <View style={styles.workoutTxtVw}>
                        <Text style={styles.workoutTxt} numberOfLines={2}>{this.props.userWorkout.planData.plan_title}</Text>
                      </View>
                      <Text numberOfLines={1} style={styles.startNowTxt}>{this.props.userWorkout.planData.week_title}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.startNowTxt}>{'Start Now'}</Text>
                        <Image style={styles.nextImg} source={Images.NEXT} />
                      </View>
                    </TouchableOpacity>
                  </View>
                : null
            }
            {
              this.state.isPurchased || !this.isRecomended ? null :
                <View>
                  <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('')}>
                    <Text style={styles.titleTxt}>{'Coach Recommended Plans'}</Text>
                    <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
                  </TouchableOpacity>
                  <FlatList
                    style={styles.recWorkoutTbl}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.props.recMealPlans}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    renderItem={this.renderRecommendedWorkouts}
                  />
                </View>
            }
            <View style={styles.progressVw}>
              <View style={styles.stepsCntnrVw}>
                <Image source={Images.STEPS} style={styles.activityImg} />
                <TouchableOpacity style={styles.stepsProgressVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('MyDevices')}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: width }}>
                    <View style={styles.stepsTxtVw}>
                      <Text style={styles.activityTxt}>{'Steps'}</Text>
                      <Text style={styles.activityDataTxt}>{this.state.target <= 0 ? '0000' : this.state.target}</Text>
                    </View>
                    <Text style={styles.targetTxt}>{'Total: ' + this.state.steps}</Text>
                  </View>
                  <Progress.Bar color={color.DARK_RED} unfilledColor={color.VERY_LIGHT_GREY} borderWidth={0} progress={progress} borderRadius={styles.barHeight} height={styles.barHeight} width={width} />
                </TouchableOpacity>
              </View>

              <View style={[styles.dividerVw, { height: 1 }]} />

              <View style={styles.stepsCntnrVw}>
                <Image source={Images.CALORIES} style={styles.activityImg} />
                <TouchableOpacity onPress={() => { }} style={[styles.caloriesVw, { width: width }]} activeOpacity={1}>
                  <View style={styles.calTxtVw}>
                    <Text style={styles.activityTxt}>{'Calories'}</Text>
                    <Text style={styles.activityDataTxt}>{this.state.totalCal}</Text>
                  </View>
                  <View style={[styles.borderVw, { width: 1 }]} />
                  <View style={styles.calTxtVw}>
                    <Text style={styles.activityTxt}>{'Proteins'}</Text>
                    <Text style={styles.activityTxt}>{this.state.protien.toFixed(0) + ' g'}</Text>
                  </View>
                  <View style={styles.calTxtVw}>
                    <Text style={styles.activityTxt}>{'Carbs'}</Text>
                    <Text style={styles.activityTxt}>{this.state.carbs.toFixed(0) + ' g'}</Text>
                  </View>
                  <View style={styles.calTxtVw}>
                    <Text style={styles.activityTxt}>{'Fats'}</Text>
                    <Text style={styles.activityTxt}>{this.state.fat.toFixed(0) + ' g'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {
              this.state.isPurchased || this.props.workoutCat.length <= 0 ? null :
                <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Workout')}>
                  <Text style={styles.titleTxt}>{'Workout'}</Text>
                  <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
                </TouchableOpacity>
            }
            {
              this.state.isPurchased || this.props.workoutCat.length <= 0 ? null :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.topMenuTbl}
                  data={this.props.workoutCat}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={this.renderWorkouts}
                />
            }
            {
              this.props.blogsList.length <= 0 ? null :
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BlogsListing')} style={styles.titleCntnrVw} activeOpacity={0.8}>
                  <Text style={styles.titleTxt}>{'Blogs'}</Text>
                  <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
                </TouchableOpacity>
            }
            {
              this.props.blogsList.length <= 0 ? null :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.topMenuTbl}
                  data={this.props.blogsList}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={this.renderBlogs}
                />
            }
            {
              this.state.guidesList.length <= 0 ? null :
                <TouchableOpacity onPress={() => this.props.navigation.navigate('GuidesListing')} style={styles.titleCntnrVw} activeOpacity={0.8}>
                  <Text style={styles.titleTxt}>{'Guides'}</Text>
                  <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
                </TouchableOpacity>
            }
            {
              this.props.blogsList.length <= 0 ? null :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.topMenuTbl}
                  data={this.state.guidesList}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={this.renderGuides}
                />
            }
            {/* <View style={styles.paddingView} /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

let options = [
  {
    image: Images.REMINDER,
    title: 'Set Water Reminder',
  },
  {
    image: Images.MEAL_LOG,
    title: 'Meal Log',
  },
  {
    image: Images.CHALLENGES,
    title: 'Challenges',
  },
];

function mapStateToProps(state: any) {
  console.log(state)
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
    bannersList: state.loginReducer.bannerData.workoutBanners,
    blogsList: state.loginReducer.blogsData.blogsList,
    storiesList: state.loginReducer.storiesData.storyList,
    guidesList: state.loginReducer.guidesData.similarGuides,
    workoutCat: state.loginReducer.workoutData.workoutCat,
    recMealPlans: state.loginReducer.workoutData.recWorkouts,
    isExpired: state.loginReducer.workoutData.isExpired,
    workoutId: state.loginReducer.userInfo.loginData.workoutplan,
    userWorkout: state.loginReducer.workoutData.userWorkout,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    getBlogs: (data: any) => dispatch({ type: blogsKeys.GET_BLOGS, data }),
    getUserProfile: (data: any) => dispatch(getUserInfo(data)),
    getGuide: (data: any) => dispatch(getSimilarGuideList(data)),
    getWorkoutCat: (data: any) => dispatch({ type: workoutKeys.GET_EXERCISES_CAT, data }),
    getBanners: (data: any) => dispatch(getDBBanner(data)),
    saveSimilarBlogList: (data: any) => dispatch(saveSimilarBlogList([])),
    saveBlogDetails: (data: any) => dispatch(saveBlogDetails(undefined)),
    saveSimilarBlogDetails: (data: any) => dispatch(saveSimilarBlogDetails(undefined)),
    saveSimilarStories: (data: any) => dispatch(saveSimilarStories([])),
    saveStoriesDetails: (data: any) => dispatch(saveStoriesDetails(undefined)),
    saveSimilarStoriesDetails: (data: any) => dispatch(saveSimilarStoriesDetails(undefined)),
    getRecomenWorkPlans: (data: any) => dispatch(getRecomMealPlans(data)),
    getuserWorkouts: (data: any) => dispatch(getWorkoutPlanData(data)),
    saveId: (data: any) => dispatch(saveLoginInfo(data)),
    updateWorkoutExpStat: () => dispatch(updateWorkoutExpStat(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);