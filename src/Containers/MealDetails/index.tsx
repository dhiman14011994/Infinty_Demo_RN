
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, BackHandler, Dimensions } from 'react-native';
import { styles } from './styles';
import ProgressCircle from 'react-native-progress-circle'
import color from '../../Constants/Colors';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles';
import AddQtyPopup from '../../Components/AddQtyPopup';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { getFoodDtls } from '../../Redux/Actions/MealActions';
import { FoodDtls } from '../../Modals/MealModl';
//@ts-ignore
import HTML from 'react-native-render-html';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getMealDtls: any,
  token: string,
  foodDtls: FoodDtls,
}

class MealDetails extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  componentDidMount() {
    this.getFoodsData();
  }

  //Fetching blogs
  getFoodsData() {
    const params = {
      "table": "food_items",
      "model": "FoodItem",
      "id": this.props.navigation.state.params.id,
    }
    this.props.getMealDtls({ params: params, token: this.props.token })
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalPadding;
    let data: FoodDtls = this.props.foodDtls;
    let protien = data == undefined ? 0 : (data.protien / 50) * 100;
    let carbs = data == undefined ? 0 : (data.carbs / 275) * 100;
    let fat = data == undefined ? 0 : (data.saturated_fat / 78) * 100;
    return (
      <View style={styles.mainVw}>
        {
          data == undefined ? null :
            <View>
              <Image style={styles.bannerImg} source={Images.MEAL} />
              <SafeAreaView >
                <View style={styles.topNavVw}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
                    <Image style={styles.backImg} source={Images.BACK} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => { }} style={styles.leftBtn}>
            <Image style={styles.commonImg} source={require('../../Assets/addDotted.png')} />
          </TouchableOpacity> */}
                </View>
                <ScrollView style={styles.detailsVw} showsVerticalScrollIndicator={false}>
                  <View style={styles.allDataCntnr}>
                    <View style={styles.titleCntnr}>
                      <View style={styles.titleCw}>
                        <Text style={styles.titleTxt}>{data.title}</Text>
                        {/* <TouchableOpacity style={styles.favBtn}>
                  <Image style={styles.favImg} source={require('../../Assets/fav.png')} />
                </TouchableOpacity> */}
                      </View>
                      {/* <TouchableOpacity style={styles.favBtn}>
                <Image style={styles.addImg} source={require('../../Assets/redDdd.png')} />
              </TouchableOpacity> */}
                    </View>

                    <View style={styles.kcalVw}>
                      <Image style={styles.kclImg} source={Images.KCAL} />
                      <Text style={styles.kclTxt}>{data.total_calories + ' ' + localize.KCAL}</Text>
                      {/* <Image style={styles.kclImg} source={require('../../Assets/heart.png')} />
                      <Text style={styles.kclTxt}>{'1700'}</Text> */}
                    </View>

                    <Text style={styles.headingTxt}>{'About'}</Text>
                    <View style={styles.htmlCntnr}>
                      <HTML ignoredStyles={['font-size', 'font-family', 'width']} imagesMaxWidth={width} baseFontStyle={styles.infoTxt} html={data.about} />
                    </View>

                    <Text style={styles.headingTxt}>{'Nutrition Information'}</Text>
                    <View style={styles.progressVwCntnr}>
                      <View style={{ alignItems: 'center' }}>
                        <ProgressCircle percent={protien} radius={50} borderWidth={8} color={color.APP_PINK_COLOR} shadowColor={'black'} bgColor={color.APP_COMMON_BG_COLOR} >
                          <Text style={[styles.macroTxt, { marginTop: 0, flex: 0 }]}>{protien.toFixed(0) + '%'}</Text>
                        </ProgressCircle>
                        <Text style={styles.commonTxt}>{'PROTIEN'}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <ProgressCircle percent={carbs} radius={50} borderWidth={8} color={color.APP_PINK_COLOR} shadowColor={'black'} bgColor={color.APP_COMMON_BG_COLOR} >
                          <Text style={[styles.macroTxt, { marginTop: 0, flex: 0 }]}>{carbs.toFixed(0) + '%'}</Text>
                        </ProgressCircle>
                        <Text style={styles.commonTxt}>{'CARBS'}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <ProgressCircle percent={fat} radius={50} borderWidth={8} color={color.APP_PINK_COLOR} shadowColor={'black'} bgColor={color.APP_COMMON_BG_COLOR} >
                          <Text style={[styles.macroTxt, { marginTop: 0, flex: 0 }]}>{fat.toFixed(0) + '%'}</Text>
                        </ProgressCircle>
                        <Text style={styles.commonTxt}>{'FAT'}</Text>
                      </View>
                    </View>
                    <Text style={styles.nutriInfoTxt}>{'*Percent Daily Values are based on a 2000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.'}</Text>
                    {
                      data.total_calories == 0 ? null :
                        <View style={[styles.nutritionInfoVw, { borderTopWidth: 1, }]}>
                          <Text style={styles.nutritionTitleTxt}>{'Calories'}</Text>
                          <Text style={styles.nutritionValueTxt}>{data.total_calories + ' ' + localize.KCAL}</Text>
                        </View>
                    }
                    {
                      data.protien == 0 ? null :
                        <View style={[styles.nutritionInfoVw, { borderTopWidth: 1, }]}>
                          <Text style={styles.nutritionTitleTxt}>{'Protien'}</Text>
                          <Text style={styles.nutritionValueTxt}>{data.protien + ' g'}</Text>
                        </View>
                    }
                    <View style={[styles.nutritionInfoVw, { borderTopWidth: 1, flexDirection: 'column', paddingBottom: styles.marginBottom }]}>
                      {
                        data.carbs == 0 ? null :
                          <View style={styles.commonVw}>
                            <Text style={styles.nutritionTitleTxt}>{'Carbs'}</Text>
                            <Text style={styles.nutritionValueTxt}>{data.carbs + ' g'}</Text>
                          </View>
                      }
                      {
                        data.fibre == 0 ? null :
                          <View style={styles.commonVw}>
                            <Text style={styles.nutritionTitleTxt}>{'Fiber'}</Text>
                            <Text style={styles.nutritionValueTxt}>{data.fibre + ' g'}</Text>
                          </View>
                      }
                      {
                        data.sugar == 0 ? null :
                          <View style={styles.commonVw}>
                            <Text style={styles.nutritionTitleTxt}>{'Sugar'}</Text>
                            <Text style={styles.nutritionValueTxt}>{data.sugar + ' g'}</Text>
                          </View>
                      }
                    </View>
                    <View style={[styles.nutritionInfoVw, { borderTopWidth: 1, flexDirection: 'column' }]}>
                      {
                        data.saturated_fat == 0 ? null :
                          <View style={styles.commonVw}>
                            <Text style={styles.nutritionTitleTxt}>{'Saturated fat'}</Text>
                            <Text style={styles.nutritionValueTxt}>{data.saturated_fat + ' g'}</Text>
                          </View>
                      }
                      {
                        data.unsaturated_fat == 0 ? null :
                          <View style={[styles.commonVw, { marginBottom: styles.marginBottom, }]}>
                            <Text style={styles.nutritionTitleTxt}>{'Unsaturated fat'}</Text>
                            <Text style={styles.nutritionValueTxt}>{data.unsaturated_fat + ' g'}</Text>
                          </View>
                      }
                    </View>

                    {/* <ShadowView style={[customStyles.shadow, styles.addToMealCntnr]}>
                      <View style={styles.kcalVw}>
                        <View style={styles.addToMealVw}>
                          <Text style={[styles.addToMealTxt, { flex: 0 }]}>{'Add to Meal '}</Text>
                          <Image style={styles.addToMealImg} source={require('../../Assets/redDdd.png')} />
                        </View>
                        <View style={[styles.sepratorVw, { width: 1, }]} />
                        <View style={styles.addToMealVw}>
                          <Text style={[styles.addToMealTxt, { flex: 0 }]}>{'Favorite'}</Text>
                          <Image style={styles.addToMealImg} source={require('../../Assets/heart.png')} />
                        </View>
                      </View>
                    </ShadowView> */}
                  </View>
                  <View style={styles.paddingView} />
                </ScrollView>
              </SafeAreaView>
            </View>
        }
      </View>
    )
  }
}


function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    foodDtls: state.loginReducer.mealData.foodDtls,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getMealDtls: (data: any) => dispatch(getFoodDtls(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);