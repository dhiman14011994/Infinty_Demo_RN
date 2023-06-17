import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import { GuideModl } from '../../Modals/GuidesModl';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
  isList?: boolean,
}

export default class GuidesCell extends Component<Props, object> {
  render() {
    let item: GuideModl = this.props.data.item;
    let width = this.props.isList ? Dimensions.get('screen').width - styles.totalMargin:  styles.width;
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={[styles.mainVw, {width: width}]}>
        <RKImageLoder style={[styles.logoImg, {width: width}]} src={item.image} tempImg={Images.PLACEHOLDER} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <Text style={styles.descTxt}>{item.sub_title}</Text>
      </TouchableOpacity>
    )
  }
}