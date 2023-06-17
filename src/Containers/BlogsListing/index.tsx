import React, { Component } from 'react';
import { SafeAreaView, Image, Dimensions, View, Text, FlatList, ScrollView, TouchableOpacity, BackHandler, Alert } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import Swiper from 'react-native-swiper'
import TrendingReadsCell from '../../Cells/TrendingReadsCell';
import color from '../../Constants/Colors';
import BlogsListCell from '../../Cells/BlogsListCell';
import { NavigationScreenProp } from 'react-navigation';
import blogsKeys from '../../Redux/Constants/BlogsKeys';
import { connect } from 'react-redux';
import { BannerModl } from '../../Modals/BannerModl';
import { getDBBanner } from '../../Redux/Actions/BannerActions';
import { Blogs } from '../../Modals/BlogsModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import { saveSimilarBlogList, saveBlogDetails, saveSimilarBlogDetails } from '../../Redux/Actions/BlogsActions';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getBlogs: any,
  getTrendBlogs: any,
  getFeaturedBlogs: any,
  blogsList: Blogs[],
  featuredBlogs: Blogs[],
  treandingList: Blogs[],
  token: string,
  getBanners: any,
  bannersList: BannerModl[],
  saveSimilarBlogList: any,
  saveBlogDetails: any,
  saveSimilarBlogDetails: any,
}

class BlogsListing extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    index: 0,
    menuIndex: 0,
  }

  componentDidMount() {
    this.getBlogsData(1);
    this.getTrendBlogsData();
    this.getBannerData();
    // this.getFavouriteData();
    let self = this;
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'BlogsListing') {
        this.clearCache();
        self.getBlogsData(self.state.menuIndex + 1)
      }
    });
  }

  componentWillReceiveProps(props: any) {
  }

  clearCache() {
    this.props.saveSimilarBlogList();
    this.props.saveBlogDetails();
    this.props.saveSimilarBlogDetails();
  }

  //Fetching blogs
  getBlogsData(category: any) {
    let params = {} as any;
    params = {
      "table": "blogs",
      "model": "Blog",
      "category": category,
    }
    this.props.getBlogs({ params: params, token: this.props.token })
  }

  // //Fetching blogs
  // getFavouriteData() {
  //   const params = {
  //     "table":"blogs",
  //     "model":"Blog",
  //     "type":"blog"
  //   }
  //   this.props.getBlogs({ params: params, token: this.props.token })
  // }

  //Fetching blogs
  getTrendBlogsData() {
    const params = {
      "table": "blogs",
      "model": "Blog",
      "category": 5,
    }
    this.props.getTrendBlogs({ params: params, token: this.props.token })
  }

  //Get banner api called here from reducer
  private getBannerData() {
    const params = {
      "table": "blogs",
      "model": "Blog",
      "category": 7,
    }
    this.props.getFeaturedBlogs({ params: params, token: this.props.token, type: 8 })
  }

  //Rendring swiper content
  private renderSwiperVw(item: any) {
    let text1 = item.title.split(' ').slice(0, -1).join(" ");
    let text2 = item.title.split(' ')[item.title.split(' ').length - 1];
    console.log('item.image: ', item.image)
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('BlogsDetails', { id: item.id })} activeOpacity={0.8} style={[styles.swiperContentVw, { width: Dimensions.get('screen').width, backgroundColor: 'red' }]}>
        <RKImageLoder style={styles.bannerImg} src={item.image} tempImg={Images.PLACEHOLDER} />
        <View style={[styles.opqVw, { opacity: 0.2, width: '100%' }]} />
        <View style={styles.swiperTxtVw}>
          <Text numberOfLines={2} style={styles.infoTxt}>{text1}<Text style={{ color: color.APP_PINK_COLOR }}>{' ' + text2}</Text></Text>
        </View>
      </TouchableOpacity>
    )
  }

  //Creating treandings reads view here
  private renderTreandings = (data: any) => {
    return (
      <TrendingReadsCell data={data} onPress={() => this.props.navigation.navigate('BlogsTrendSimilarDtls', { id: data.item.id })} />
    )
  }

  //Creating blogs view here
  private renderBlogs = (data: any) => {

    return (
      <BlogsListCell data={data} onPress={() => this.props.navigation.navigate('BlogsDetails', { id: data.item.id })} />
    )
  }

  private hndleCatTaps(index: any) {
    this.setState({ menuIndex: index, })
    this.getBlogsData(index + 1)
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Blogs'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollVw}>
          {
            this.props.featuredBlogs.length <= 0 ? null :
              <View style={styles.swiperCntnr}>
                <Swiper removeClippedSubviews={false} autoplayTimeout={10} scrollEnabled={true} showsPagination={false} index={this.state.index} onIndexChanged={(index: any) => this.setState({ index: index })} style={styles.wrapper} height={styles.swiperHeight} width={Dimensions.get('screen').width} autoplay={true} loop={true}>
                  {
                    this.props.featuredBlogs.map((item: any) => (
                      this.renderSwiperVw(item)
                    ))
                  }
                </Swiper>
                <View style={styles.indexVw}>
                  {
                    this.props.featuredBlogs.map((item: any, index: any) => (
                      <View style={this.state.index == index ? styles.activeIndex : styles.inActiveIndex} />
                    ))
                  }
                </View>
              </View>
          }
          {/* {
            this.props.treandingList.length > 0 ?
              <View>
                <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('TrendRecentBlogs', { isTrend: true })}>
                  <Text style={styles.subTitleTxt}>{'Trending Reads'}</Text>
                  <Image source={require('../../Assets/rightArrow.png')} style={styles.arrowImg} />
                </TouchableOpacity>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.topMenuTbl}
                  data={this.props.treandingList}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={this.renderTreandings}
                />
              </View>
              : null
          } */}
          <View style={styles.menuVw}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.hndleCatTaps(0)} style={styles.menuBtn}>
              <Text style={[styles.menuTxt, { color: this.state.menuIndex == 0 ? color.APP_PINK_COLOR : color.APP_LIGHT_COLOR }]}>{'Trending'}</Text>
              <View style={[styles.selectedVw, { height: this.state.menuIndex == 0 ? 4 : 0 }]} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.hndleCatTaps(1)} style={styles.menuBtn}>
              <Text style={[styles.menuTxt, { color: this.state.menuIndex == 1 ? color.APP_PINK_COLOR : color.APP_LIGHT_COLOR }]}>{'New'}</Text>
              <View style={[styles.selectedVw, { height: this.state.menuIndex == 1 ? 4 : 0 }]} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.hndleCatTaps(2)} style={styles.menuBtn}>
              <Text style={[styles.menuTxt, { color: this.state.menuIndex == 2 ? color.APP_PINK_COLOR : color.APP_LIGHT_COLOR }]}>{'Fitness'}</Text>
              <View style={[styles.selectedVw, { height: this.state.menuIndex == 2 ? 4 : 0 }]} />
            </TouchableOpacity>
          </View>
          {
            this.props.blogsList.length == 0 ?
              <Text style={styles.noBlogsTxt}>{'No Blogs Found'}</Text> :
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.blogsList}
                style={styles.tblVw}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.renderBlogs}
              />
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    treandingList: state.loginReducer.blogsData.treandingReads,
    blogsList: state.loginReducer.blogsData.catBlogsList,
    bannersList: state.loginReducer.bannerData.blogsBanners,
    featuredBlogs: state.loginReducer.blogsData.featuredBlogsList,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getBlogs: (data: any) => dispatch({ type: blogsKeys.GET_BLOGS, data }),
    getFeaturedBlogs: (data: any) => dispatch({ type: blogsKeys.GET_FEATURED_BLOGS, data }),
    getTrendBlogs: (data: any) => dispatch({ type: blogsKeys.GET_TREND_BLOGS, data }),
    getBanners: (data: any) => dispatch(getDBBanner(data)),
    saveSimilarBlogList: () => dispatch(saveSimilarBlogList([])),
    saveBlogDetails: () => dispatch(saveBlogDetails(undefined)),
    saveSimilarBlogDetails: () => dispatch(saveSimilarBlogDetails(undefined)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsListing);