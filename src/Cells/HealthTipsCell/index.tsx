import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Food } from '../../Modals/MealModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';
import { Blogs } from '../../Modals/BlogsModl';

interface Props {
  data: any,
  onPress: any,
}

export default class HealthTipsCell extends Component<Props, object> {

  state = {
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalGap;
    let item: Blogs = this.props.data;
    console.log('DDDTTTAATA: ', this.props.data)
    return (
      <View style={styles.mainVw}>
        <RKImageLoder style={styles.foodImg} src={item.image} tempImg={Images.PLACEHOLDER} />
        <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.dataCntnr, { width: width }]}>
          <Text style={styles.titleTxt}>{item.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dateTxt}>{item.sub_title}</Text>
            {/* <Text style={styles.timeTxt}>{'5 min read'}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}