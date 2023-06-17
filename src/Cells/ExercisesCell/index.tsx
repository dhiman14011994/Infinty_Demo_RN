import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { styles } from './styles';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles'
import { Workouts } from '../../Modals/WorkoutModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import images from '../../Constants/Images';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
}

export default class ExercisesCell extends Component<Props, object> {

  render() {
    let width = (Dimensions.get('screen').width - styles.totalMargin) / 2;
    let item: Workouts = this.props.data.item;
    return (
      <TouchableOpacity style={[styles.mainVw, { width: width }]} onPress={() => this.props.onPress()} activeOpacity={0.8}>
        <View style={{ flex: 1, }}>
          <RKImageLoder style={styles.logoImg} src={item.image} tempImg={Images.PLACEHOLDER} />
          <View style={[styles.opqVw, { opacity: 0.2 }]} />          
        </View>
        <Text style={styles.newTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
}