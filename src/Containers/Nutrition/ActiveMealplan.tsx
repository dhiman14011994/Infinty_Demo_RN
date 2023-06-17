
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { styles } from './styles';
import MealContainerCell from '../../Cells/MealContainerCell';
import Moment from 'moment';
import { UserMealPlan, UserWeekDayMeal } from '../../Modals/MealModl';
import color from '../../Constants/Colors';
import { localize } from '../../Resources/Strings';

interface Props {
  isPurchased: boolean,
  userMealPlans: UserMealPlan,
  userWeekDayMeal: UserWeekDayMeal,
  onPressWeek: any,
}

export default class ActiveMealplan extends Component<Props, object> {

  state = {
    selectedWeek: 1,
  }

  componentDidMount() {
    this.setState({ selectedWeek: this.props.userMealPlans.mainData.current_week, userMealPlans: this.props.userMealPlans })
  }

  private handleWeek(index: any) {
    // this.setState({ selectedWeek: index + 1 })
    // this.props.onPressWeek(index + 1)
  }

  //Creating week days
  renderWeekDay = (data: any) => {
    var weekDay = Moment(Date()).format('ddd, MMMM DD yyyy');
    var date = Moment(Date()).format('DD');
    let isCurrentDay = weekDay.toLowerCase().includes(data.item.toLowerCase()) ? true : false;
    let width = (Dimensions.get('screen').width - styles.totalPadding) / 7
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.weekDayBtn, { width: width }]} onPress={() => this.props.isPurchased ? {} : this.handleWeek(data.index)}>
        {
          isCurrentDay ?
            <View>
              <View style={[styles.weekTopVw, { width: width }]}>
                <Text style={styles.weekSelectedTxt}>{data.item}</Text>
              </View>
              <View style={[styles.weekEndVw, { width: width }]}>
                <Text style={[styles.weekSelectedTxt, { color: 'black' }]}>{date}</Text>
              </View>
            </View>
            :
            <Text style={[styles.weekDayTxt, { color: 'white' }]}>{data.item}</Text>
        }
      </TouchableOpacity>
    )
  }

  mealImage(index: any) {
    switch (index) {
      case 0:
        return require('../../Assets/breakfast.png');

      case 1:
        return require('../../Assets/lunch.png');

      case 2:
        return require('../../Assets/snacks.png');

      case 3:
        return require('../../Assets/dinner.png');

      default:
        break;
    }
  }

  // Creating meal view
  renderMealVw = (data: any) => {
    return (
      <MealContainerCell index={data.index} onAddClick={() => { }} image={this.mealImage(data.index)} isFromPlan={true} data={data.item} />
    )
  }

  getTotalCal() {
    let cal = 0;
    for (let i = 0; i < this.props.userWeekDayMeal.daysData.length; i++) {
      let data = this.props.userWeekDayMeal.daysData[i];
      for (let j = 0; j < data.fooItems.length; j++) {
        let item = data.fooItems[j];
        cal = cal + item.total_calories;
      }
    }
    return cal;
  }

  render() {
    return (
      <View>
        {
          this.props.userMealPlans == undefined ? null :
            <View style={styles.titleDateCntnrVw}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.topMenuTbl}
                data={weekDay}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.renderWeekDay}
              />
              <View style={styles.calTargetVw}>
                <Text style={styles.titleTxt}>{'Calorie Target'}</Text>
                <Text style={styles.kclTxt}>{this.getTotalCal() + ' ' + localize.KCAL}</Text>
              </View>
              {
                this.props.userWeekDayMeal == undefined ? null :
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                    data={this.props.userWeekDayMeal.daysData}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    renderItem={this.renderMealVw}
                  />
              }
            </View>
        }
        <View>
        </View>
      </View>
    )
  }
}

let weekDay = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
]