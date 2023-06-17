import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
}

export default class HomeBottmCell extends Component<Props, object> {

  render() {
    let item = this.props.data;
    return (
      <View style={styles.mainVw}>
        <View style={styles.textCntnrVw}>
          <View>
            <Text style={styles.titleTxt} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.descTxt} numberOfLines={2}>{item.description}</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.onPress()} style={styles.seeAllVw} activeOpacity={0.8}>
            <Text style={styles.seeAllTxt}>{'See All'}</Text>
            <Image source={require('../../Assets/rightArrow.png')} style={styles.arrowImg} />
          </TouchableOpacity>
        </View>
        <RKImageLoder style={styles.logoImg} src={item.image} tempImg={Images.PLACEHOLDER} />
      </View>
    )
  }
}