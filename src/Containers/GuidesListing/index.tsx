import React, { Component } from 'react';
import { SafeAreaView, Image, Dimensions, View, Text, FlatList, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import Swiper from 'react-native-swiper'
import GuidesCell from '../../Cells/GuidesCell';
import { NavigationScreenProp } from 'react-navigation';
import { GuideModl } from '../../Modals/GuidesModl';
import { connect } from 'react-redux';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';
import { getGuidesList } from '../../Redux/ReduxAPIHandler/GuidesApi';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class GuidesListing extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {    
    index: 0,
    weightList: [] as GuideModl[],
    recoveryList: [] as GuideModl[],
    bannerList: [] as GuideModl[],
  }

  componentDidMount() {
    this.getBanner();
    this.getRecovery();
    this.getGuides()
  }

  //Rendring swiper content
  private renderSwiperVw(item: GuideModl) {
    let width = Dimensions.get('screen').width
    return (
      <TouchableOpacity style={[styles.swiperContentVw, { width: width }]} onPress={() => this.props.navigation.navigate('GuidesDetail', { id: item.id })} activeOpacity={0.8} >
        <RKImageLoder style={styles.bannerImg} src={item.image} tempImg={Images.PLACEHOLDER} />
        <View style={styles.swiperTxtVw}>
          <Text style={styles.titleTxt}>{item.tag_line}</Text>
          <Text numberOfLines={2} style={styles.infoTxt}>{item.title}</Text>
        </View>
        <View style={[styles.opqVw, { opacity: 0.2 }]} />
      </TouchableOpacity>
    )
  }

  //Creating blogs view here
  private renderBlogs = (data: any) => {
    return (
      <GuidesCell data={data} onPress={() => this.props.navigation.navigate('GuidesDetail', { id: data.item.id })} />
    )
  }

  //Fetching Guieds
  private async getGuides() {
    let params = {
      "table": "guides",
      "model": "Guide",
      "category": 3,
    }
    let data = await getGuidesList(params, this.props.token)
    this.setState({ weightList: data })
  }

   //Fetching Guieds
   private async getRecovery() {
    let params = {
      "table": "guides",
      "model": "Guide",
      "category": 4,
    }
    let data = await getGuidesList(params, this.props.token)
    this.setState({ recoveryList: data })
  }

  //Fetching Guieds Banner
  private async getBanner() {
    let params = {
      "table": "guides",
      "model": "Guide",
      "category": 5,
    }
    let data = await getGuidesList(params, this.props.token)
    this.setState({ bannerList: data })
  }

  //Checking if table reaches end or not
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 50; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render() {
    let width = Dimensions.get('screen').width / 3;
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Guides'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
          <View style={styles.swiperCntnr}>
            {
              this.state.bannerList.length <= 0 ? null :
                <Swiper autoplayTimeout={10} scrollEnabled={true} showsPagination={false} index={this.state.index} onIndexChanged={(index: any) => this.setState({ index: index })} style={styles.wrapper} height={styles.swiperHeight} width={Dimensions.get('screen').width} autoplay={true} loop={true}>
                  {
                    this.state.bannerList.map((item: any) => (
                      this.renderSwiperVw(item)
                    ))
                  }
                </Swiper>
            }
            <View style={styles.indexVw}>
              {
                this.state.bannerList.map((data: any, index: any) =>
                  <View style={this.state.index == index ? styles.activeIndex : styles.inActiveIndex} />
                )
              }
            </View>
          </View>
          {
            this.state.weightList.length <= 0 ? null :
              <TouchableOpacity onPress={() => this.props.navigation.navigate('GuidesInvidivualList', {type: 3, title: 'Weight Loss'})} style={styles.titleCntnrVw} activeOpacity={0.8}>
                <Text style={styles.listTitleTxt}>{'Weight Loss'}</Text>
                <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
              </TouchableOpacity>
          }
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.weightList}
            style={styles.tblVw}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={this.renderBlogs}
          />
          {
            this.state.recoveryList.length <= 0 ? null :
              <TouchableOpacity onPress={() => this.props.navigation.navigate('GuidesInvidivualList', {type: 4, title: 'Injury Recovery'})}  style={styles.titleCntnrVw} activeOpacity={0.8}>
                <Text style={styles.listTitleTxt}>{'Injury Recovery'}</Text>
                <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
              </TouchableOpacity>
          }
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.recoveryList}
            style={styles.tblVw}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={this.renderBlogs}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuidesListing);