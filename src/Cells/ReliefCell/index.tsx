import React, { Component } from 'react';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view'
import customStyles from '../../Constants/Styles'
import { Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onTapCell: any,
  isReleif: boolean,
  isFull?: boolean,
}

export default class ReliefCell extends Component<Props, object> {

  render() {
    return (
      <ShadowView style={[customStyles.shadow, styles.mealVw, {width: this.props.isFull ? Dimensions.get('screen').width - styles.totalMargin : 250}]}>
        <TouchableOpacity onPress={() => this.props.onTapCell()} activeOpacity={0.8}>
          <View>
            <RKImageLoder style={styles.mealImg} src={this.props.data.image} tempImg={Images.PLACEHOLDER} />
          </View>
          <Text style={[styles.mealdataTxt, {marginBottom: this.props.isReleif ? styles.marginBottomMax : styles.marginBottomMin}]} numberOfLines={2}>{this.props.data.title}</Text>
          {
            this.props.isReleif ? null : 
            <Text numberOfLines={1} style={styles.descTxt}>{this.props.data.sub_title}</Text>
          }
        </TouchableOpacity>
      </ShadowView>
    )
  }
}