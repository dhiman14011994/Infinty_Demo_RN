import React, { Component } from 'react';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles'
import { Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onTapCell: any,
  isFromList?: boolean
}

export default class RecomendedMealCell extends Component<Props, object> {

  render() {
    let width = Dimensions.get('screen').width - styles.totalMargin;
    return (
      <ShadowView style={[customStyles.shadow, styles.mealFullVw, { width: width }]}>
        <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => this.props.onTapCell()} activeOpacity={0.9}>
          <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'flex-start', }}>
            <RKImageLoder style={styles.mealImg} src={this.props.data.image} tempImg={Images.PLACEHOLDER} />
            <View style={[styles.opqVw, { opacity: 0.2 }]} />
            <View style={styles.tagVw}>
              <Text numberOfLines={1} style={styles.tagTxt}>{this.props.data.title}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <Text numberOfLines={1} style={styles.mealdataTxt}>{this.props.data.title}</Text>
            <TouchableOpacity>
              <Text numberOfLines={1} style={styles.startNowTxt}>{'START NOW'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ShadowView>
    )
  }
}