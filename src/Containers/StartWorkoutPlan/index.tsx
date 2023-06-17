
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, Dimensions, Alert } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { getMealPlansDtls } from '../../Redux/Actions/MealActions';
import RKImageLoder from '../../Utils/RKImageLoder';
import image from '../../Constants/Images';
//@ts-ignore
import HTML from 'react-native-render-html';
import { RecWorkoutDtls } from '../../Modals/WorkoutModl';
//@ts-ignore
import Tags from "react-native-tags";
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getMealPlanDetails: any,
  workout: RecWorkoutDtls,
  token: any,
  startPlan: any,
  planResponse: any,
  changeStatus: any,
}

class StartWorkoutPlan extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    selectedIndex: 0,
    amount: '0'
  }

  componentDidMount() {
    this.getMealPlanData();
  }

  componentWillReceiveProps(props: any) {
    if (props.workout != undefined) {
      this.setState({ amount: props.workout.three_months_price })
    }
    if (props.planResponse) {
      this.props.changeStatus();
      Alert.alert(
        'Meal plan saved successfully!!',
        '',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.goBack()

          }
        ],
        { cancelable: false }
      );
    }
  }

  //Fetching Meal Details
  private getMealPlanData() {
    const params = {
      "table": "workout_plan",
      "model": "WorkoutPlan",
      "id": this.props.navigation.state.params.id,
    }
    this.props.getMealPlanDetails({ params: params, token: this.props.token, type: 2 })
  }

  //Save Meal Plan
  private saveMealPlan() {
    if (this.state.amount == '0') {
      Alert.alert('Please select a plan.')
      return;
    }
    this.props.navigation.navigate('PaymentMode', { id: this.props.navigation.state.params.id, type: 'workoutplan', amount: this.state.amount, duration: this.state.selectedIndex == 0 ? '3' : this.state.selectedIndex == 1 ? '6' : '12' })
  }

  render() {
    let width = (Dimensions.get('screen').width - styles.totalPadding) / 3;
    let dtls: RecWorkoutDtls = this.props.workout;
    let desc = '';
    return (
      <View style={styles.mainVw}>
        {
          dtls == undefined ? null :
            <SafeAreaView>
              <RKImageLoder style={styles.bannerImg} src={dtls.image} tempImg={Images.PLACEHOLDER} />
              <View style={[styles.opqVw, { opacity: 0.2 }]} />
              <View style={styles.topNavVw}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
                  <Image source={Images.BACK} style={styles.backImg} />
                </TouchableOpacity>
                <Text style={styles.headerTitleTxt}>{dtls.title}</Text>
              </View>
              <ScrollView style={styles.detailsVw} showsVerticalScrollIndicator={false}>
                <View style={styles.allDataCntnr}>
                  <View style={styles.titleCntnr}>
                    <Text style={styles.titleTxt}>{dtls.title}</Text>
                  </View>
                  {
                    dtls.count > 0 ?
                      <View style={styles.kcalVw}>
                        <Image style={styles.kclImg} source={Images.THUMBSUP} />
                        <Text style={styles.kclTxt}>{dtls.count + '+ people are following this plan'}</Text>
                      </View>
                      : <View style={styles.gapVw} />
                  }
                  {/* 
                  <Tags
                    initialTags={dtls.tags}
                    inputContainerStyle={{ height: 0 }}
                    inputStyle={{ height: 0 }}
                    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }: any) => (
                      // <TouchableOpacity style={styles.tagVw} key={`${tag}-${index}`} onPress={onPress}>
                      //   <Text style={styles.tagTxt}>{tag}</Text>
                      // </TouchableOpacity>
                      <View style={styles.tagVw}>
                        <Text style={styles.tagTxt}>{tag}</Text>
                      </View>
                    )}
                  /> */}

                  <Text style={styles.headingTxt}>{'About'}</Text>
                  <View style={styles.htmlCntnr}>
                    <HTML ignoredStyles={['font-size', 'font-family']} baseFontStyle={styles.infoTxt} html={dtls.about} />
                  </View>


                  <View>
                    <Text style={styles.headingTxt}>{'Select Duration'}</Text>
                    <View>
                      <View style={styles.durationCntnr}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ selectedIndex: 2, amount: dtls.one_month_price })} style={[styles.durationBtn, { borderWidth: 2, borderColor: this.state.selectedIndex == 2 ? color.APP_PINK_COLOR : 'transparent' }]}>
                          <View style={styles.monthVw}>
                            <Image source={Images.APPROVE} style={styles.tickImg} />
                            <Text style={styles.timeTxt}>{'1 Month'}</Text>
                            <Text style={styles.amountTxt}>{`$${(dtls.one_month_price / 1).toFixed(2)}/Month`}</Text>
                          </View>
                          <HTML ignoredStyles={['font-size', 'font-family', 'width']} baseFontStyle={styles.descTxt} html={dtls.one_month_description} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ selectedIndex: 0, amount: dtls.three_months_price })} style={[styles.durationBtn, { borderWidth: 2, borderColor: this.state.selectedIndex == 0 ? color.APP_PINK_COLOR : 'transparent' }]}>
                          <View style={styles.monthVw}>
                            <Image source={Images.APPROVE} style={styles.tickImg} />
                            <Text style={styles.timeTxt}>{'3 Months'}</Text>
                            <Text style={styles.amountTxt}>{`$${(dtls.three_months_price / 3).toFixed(2)}/Month`}</Text>
                          </View>
                          <HTML ignoredStyles={['font-size', 'font-family', 'width']} baseFontStyle={styles.descTxt} html={dtls.three_months_description} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ selectedIndex: 1, amount: dtls.six_months_price })} style={[styles.durationBtn, { borderWidth: 2, borderColor: this.state.selectedIndex == 1 ? color.APP_PINK_COLOR : 'transparent' }]}>
                          <View style={styles.monthVw}>
                            <Image source={Images.APPROVE} style={styles.tickImg} />
                            <Text style={styles.timeTxt}>{'6 Months'}</Text>
                            <Text style={styles.amountTxt}>{`$${(dtls.six_months_price / 6).toFixed(2)}/Month`}</Text>
                          </View>
                          <HTML ignoredStyles={['font-size', 'font-family', 'width']} baseFontStyle={styles.descTxt} html={dtls.six_months_description} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <RedButton title={'Start this Plan'} onPress={() => this.saveMealPlan()} />
                <View style={styles.paddingView} />
              </ScrollView>
            </SafeAreaView>
        }
      </View >
    )
  }
}


function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    workout: state.loginReducer.workoutData.recWorkoutDtls,
    planResponse: state.loginReducer.mealData.planPurchased,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getMealPlanDetails: (data: any) => dispatch(getMealPlansDtls(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartWorkoutPlan);