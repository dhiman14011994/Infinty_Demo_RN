import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Food } from '../../Modals/MealModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import { createConfigItem } from '@babel/core';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

interface Props {
  data: any,
  onAddTap: any,
  isFromStore?: boolean,
  onPress: any,
}

export default class AddFoodCell extends Component<Props, object> {

  state = {
    qty: this.props.data.item.qty,
  }

  addImg = Images.ADD_BTN;
  subImg = Images.SUB_BTN;
  addDisImg = Images.ADD_BTN;
  subDisImg = Images.SUB_BTN;


  componentWillReceiveProps(props: any) {
    this.setState({ qty: props.data.item.qty })
  }

  private handleQty(isAdd: boolean) {
    let qty = this.state.qty;
    if (isAdd) {
      qty = qty + 1;
    }
    else if (qty > 0) {
      qty = qty - 1;
    }
    this.setState({ qty: qty });
    this.props.onAddTap(qty);
  }

  render() {
    let food = this.props.data.item as Food;
    let width = Dimensions.get('screen').width - styles.totalGap;
    return (
      <View style={styles.mainVw}>
        <RKImageLoder style={styles.foodImg} src={''} tempImg={require('../../Assets/foodDummy.jpg')} />
        <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.dataCntnr, { width: width }]}>
          <Text style={styles.titleTxt}>{food.title}</Text>
          <Text style={styles.kcalTxt}>{food.total_calories + ' ' + localize.KCAL}</Text>
          <View style={styles.contentVw}>
            <Text style={styles.qtyCalTxt}>{food.about.split(' - ')[0]}</Text>         
          </View>
        </TouchableOpacity>
        <View style={styles.addBtnVw}>
          <TouchableOpacity onPress={() => this.handleQty(false)} activeOpacity={0.8} style={styles.addBtn}>
            <Image source={this.state.qty == 0 ? this.subDisImg : this.subImg} style={styles.addImg} />
          </TouchableOpacity>
          <Text style={styles.qtyTxt}>{this.state.qty}</Text>
          <TouchableOpacity onPress={() => this.handleQty(true)} activeOpacity={0.8} style={styles.addBtn}>
            <Image source={this.state.qty == 0 ? this.addDisImg : this.addImg} style={styles.addImg} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}