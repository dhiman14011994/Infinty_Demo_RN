import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import { WorkoutCat } from '../../Modals/WorkoutModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import color from '../../Constants/Colors';
import images from '../../Constants/Images';
import image from '../../Constants/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { secondsToMinute } from '../../Utils/TimeFunction';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
  isHome: boolean,
}

export default class WorkoutExercisesCell extends Component<Props, object> {

  render() {

    let item: WorkoutCat = this.props.data.item;
    var time = secondsToMinute(item.duration);
    let width = Dimensions.get('screen').width - (this.props.isHome ? styles.totalMarginMax : styles.totalMargin);
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.mainVw, { width: width }]}>
        <RKImageLoder style={[styles.logoImg, { width: width }]} src={item.image} tempImg={Images.PLACEHOLDER} />
        {
          item.tags != undefined && item.tags.length > 0 ?
            <View style={styles.tagTxtVw}>
              <Text style={styles.weekTxt}>{item.tags[0].name}</Text>
            </View>
            : null
        }
        <View style={styles.weekTxtVw}>
          <Image style={styles.clockImg} source={Images.CLOCK_BLACK} />
          <Text style={styles.weekTxt}>{time}</Text>
        </View>
        <View style={styles.titleCntnr}>
          <Text numberOfLines={1} style={styles.titleTxt}>{item.title}</Text>
          <Text style={styles.level}>{item.pace}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}