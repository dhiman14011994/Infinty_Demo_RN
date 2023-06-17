import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import { Workouts } from '../../Modals/WorkoutModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  data: any,
  onPress: any,
  isHome: boolean,
}

export default class RehabilitationCell extends Component<Props, object> {

  render() {

    let item: Workouts = this.props.data.item;
    let width = Dimensions.get('screen').width - (this.props.isHome ? styles.totalMarginMax : styles.totalMargin);

    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.mainVw, { width: width }]}>
        <RKImageLoder style={[styles.logoImg, { width: width }]} src={item.image} tempImg={Images.PLACEHOLDER} />
        <View style={styles.weekTxtVw}>
          <Text style={styles.weekTxt}>{'Week 1'}</Text>
        </View>
        <View style={styles.titleCntnr}>
          <Text numberOfLines={1} style={styles.titleTxt}>{item.title}</Text>
          <Text style={styles.level}>{'Level ' + item.pace}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}