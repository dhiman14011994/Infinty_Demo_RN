import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface Props {
  data: any,
  onPress: any,
}

export default class ShopCollectionCell extends Component<Props, object> {

  render() {

    let item = this.props.data.item;

    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={styles.mainVw}>
        <Image style={styles.logoImg} source={require('../../Assets/dummy.png')} />
        <Text style={styles.descTxt}>{'Stay At Home'}</Text>
      </TouchableOpacity>
    )
  }
}