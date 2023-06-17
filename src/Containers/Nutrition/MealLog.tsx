
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, Image, Alert } from 'react-native';
import { styles } from './styles';
import MealContainerCell from '../../Cells/MealContainerCell';
import Moment from 'moment';
import { NavigationScreenProp } from 'react-navigation';
import { LoggedMeal, MealLogged, UserWeekDayMeal } from '../../Modals/MealModl';
import Images from '../../Utils/ImageGenerator';
import * as Progress from 'react-native-progress';
import color from '../../Constants/Colors';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  loggedData: LoggedMeal[],
  mealLogged: MealLogged,
  isPurchased: boolean,
  userWeekDayMeal: UserWeekDayMeal,
}

export default class MealLog extends Component<Props, object> {

  screenWidth = Dimensions.get("window").width;
  //Creating week days
  renderWeekDay = (data: any) => {
    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    var weekDay = Moment(Date()).format('ddd, MMMM DD yyyy');
    let txtColor = weekDay.toLowerCase().includes(data.item.toLowerCase()) ? 'red' : 'black'
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.weekDayBtn, { width: (Dimensions.get('screen').width - styles.totalPadding) / 7 }]}>
        <Text style={[styles.weekDayTxt, { color: txtColor }]}>{data.item}</Text>
      </TouchableOpacity>
    )
  }

  mealImage(index: any) {
    switch (index) {
      case 0:
        return Images.BREAKFAST;

      case 1:
        return Images.LUNCH;

      case 2:
        return Images.SNACKS;

      case 3:
        return Images.DINNER;

      default:
        break;
    }
  }

  // Creating meal view
  renderMealVw = (data: any) => {
    let title = data.index == 0 ? 'Breakfast' : data.index == 1 ? 'Lunch' : data.index == 2 ? 'Snacks' : 'Dinner'
    return (
      <MealContainerCell index={data.index} onAddClick={() => this.props.navigation.navigate('FoodListing', { title: title })} image={this.mealImage(data.index)} data={{ day: '', fooItems: data.item.foods }} isFromPlan={false} />
    )
  }

  mealGraphData() {
    let data = [];
    for (let i = 0; i < this.props.mealLogged.logGraphData.length; i++) {
      const element = this.props.mealLogged.logGraphData[i];
      data.push(element.total_calories);
    }
    let items = {
      data: data.length == 0 ? [0, 0, 0, 0, 0, 0, 0] : data,
      color: (opacity = 255) => `rgba(227, 5, 19, ${0.6})`,
    }

    let data1 = [];
    for (let i = 0; i < this.props.mealLogged.planGraphData.length; i++) {
      const element = this.props.mealLogged.planGraphData[i];
      data1.push(element.total_calories);
    }
    let items1 = {
      data: data1.length == 0 ? [0, 0, 0, 0, 0, 0, 0] : data1,
      color: (opacity = 255) => `rgba(51, 51, 51, ${0.6})`,
    }
    console.log('asasasa', this.props.mealLogged)
    return [items, items1];
  }

  mealGraphData1() {
    let data = [];
    for (let i = 0; i < this.props.mealLogged.logGraphData.length; i++) {
      const element = this.props.mealLogged.logGraphData[i];
      data.push(element.total_calories);
    }
    let items = {
      data: data,
      color: (opacity = 255) => `rgba(227, 5, 19, ${0.6})`,
    }
    return [items];
  }

  getConsumedCal() {
    let cal = 0;
    for (let i = 0; i < this.props.mealLogged.logGraphData.length; i++) {
      const element = this.props.mealLogged.logGraphData[i];
      cal = cal + element.total_calories
    }
    return cal;
  }

  getConsumedProtein() {
    let cal = 0;
    for (let i = 0; i < this.props.loggedData.length; i++) {
      const element: LoggedMeal = this.props.loggedData[i];
      for (let j = 0; j < element.foods.length; j++) {
        const element1 = element.foods[j];
        cal = cal + element1.protien;
      }
    }
    return ((cal / this.getTotalProtein()) * 100).toFixed();
  }

  getConsumedCarbs() {
    let cal = 0;
    for (let i = 0; i < this.props.loggedData.length; i++) {
      const element: LoggedMeal = this.props.loggedData[i];
      for (let j = 0; j < element.foods.length; j++) {
        const element1 = element.foods[j];
        cal = cal + element1.carbs;
      }
    }
    return ((cal / this.getTotalProtein()) * 100).toFixed();
  }

  getConsumedFats() {
    let cal = 0;
    for (let i = 0; i < this.props.loggedData.length; i++) {
      const element: LoggedMeal = this.props.loggedData[i];
      for (let j = 0; j < element.foods.length; j++) {
        const element1 = element.foods[j];
        cal = cal + element1.saturated_fat;
      }
    }
    return ((cal / this.getTotalProtein()) * 100).toFixed();
  }

  getTotalProtein() {
    let cal = 0;
    for (let i = 0; i < this.props.userWeekDayMeal.daysData.length; i++) {
      let data = this.props.userWeekDayMeal.daysData[i];
      for (let j = 0; j < data.fooItems.length; j++) {
        let item = data.fooItems[j];
        cal = cal + item.protien;
      }
    }
    return cal;
  }

  getTotalCarbs() {
    let cal = 0;
    for (let i = 0; i < this.props.userWeekDayMeal.daysData.length; i++) {
      let data = this.props.userWeekDayMeal.daysData[i];
      for (let j = 0; j < data.fooItems.length; j++) {
        let item = data.fooItems[j];
        cal = cal + item.carbs;
      }
    }
    return cal;
  }

  getTotalFats() {
    let cal = 0;
    for (let i = 0; i < this.props.userWeekDayMeal.daysData.length; i++) {
      let data = this.props.userWeekDayMeal.daysData[i];
      for (let j = 0; j < data.fooItems.length; j++) {
        let item = data.fooItems[j];
        cal = cal + item.saturated_fat;
      }
    }
    return cal;
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalMargin;
    let consumed = this.props.mealLogged != undefined ? this.getConsumedCal() : 0;
    let suggested = this.props.mealLogged != undefined ? this.props.mealLogged.suggested_total_calories : 0;
    consumed = suggested < consumed ? consumed - suggested : consumed;
    let graphConsumed = consumed > suggested ? suggested : consumed;
    let progress = (graphConsumed / suggested);
    return (
      <View>
        <View style={styles.titleDateCntnrVw}>
          {
            this.props.mealLogged == undefined ? null :
              <View>
              </View>
          }
          {
            this.props.isPurchased && this.props.mealLogged != undefined && this.props.userWeekDayMeal != undefined ?
              <View style={styles.graphVw}>
                <Text style={styles.todaytxt}>{"Today's Summary"}</Text>
                <Text style={styles.caloriTxt}>{"Calories"}</Text>
                <View style={[styles.calVwCntnr, { width: width * progress, marginTop: 0 }]}>
                  <View style={[styles.calVw, { backgroundColor: color.APP_PINK_COLOR }]}>
                    <Text style={[styles.calTxt, { color: 'white' }]}>{(suggested < consumed ? '+' : '') + consumed + ' ' + localize.KCAL}</Text>
                    <Text style={[styles.calTitleTxt, { color: '#ffffffab' }]}>{'Consumed'}</Text>
                    <Image source={Images.DOWN_RED} style={styles.downImg} />
                  </View>
                </View>
                <Progress.Bar
                  color={color.APP_PINK_COLOR}
                  unfilledColor={'#fff'}
                  borderWidth={0}
                  progress={progress}
                  borderRadius={styles.barHeight}
                  height={styles.barHeight}
                  width={width}
                />
                {
                  suggested - this.getConsumedCal() <= 0 ? <View style={styles.marginView} /> :
                    <View style={[styles.calVwCntnr, { width: width - (width * progress), alignSelf: 'flex-end', marginBottom: 0 }]}>
                      <View style={[styles.calVw, { backgroundColor: 'white', marginTop: 0 }]}>
                        <Image source={Images.UP_WHITE} style={styles.upImg} />
                        <Text style={[styles.calTxt, { color: 'black' }]}>{suggested - this.getConsumedCal() + ' ' + localize.KCAL}</Text>
                        <Text style={[styles.calTitleTxt, { color: '#000000ab' }]}>{'Remaining'}</Text>
                      </View>
                    </View>
                }
                <View style={[styles.macroCntnr, { borderTopWidth: 1 }]}>
                  <View style={{ width: '35%', }}>
                    <Text style={styles.macroTitleTxt}>{'Macro'}</Text>
                    <Text style={styles.macroValueTxt}>{'Protien'}</Text>
                    <Text style={styles.macroValueTxt}>{'Carbs'}</Text>
                    <Text style={styles.macroValueTxt}>{'Fats'}</Text>
                  </View>
                  <View style={{ width: '35%', }}>
                    <Text style={styles.macroTitleTxt}>{'Consumed'}</Text>
                    <Text style={styles.consumedVal}>{this.getConsumedProtein() + '%'}</Text>
                    <Text style={styles.consumedVal}>{this.getConsumedCarbs() + '%'}</Text>
                    <Text style={styles.consumedVal}>{this.getConsumedFats() + '%'}</Text>
                  </View>
                  <View style={{ width: '30%', }}>
                    <Text style={styles.macroTitleTxt}>{'Target'}</Text>
                    <Text style={styles.targetVal}>{this.getTotalProtein().toFixed() + 'g'}</Text>
                    <Text style={styles.targetVal}>{this.getTotalCarbs().toFixed() + 'g'}</Text>
                    <Text style={styles.targetVal}>{this.getTotalFats().toFixed() + 'g'}</Text>
                  </View>
                </View>
              </View>
              : null
          }
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: '100%', marginTop: 20, }}
            data={this.props.loggedData.length == 0 ? defaultData : this.props.loggedData}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={this.renderMealVw}
          />
        </View>
      </View>
    )
  }
}

let defaultData = [
  {
    foods: [],
    title: 'Breakfast',
  },
  {
    foods: [],
    title: 'Lunch',
  },
  {
    foods: [],
    title: 'Snacks',
  },
  {
    foods: [],
    title: 'Dinner',
  }
]

let weekDay = [
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
  'SA',
  'SU',
]

let config = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  strokeWidth: 1,
  fillShadowGradientOpacity: 0,
  color: (opacity = 255) => `rgba(227, 5, 19, ${0.6})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${1})`,
  style: {
    borderRadius: 16,
  },
}

let data = [
  {
    data: [0],
    color: (opacity = 255) => `rgba(227, 5, 19, ${0.6})`,
  },
  {
    data: [0],
    color: (opacity = 255) => `rgba(51, 51, 51, ${0.6})`,
  },
]