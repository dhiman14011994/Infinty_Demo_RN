import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Text, Image, FlatList, Dimensions, BackHandler, Alert } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import PopularMealsCell from '../../Cells/PopularMealsCell';
import ActiveMealplan from './ActiveMealplan';
import MealLog from './MealLog'
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view'
import customStyles from '../../Constants/Styles'
import { MealPlan, UserMealPlan, UserWeekDayMeal, LoggedMeal, MealLogged } from '../../Modals/MealModl';
import { connect } from 'react-redux';
import { getMealPlans, getUserMealPlans, getUserMealPlansDay, saveUserMealPlansDay, getRecomMealPlans, getLoggedMeal, getLoggedData, updateMealExpStat, saveMealPlansDtls, saveFoodDtls } from '../../Redux/Actions/MealActions';
import UserMealPlanCell from '../../Cells/UserMealPlanCell';
import RecomendedMealCell from '../../Cells/RecomendedMealCell';
import Moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserInfo, saveLoginInfo } from '../../Redux/Actions/LoginActions';
import { UserInfo } from '../../Modals/LoginModl';
import Images from '../../Utils/ImageGenerator';
//@ts-ignore
import SwitchButton from 'switch-button-react-native';
import color from '../../Constants/Colors';
import RedButton from '../../Components/RedButton';
import { all } from 'redux-saga/effects';
import { getBanners } from '../../Redux/ReduxAPIHandler/BannerApis';
import { BannerModl } from '../../Modals/BannerModl';
import RKImageLoder from '../../Utils/RKImageLoder';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getMealPlans: any,
  getRecomenMealPlans: any,
  getUserMealPlans: any,
  getUserWeeklyMeal: any,
  mealPlans: MealPlan[],
  recMealPlans: MealPlan[],
  userMealPlans: UserMealPlan,
  userWeekDayMeal: UserWeekDayMeal,
  token: string,
  mealId: any,
  removePlan: any,
  recommendFound: boolean,
  getLoggedMeal: any,
  getLoggedData: any,
  loggedMeal: LoggedMeal[],
  mealLogged: MealLogged,
  isExpired: boolean,
  saveId: any,
  updateMealExpStat: any,
  saveMealPlansDtls: any,
  saveFoodDtls: any,
  getUserProfile: any;
  userProfile: UserInfo;
}

class Nutrition extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    index: 0,
    mealId: '',
    isPurchased: false,
    userMealPlans: undefined as any as UserMealPlan,
    userWeekDayMeal: undefined as any as UserWeekDayMeal,
    loggedMeal: [] as LoggedMeal[],
    mealLogged: undefined as any as MealLogged,
    banners: [] as BannerModl[],
  }

  isRecomended = this.props.recMealPlans.length > 0 ? true : false;
  recData: any = undefined;
  prevRec: any = undefined;

  componentDidMount() {
    let self = this;
    self.getBannerData();

    this.props.navigation.addListener('willFocus', async (event: any) => {
      if (event.state != undefined && event.state.routeName == 'Nutrition') {
        this.getLoggedMeal();
        this.getLoggedData();
        this.clearCache();
        try {
          let index = await AsyncStorage.getItem('index');
          this.setState({ index: index == null ? 0 : index })
          await AsyncStorage.setItem('index', index?.toString() ?? '0');
        } catch (error) {
          // this.setState({ index: '0' })
        }
        if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.mcq) {

          this.recData = this.props.navigation.state.params.mcq;
          if (this.props.navigation.state.params.mcq != undefined && this.props.navigation.state.params.mcq.length != 0) {
            this.prevRec = this.props.navigation.state.params.mcq;

          }
          if (this.recData.length > 0) {
            this.getRecomMealPlansData(this.recData);
            this.props.navigation.setParams({ mcq: [] })
            //isRecomended: this.props.navigation.state.params != undefined && this.props.navigation.state.params.recomended ? true : false
            // this.setState({ index: 0 })
          }
        }
      }
    });
  }

  async componentWillReceiveProps(props: any) {
    if (props.isExpired) {
      try {
        this.setState({ isPurchased: false })
        const value: any = await AsyncStorage.getItem('loginData');
        let userInfo: any = JSON.parse(value)
        userInfo['mealplan'] = '';
        await AsyncStorage.setItem('loginData', JSON.stringify(userInfo));
        this.props.saveId({ success: userInfo })
        this.props.updateMealExpStat();
      } catch (error) {
        Alert.alert(error);
      }
    }
    else {
      if (props.mealId != undefined && props.mealId != null && props.mealId != '' && props.userMealPlans == undefined) {
        this.setState({ isPurchased: true, mealId: props.mealId })
        this.getActiveMealPlans(props.mealId);
      }
      if (props.userMealPlans != undefined) {
        this.setState({ userMealPlans: props.userMealPlans, userWeekDayMeal: props.userWeekDayMeal })
        if (this.props.userWeekDayMeal == undefined && this.state.isPurchased && props.mealId != undefined && props.mealId != null && props.mealId != '') {
          this.getWeeklyMealPlans(props.userMealPlans.mainData.current_week, props.mealId)
        }
      }
      this.setState({ loggedMeal: props.loggedMeal, mealLogged: props.mealLogged })
      if (!this.state.isPurchased && this.props.mealPlans.length == 0) {

        this.getMealPlansData();
      }
      else {

      }

    }
  }

  clearCache() {
    this.props.saveMealPlansDtls();
    this.props.saveFoodDtls();
  }

  //Fetching banners
  private getMealPlansData() {
    const params = {
      "table": "meal_plan",
      "model": "MealPlan",
    }
    this.props.getMealPlans({ params: params, token: this.props.token, type: 1 })
  }

  //Fetching Recommended Plans
  private getRecomMealPlansData(data: any[]) {
    if (data.length > 0) {
      const params = {
        "data": {
          "normal": {
            "ans": data,
            "plan_type": "mealplan",
          },
          "mcq": ''
        },
      }

      this.props.getRecomenMealPlans({ params: params, token: this.props.token, type: 1 })
    }
  }

  //Fetching banners
  private getActiveMealPlans(id: any) {
    const params = {
      "meal_plan_id": id,
    }
    this.props.getUserMealPlans({ params: params, token: this.props.token, type: 1 })
  }

  //Fetching logged meal
  private getLoggedMeal() {
    let date = Moment(new Date()).format('YYYY-MM-DD').toString();
    let endPoint = `?date=${date}`;
    this.props.getLoggedMeal({ endPoint: endPoint, token: this.props.token })
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

  //Fetching banners
  private getWeeklyMealPlans(weekNo: any, id: any) {
    const params = {
      "meal_plan_id": id,
      "week_no": weekNo
    }
    this.props.getUserWeeklyMeal({ params: params, token: this.props.token, type: 1 })
  }

  //Fetching banners
  private async getBannerData() {
    const params = {
      "table": "banners",
      "model": "Banner",
      "category": 3,
    }
    let banners = await getBanners(params, this.props.token)
    this.setState({banners: banners});
  }

  //Creating meals plans here
  private renderPopularMeals = ({ item, index }: any) => {
    return (
      <PopularMealsCell data={item} onTapCell={() => this.props.navigation.navigate('MealDetails')} />
    )
  }

  //Creating meals plans here
  private recMeals = ({ item, index }: any) => {
    return (
      <RecomendedMealCell data={item} onTapCell={() => this.props.navigation.navigate('StartMealPlan', { id: item.id, isRecommended: true })} />
    )
  }

  //Creating meals plans here
  private popularMeals = ({ item, index }: any) => {
    return (
      <UserMealPlanCell isPurchased={this.state.isPurchased} data={item} onTapCell={() => this.props.navigation.navigate('StartMealPlan', { id: item.id, isRecommended: false })} />
    )
  }

  getStartButton() {
    this.props.navigation.navigate('Login', {
      onGoBack: () => {},
    });
  }

  renderPoints(title: string, desc: string) {
    return (
      <View style={styles.pointsVw}>
        <Image style={styles.tickImg} source={Images.TICK} />
        <View>
          <Text style={styles.pointsTitleTxt}>{title}</Text>
          <Text style={styles.pointsDescTxt}>{desc}</Text>
        </View>
      </View>
    )
  }

  async onValueChange(val: any) {
    val = val == 1 ? 0 : 2
    this.setState({ index: val });
    await AsyncStorage.setItem('index', val.toString());
  }

  render() {
    this.isRecomended = this.state.isPurchased ? false : this.props.recMealPlans.length > 0 ? true : false;
    let width = (Dimensions.get('screen').width - styles.totalMargin) / 2;
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Nutrition'}
          isMultiple={true}
          leftBtnActn={() => this.props.navigation.navigate('Reminders')}
          right2BtnActn={() => this.props.navigation.navigate('Messages')}
          btnImage={Images.NOTIFICATION}
          right2Image={Images.CHAT}
        />
        <View style={[styles.switchVw, { width: Dimensions.get('screen').width - styles.totalMargin }]}>
          <SwitchButton
            activeSwitch={this.state.index == 0 ? 1 : 2}
            onValueChange={(val: any) => this.onValueChange(val)}
            text1={this.state.isPurchased ? 'My Plan' : 'Meal Plans'}
            text2='Meal Log'
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
        {
          <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
            {
              this.state.banners.length == 0 || this.state.index == 2 || (this.state.isPurchased || this.isRecomended) ? null :
                <View style={styles.getNowCntnr}>
                  {/* <Image source={Images.MEAL_BG} style={styles.bannerImg} /> */}
                  <RKImageLoder style={styles.bannerImg} src={this.state.banners[0].image} tempImg={Images.PLACEHOLDER} />

                  {/* <View style={{ height: '100%', width: Dimensions.get('screen').width, position: 'absolute', backgroundColor: '#00000042' }} />
                  <Text style={styles.getACoachTxt}>{'Get Customized Meal Plan From OUR NUTRITIONIST'}</Text>
                  <Text style={styles.nowTxt}>{'NOW'}</Text> */}
                </View>
            }
            {
              this.state.index == 0 ?
                <View>
                  {
                    this.isRecomended || this.state.isPurchased ?
                      null :
                      <View>
                        <Text style={styles.setGoalTxt}>{'Set goals and meet them'}</Text>
                        <Text style={styles.ourPersonalTxt}>{'Our personalized meal plans are delicious, healthy, and easy to follow'}</Text>
                        {
                          this.renderPoints('Know what you eat', "Track the nutrients in your food to know you're on the right track")
                        }
                        {
                          this.renderPoints('Eat what you love', "Track the nutrients in your food to know you're on the right track")
                        }
                        {
                          this.renderPoints('Your personal nutrition manager', "Track the nutrients in your food to know you're on the right track")
                        }
                        <RedButton title={'Get Started'} onPress={() => this.props.navigation.navigate('CraftPlan', { isFromMeal: true })} />
                      </View>
                  }

                  {
                    this.state.isPurchased && this.props.userMealPlans != undefined ?
                      <View>
                        <View style={styles.titleCntnrVw}>
                          <Text style={styles.titleTxt}>{this.props.userMealPlans.mainData.mtitle}</Text>
                          {/* <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} /> */}
                        </View>
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          style={styles.topMenuTbl}
                          data={this.state.userMealPlans == undefined ? [] : this.state.userMealPlans.weeksData}
                          keyExtractor={(item: any, index: any) => index.toString()}
                          renderItem={this.popularMeals}
                        />
                      </View>
                      : null
                  }
                  {

                    this.isRecomended && !this.state.isPurchased ?
                      <View>
                        <TouchableOpacity onPress={() => { }} style={styles.titleCntnrVw} activeOpacity={1}>
                          <Text style={styles.titleTxt}>{'Recommended Plans'}</Text>
                          {/* <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} /> */}
                        </TouchableOpacity>
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          style={styles.topMenuTbl}
                          data={this.props.recMealPlans}
                          keyExtractor={(item: any, index: any) => index.toString()}
                          renderItem={this.recMeals}
                        />
                      </View>
                      : null
                  }
                  {

                    // this.state.isPurchased || this.isRecomended  ? Alert.alert(JSON.stringify(this.isRecomended)) :

                    this.state.isPurchased || this.isRecomended ? null :

                      <View>
                        <TouchableOpacity onPress={() => { this.state.isPurchased ? {} : this.props.navigation.navigate('PopularMealPlan', { isRec: false }) }} style={styles.titleCntnrVw} activeOpacity={0.8}>
                          <Text style={styles.titleTxt}>{'Popular Meal Plans'}</Text>
                          <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
                        </TouchableOpacity>
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          style={styles.topMenuTbl}
                          data={this.props.mealPlans}
                          keyExtractor={(item: any, index: any) => index.toString()}
                          renderItem={this.popularMeals}
                        />
                      </View>
                  }
                </View>
                : null
            }
            {
              this.state.index == 0 ? this.state.userMealPlans == undefined || this.state.userWeekDayMeal == undefined ? null :
                <ActiveMealplan onPressWeek={(week: any) => this.getWeeklyMealPlans(week, this.state.mealId)} userWeekDayMeal={this.state.userWeekDayMeal} isPurchased={this.state.isPurchased} userMealPlans={this.state.userMealPlans} /> :
                // this.state.index == 1 ?
                //   this.props.navigation.navigate('FoodListing') :
                  <MealLog navigation={this.props.navigation} loggedData={this.state.loggedMeal} mealLogged={this.state.mealLogged} isPurchased={this.state.isPurchased} userWeekDayMeal={this.state.userWeekDayMeal} />
            }
            <View style={styles.paddingView} />
          </ScrollView>
        }
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    mealId: state.loginReducer.userInfo.loginData.mealplan,
    mealPlans: state.loginReducer.mealData.mealPlans,
    recMealPlans: state.loginReducer.mealData.recMealPlans,
    userMealPlans: state.loginReducer.mealData.userMealPlans,
    userWeekDayMeal: state.loginReducer.mealData.userWeekPlan,
    recommendFound: state.loginReducer.mealData.recomendFound,
    loggedMeal: state.loginReducer.mealData.loggedMeal,
    mealLogged: state.loginReducer.mealData.mealLogged,
    isExpired: state.loginReducer.mealData.isExpired,
    userProfile: state.loginReducer.userInfo.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getMealPlans: (data: any) => dispatch(getMealPlans(data)),
    getRecomenMealPlans: (data: any) => dispatch(getRecomMealPlans(data)),
    getUserMealPlans: (data: any) => dispatch(getUserMealPlans(data)),
    getUserWeeklyMeal: (data: any) => dispatch(getUserMealPlansDay(data)),
    removePlan: (data: any) => dispatch(saveUserMealPlansDay(data)),
    getLoggedMeal: (data: any) => dispatch(getLoggedMeal(data)),
    getLoggedData: (data: any) => dispatch(getLoggedData(data)),
    saveId: (data: any) => dispatch(saveLoginInfo(data)),
    updateMealExpStat: () => dispatch(updateMealExpStat(false)),
    saveMealPlansDtls: () => dispatch(saveMealPlansDtls(undefined)),
    saveFoodDtls: () => dispatch(saveFoodDtls(undefined)),
    getUserProfile: (data: any) => dispatch(getUserInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nutrition);
