import React, { Component } from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
}

export default class SuccessStoriesCell extends Component<Props, object> {
  render() {
    let item = this.props.data.item;
    let width = Dimensions.get('screen').width - styles.totalMargin;
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={styles.mainVw} activeOpacity={0.8}>
        <RKImageLoder style={[styles.bannerImg, { width: width }]} src={item.image} tempImg={Images.PLACEHOLDER} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <Text style={styles.sub}>{item.description}</Text>
      </TouchableOpacity>
    )
  }
}