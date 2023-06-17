import React, { Component } from 'react';
import { Dimensions } from 'react-native';
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

export default class WorkoutCell extends Component<Props, object> {

  render() {

    let item: Workouts = this.props.data.item.image;
    console.log('item',item)
    let width = Dimensions.get('screen').width - (this.props.isHome ? styles.totalMarginMax : styles.totalMargin);

    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.mainVw]}>
        <RKImageLoder style={[styles.logoImg, { width: 200,height:300, resizeMode:'contain'}]} src='' tempImg={Images.PLACEHOLDER} /> 
      </TouchableOpacity>
    )
  }
}