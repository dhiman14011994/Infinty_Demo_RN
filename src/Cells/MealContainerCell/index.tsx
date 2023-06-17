
import React, { Component } from 'react';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';;
import customStyles from '../../Constants/Styles';
import { styles } from './styles';
import { View, Image, TouchableOpacity, Text, FlatList, Dimensions, ImageStore } from 'react-native';
import color from '../../Constants/Colors';
import { DaysData, FooItem } from '../../Modals/MealModl';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

interface Props {
  data: DaysData,
  isFromPlan: boolean,
  image: any,
  onAddClick: any,
  index: any,
}

export default class MealContainerCell extends Component<Props, object> {

  state = {
  }

  // Creating meal view
  renderMeals = (data: any) => {
    let item: FooItem = data.item as FooItem;
    const width = (Dimensions.get('screen').width - styles.totalPadding) / 3;
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.mealTxt}>{item.title}</Text>
          <Text style={styles.qtyTxt}>{'x' + item.serving}</Text>
        </View>
        <View style={styles.contentVw}>
          <View style={styles.qtyCntnr}>
            <Text style={styles.contentTitleTxt}>{'Calories'}</Text>
            <Text style={styles.contentDataTxt}>{item.total_calories + ' ' + localize.KCAL}</Text>
          </View>
          <View style={styles.qtyCntnr}>
            <Text style={styles.contentTitleTxt}>{'Protein'}</Text>
            <Text style={styles.contentDataTxt}>{item.protien + 'g'}</Text>
          </View>
        </View>
      </View>
    )
  }

  getTotalCal() {
    let cal = 0;
    for (let i = 0; i < this.props.data.fooItems.length; i++) {
      let data = this.props.data.fooItems[i];
      cal = cal + (data.total_calories * Number(data.serving));
    }
    return cal
  }

  render() {
    let title = this.props.index == 0 ? 'Add Breakfast' : this.props.index == 1 ? 'Add Lunch' : this.props.index == 2 ? 'Add Snacks' : 'Add Dinner'
    return (
      <ShadowView style={[styles.mainVw]}>
        <View style={styles.headerVw}>
          <Image style={styles.logoImg} source={this.props.image} />
          <View style={styles.titleVw}>
            <Text style={this.props.data.fooItems.length > 0 ? styles.titleTxt : styles.titleTxt1}>{title}</Text>
          </View>
          {
            this.props.isFromPlan ? null :
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.onAddClick()}>
                <Image style={styles.logoImg} source={Images.ADD_CIRCULAR} />
              </TouchableOpacity>
          }
        </View>
        {
          this.props.data.fooItems.length <= 0 ? null :
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.tblVw}
              data={this.props.data.fooItems}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderMeals}
            />
        }
      </ShadowView >
    )
  }
}