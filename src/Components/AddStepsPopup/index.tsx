import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import RedButton from '../RedButton';

interface Props {
  onCross: any,
  onAdd: any,
  steps: any,
}

export default class AddStepsPopup extends Component<Props, object> {

  state = {
    qty: this.props.steps,
  }

  //Habdling quantity increaing/decreasing value
  private handleQty(isIncrease: boolean) {
    let qty = this.state.qty;
    if (isIncrease) {
      qty += 500;
    }
    else if (!isIncrease && qty > 0) {
      qty -= 500;
    }
    this.setState({ qty: qty })
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <View style={[styles.opaqueVw, { opacity: 0.4, }]} />
        <View style={styles.popVw}>
          <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.addWeightTxt}>{'Set Target'}</Text>
            <TouchableOpacity onPress={() => this.props.onCross()} activeOpacity={0.8} style={styles.crossBtn}>
              <Image style={styles.commonImg} source={require('../../Assets/cross.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.servingsCntnr}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.handleQty(false)} activeOpacity={0.8}>
                <Image style={styles.addSubImg} source={require('../../Assets/activeSubtractQty.png')} />
              </TouchableOpacity>
              <Text style={styles.weightTxt}>{this.state.qty + ' Steps'}</Text>
              <TouchableOpacity onPress={() => this.handleQty(true)} activeOpacity={0.8}>
                <Image style={styles.addSubImg} source={require('../../Assets/activeAddQty.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <RedButton title={'Add Steps'} onPress={() => this.props.onAdd(this.state.qty)} lowMargin={true} />
        </View>
      </View>
    )
  }
}