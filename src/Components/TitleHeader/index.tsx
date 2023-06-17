import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles'
import Images from '../../Utils/ImageGenerator';

interface Props {
  title: string,
  btnImage?: any,
  leftBtnActn?: any,
  isHeader?: boolean,
}

export default class TitleHeader extends Component<Props, object> {

  header() {
    return (
      <View>
        <View style={styles.mainVw}>
          <Text style={styles.titleTxt}>{this.props.title}</Text>
        </View>
        <Image source={Images.RED_CURVE} style={styles.bgImg} />
      </View>
    )
  }

  headerWithBtn() {
    return (
      <View style={styles.mainVw1}>
        <TouchableOpacity onPress={() => this.props.leftBtnActn()} activeOpacity={0.8}>
          <Image style={styles.btnLeftImg} source={Images.BACK} />
        </TouchableOpacity>
        <Text style={styles.title1Txt}>{this.props.title}</Text>
        <Image source={Images.RED_CURVE} style={styles.bgImg} />
      </View>
    )
  }

  render() {
    return (
      <View>
        {
          this.props.isHeader ?
            this.header() :
            this.headerWithBtn()
        }
      </View>
    )
  }
}