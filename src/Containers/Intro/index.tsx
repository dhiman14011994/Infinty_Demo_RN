import React, { Component } from 'react';
import { View, Image, Dimensions, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../Constants/Colors';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

interface Props {
  navigation: NavigationScreenProp<any, any>,
};

export default class Intro extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    loadData: true,
    index: 0,
    btnTxt: localize.NEXT,
  }

  private introArr = [
    {
      desc: localize.INTRO1_TEXT,
      image: Images.INTRO1,
    },
    {
      desc: localize.INTRO2_TEXT,
      image: Images.INTRO2,
    },
    {
      desc: localize.INTRO3_TEXT,
      image: Images.INTRO3,
    },
  ]

  async componentDidMount() {

  }

  //Render screen based on index
  private renderIntroScreens(info: any) {
    let width = Dimensions.get('screen').width;
    return (
      <View style={[styles.swiper, { width: width }]}>
        <Image source={info.image} style={styles.introImg} />
        <Text numberOfLines={6} style={styles.descTxt}>{info.desc}</Text>
      </View>
    )
  }

  private async nextBtn() {
    // If user on last index the will show sign up button else will show next button with its functionality
    if (this.state.index == 2) {
      try {
        await AsyncStorage.setItem('isIntro', '1');
      } catch (error) {
      }
      this.props.navigation.navigate('Login')
    }
    else {
      let index = this.state.index + 1;
      this.setState({ index: index, btnTxt: index == 2 ? localize.GET_STARTED : localize.NEXT, })
    }
  }

  private async skipBtn() {
    // If user on last index the will show sign up button else will show next button with its functionality
    try {
      await AsyncStorage.setItem('isIntro', '1');
    } catch (error) {
    }
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <TouchableOpacity style={styles.skipBtn} onPress={() => this.skipBtn()} activeOpacity={0.8}>
            <Text style={styles.skipTxt}>{localize.SKIP}</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={{ flex: 1 }}>
          <Swiper loadMinimal autoplayTimeout={10} scrollEnabled={true} showsPagination={false} index={this.state.index} onIndexChanged={(index: any) => this.setState({ index: index, btnTxt: index == 2 ? localize.GET_STARTED : localize.NEXT, })} style={styles.wrapper} height={styles.swiperHeight} width={Dimensions.get('screen').width} autoplay={false} loop={false}>
            {
              this.introArr.map((data: any) =>
                this.renderIntroScreens(data)
              )
            }
          </Swiper>
        </SafeAreaView>
        <SafeAreaView>
          <View style={styles.nextPrevVw}>
            <View style={styles.indexVw}>
              <View style={this.state.index == 0 ? styles.activeIndex : [styles.inActiveIndex, { opacity: 0.3 }]} />
              <View style={this.state.index == 1 ? styles.activeIndex : [styles.inActiveIndex, { opacity: 0.3 }]} />
              <View style={this.state.index == 2 ? styles.activeIndex : [styles.inActiveIndex, { opacity: 0.3 }]} />
            </View>
          </View>
          <TouchableOpacity style={styles.nextPrevBtn} onPress={() => this.nextBtn()} activeOpacity={0.8}>
            <Text style={styles.btnTxt}>{this.state.btnTxt}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    )
  }
}