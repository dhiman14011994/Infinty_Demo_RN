import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import color from '../../Constants/Colors';
import RedButton from '../RedButton';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
//@ts-ignore
import FlipToggle from 'react-native-flip-toggle-button';

interface Props {
  onCross: any,
  onAdd: any,
}

export default class AddWeightPopup extends Component<Props, object> {

  state = {
    index: 0,
    qty: 0,
    isKg: true,
    date: Moment(Date()).format('ddd, MMMM DD yyyy'),
  }

  //Habdling quantity increaing/decreasing value
  private handleQty(isIncrease: boolean) {
    let qty = this.state.qty;
    if (isIncrease) {
      qty += 1;
    }
    else if (!isIncrease && qty > 0) {
      qty -= 1;
    }
    this.setState({ qty: qty })
    // this.props.onAdd(qty);
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <View style={[styles.opaqueVw, { opacity: 0.4, }]} />
        <View style={styles.popVw}>
          <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.addWeightTxt}>{'Add Weight'}</Text>
            <TouchableOpacity onPress={() => this.props.onCross()} activeOpacity={0.8} style={styles.crossBtn}>
              <Image style={styles.commonImg} source={require('../../Assets/cross.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.dateBtn}>
            <View style={{ height: 10, width: 10, backgroundColor: 'red' }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.dateTxt}>{this.state.date.substring(0, this.state.date.length - 4)}</Text>
              <DatePicker
                style={{ alignItems: 'center', width: '100%', position: 'absolute' }}
                date={this.state.date}
                maxDate={Date()}
                hideText={true}
                mode="date"
                placeholder=""
                format="ddd, MMMM DD yyyy"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: { borderWidth: 0 },
                  dateText: styles.dateTxt,
                  placeholderText: styles.dateTxt,
                }}
                onDateChange={(date) => { console.log('DAte: ', date), this.setState({ date: date }) }}
              />
            </View>
            <View style={{ height: 10, width: 10, backgroundColor: 'red' }} />
          </View>
          <View style={styles.servingsCntnr}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.handleQty(true)} activeOpacity={0.8}>
                <Image style={styles.addSubImg} source={require('../../Assets/activeAddQty.png')} />
              </TouchableOpacity>
              <Text style={styles.weightTxt}>{'183 ' + (this.state.isKg ? 'kg' : 'lb')}</Text>
              <TouchableOpacity onPress={() => this.handleQty(false)} activeOpacity={0.8}>
                <Image style={styles.addSubImg} source={require('../../Assets/activeSubtractQty.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.unitsVw}>
            <Text style={[styles.unitsTxt, { color: this.state.isKg ? color.DARK_RED : 'black' }]}>{' kg '}</Text>
            <FlipToggle
              value={!this.state.isKg}
              buttonWidth={styles.buttonWidth}
              buttonHeight={styles.buttonHeight}
              buttonRadius={styles.buttonRadius}
              sliderWidth={styles.sliderWidth}
              sliderHeight={styles.sliderHeight}
              sliderRadius={styles.sliderRadius}
              sliderOnColor={color.DARK_RED}
              sliderOffColor={color.DARK_RED}
              buttonOnColor={color.VERY_LIGHT_GREY}
              buttonOffColor={color.VERY_LIGHT_GREY}
              onToggle={(newState: any) => this.setState({ isKg: !newState })}
            />
            <Text style={[styles.unitsTxt, { color: !this.state.isKg ? color.DARK_RED : 'black' }]}>{' lb '}</Text>
          </View>
          <RedButton title={'Add Weight'} onPress={() => this.props.onAdd()} lowMargin={true} />
        </View>
      </View>
    )
  }
}