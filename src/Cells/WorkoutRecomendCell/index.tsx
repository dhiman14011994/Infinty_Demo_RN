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
  lastIndex: boolean,
}

export default class WorkoutRecomendCell extends Component<Props, object> {

  render() {

    let item: Workouts = this.props.data.item;
    let width = Dimensions.get('screen').width - styles.totalMargin;

    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.mainVw, { width: width, marginRight: this.props.lastIndex ? styles.marginRight : 0 }]}>
        <RKImageLoder style={[styles.logoImg, { width: width }]} src={item.image} tempImg={Images.PLACEHOLDER} />
        <View style={[styles.opqVw, { opacity: 0.2, width: width }]} />
        <View style={styles.workoutTxtVw}>
          <Text style={styles.workoutTxt}>{'Pre Workout'}</Text>
        </View>
        <Text numberOfLines={1} style={styles.titleTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
}