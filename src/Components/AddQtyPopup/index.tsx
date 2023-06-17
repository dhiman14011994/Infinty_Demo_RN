import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import RedButton from '../RedButton';

interface Props {
  onCross: any,
  onAdd: any,
}

export default class AddQtyPopup extends Component<Props, object> {

  state = {
    index: 0,
    qty: 0,
  }

  //Habdling quantity increaing/decreasing value
  private handleQty(isIncrease: boolean) {
    let qty = this.state.qty;
    if(isIncrease && qty <= 9) {
      qty += 1;
    }
    else if(!isIncrease && qty > 0) {
      qty -= 1;
    }
    this.setState({qty: qty})
    this.props.onAdd(qty);
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <View style={[styles.opaqueVw, { opacity: 0.4, }]} />
        <View style={styles.popVw}>
          <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.addToMealTxt}>{'Add to meals'}</Text>
            <TouchableOpacity onPress={() => this.props.onCross()} activeOpacity={0.8} style={styles.crossBtn}>
              <Image style={styles.commonImg} source={require('../../Assets/cross.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.kaclQtyTxt}>{'183 kcal'}</Text>
          <View style={[styles.mealTimeVw, { borderTopWidth: 1, borderBottomWidth: 1 }]}>
            <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={[styles.mealTimeBtn, { backgroundColor: this.state.index == 0 ? color.DARK_RED : color.VERY_LIGHT_GREY }]} activeOpacity={0.8}>
              <Text style={styles.mealTimeTxt}>{'Breakfast'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ index: 1 })} style={[styles.mealTimeBtn, { backgroundColor: this.state.index == 1 ? color.DARK_RED : color.VERY_LIGHT_GREY }]} activeOpacity={0.8}>
              <Text style={styles.mealTimeTxt}>{'Lunch'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ index: 2 })} style={[styles.mealTimeBtn, { backgroundColor: this.state.index == 2 ? color.DARK_RED : color.VERY_LIGHT_GREY }]} activeOpacity={0.8}>
              <Text style={styles.mealTimeTxt}>{'Dinner'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servingsCntnr}>
            <Text style={styles.servingsTxt}>{'Servings'}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.handleQty(true)} activeOpacity={0.8}>
                <Image style={styles.addSubImg} source={require('../../Assets/activeAddQty.png')} />
              </TouchableOpacity>
              <Text style={styles.servingsQytTxt}>{this.state.qty}</Text>
              <TouchableOpacity onPress={() => this.handleQty(false)} activeOpacity={0.8}>
                <Image style={styles.addSubImg} source={require('../../Assets/activeSubtractQty.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <RedButton title={'Add'} onPress={() => this.props.onAdd()} lowMargin={true} />
        </View>
      </View>
    )
  }
}