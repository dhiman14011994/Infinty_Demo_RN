import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import { Workouts } from '../../Modals/WorkoutModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import color from '../../Constants/Colors';
import images from '../../Constants/Images';
import image from '../../Constants/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
  data: any,
  onPress: any,
  lastIndex: boolean,
}

export default class WorkOutChallenge extends Component<Props, object> {

  render() {

    let item: any = this.props.data.item;
    let width = Dimensions.get('screen').width - styles.totalMargin;

    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.mainVw, { width: width, height: 270 }]} onPress={() => this.props.onPress()}>
        <Text style={styles.topText}>{item.dateTime}</Text>
        <Image source={item.image} style={{ width: width, height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
        <View style={styles.weekTxtVw}>
          <Text style={styles.weekTxt}>{item.times.toString()}</Text>
        </View>
        <View style={styles.titleCntnr}>
          <Text numberOfLines={1} style={styles.titleTxt}>{item.details.toString()}</Text>
          <TouchableOpacity style={styles.buttonCntnr} onPress={() => {}}>
            <Text style={styles.level}>{item.Participate.toString()}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}