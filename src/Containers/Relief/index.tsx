import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Text, Image, FlatList, Dimensions, BackHandler, Alert } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import ReliefCell from '../../Cells/ReliefCell';
import Images from '../../Utils/ImageGenerator';
import HealthTipsCell from '../../Cells/HealthTipsCell';
import ReliefKeys from '../../Redux/Constants/ReliefKeys';
import { HomeRemedies, ReliefExercise } from '../../Modals/ReliefModl'
//@ts-ignore
import Tags from "react-native-tags";
import { getHealthTips } from '../../Redux/ReduxAPIHandler/BlogApis';
import { saveBlogDetails } from '../../Redux/Actions/BlogsActions';
import { getBanners } from '../../Redux/ReduxAPIHandler/BannerApis';
import { BannerModl } from '../../Modals/BannerModl';
import RKImageLoder from '../../Utils/RKImageLoder';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,

  //homeRemedies
  getHomeRemedies: any,
  homeRemedies: HomeRemedies[],

  // ReliefExercise
  getReliefExercise: any,
  reliefExercise: ReliefExercise[],

  saveBlogDetails: any,
}

class Relief extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    blogs: [],
    banners: [] as BannerModl[],

  }

  async componentDidMount() {
    this.getHomeRemediesData();
    this.getReliefExerciseData();
    this.getHealthTipsList();
    this.getBannerData();

    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'Relief') {
        this.clearCache();
      }
    })
  }

  clearCache() {
    this.props.saveBlogDetails();
  }

  getHomeRemediesData = () => {

    const params = {
      "table": "home_remedies",
      "model": "HomeRemedy"
    }

    this.props.getHomeRemedies({ params: params, token: this.props.token, isCat: true })
  }

  getReliefExerciseData = () => {
    const params = {
      "table": "relief_exercises",
      "model": "ReliefExercise"
    }
    this.props.getReliefExercise({ params: params, token: this.props.token, isCat: true })
  }

  async getHealthTipsList() {
    const params = {
      "table": "blogs",
      "model": "Blog",
      "category": 8,
    }
    let data = await getHealthTips(params, this.props.token);
    this.setState({ blogs: data })
  }

  //Fetching banners
  private async getBannerData() {
    const params = {
      "table": "banners",
      "model": "Banner",
      "category": 4,
    }
    let banners = await getBanners(params, this.props.token)
    this.setState({ banners: banners });
  }

  //Creating relief plans here
  private releifCell = ({ item, index }: any) => {
    return (
      <ReliefCell isReleif={false} data={item} onTapCell={() => this.props.navigation.navigate('ReliefDtls', { id: item.id, type: 1 })} />
    )
  }

  //Creating remedies plans here
  private remediesCell = ({ item, index }: any) => {
    return (
      <ReliefCell isReleif={true} data={item} onTapCell={() => this.props.navigation.navigate('ReliefDtls', { id: item.id, type: 2 })} />
    )
  }

  //Creating tips here
  private tipsCell = ({ item, index }: any) => {
    return (
      <HealthTipsCell data={item} onPress={() => this.props.navigation.navigate('BlogsDetails', { id: item.id })} />
    )
  }

  render() {
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
        <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
          {
            this.state.banners.length <= 0 ? null :
              <TouchableOpacity style={styles.bannerVw} onPress={() => this.props.navigation.navigate('Consultation')} activeOpacity={0.8}>
                <RKImageLoder style={[styles.bannerImg, { aspectRatio: 2 }]} src={this.state.banners[0].image} tempImg={Images.PLACEHOLDER} />
              </TouchableOpacity>
          }
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ReleifListing', { type: 1, title: 'Stretches & Yoga' })} style={styles.titleCntnrVw} activeOpacity={0.8}>
              <Text style={styles.titleTxt}>{'Stretches & Yoga'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.topMenuTbl}
              data={this.props.reliefExercise}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.releifCell}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ReleifListing', { type: 2, title: 'Health Tips' })} style={styles.titleCntnrVw} activeOpacity={0.8}>
              <Text style={styles.titleTxt}>{'Health Tips'}</Text>
              <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
            </TouchableOpacity>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.topMenuTbl}
              data={this.state.blogs}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.tipsCell}
            />
          </View>
          {this.props.homeRemedies.length <= 0 ? null :
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ReleifListing', { type: 3, title: 'Home Remedies' })} style={styles.titleCntnrVw} activeOpacity={0.8}>
                <Text style={styles.titleTxt}>{'Home Remedies'}</Text>
                <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
              </TouchableOpacity>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.topMenuTbl}
                data={this.props.homeRemedies}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.remediesCell}
              />
            </View>}

          <View style={styles.paddingView} />
        </ScrollView >
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
    homeRemedies: state.loginReducer.homeReliefData.HomeRemedies,
    reliefExercise: state.loginReducer.homeReliefData.ReliefExercise

  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getHomeRemedies: (data: any) => dispatch({ type: ReliefKeys.GET_HOMEREMEDIES, data }),
    getReliefExercise: (data: any) => dispatch({ type: ReliefKeys.GET_RELIEFEXERCISE, data }),
    saveBlogDetails: () => dispatch(saveBlogDetails(undefined)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Relief);
