import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { styles } from './styles';

interface Props {
  data: any,
  onPress: any,
}

export default class HomeTopMenuCell extends Component<Props, object> {

  render() {

    let item = this.props.data.item;
    let width = (Dimensions.get('screen').width - styles.margin) / 3
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.data.index)} activeOpacity={0.8} style={[styles.mainVw, { width: width }]}>
        <Image style={styles.logoImg} source={item.image} />
        <Text style={styles.titleTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
}