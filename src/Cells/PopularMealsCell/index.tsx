import React, { Component } from 'react';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onTapCell: any,
  isFromList?: boolean
}

export default class PopularMealsCell extends Component<Props, object> {

  render() {
    return (
      <ShadowView style={[customStyles.shadow, this.props.isFromList ? styles.mealFullVw : styles.mealVw]}>
        <TouchableOpacity onPress={() => this.props.onTapCell()} activeOpacity={0.9}>
          <View>
            <RKImageLoder style={styles.mealImg} src={this.props.data.image} tempImg={Images.PLACEHOLDER} />
            {/* <View style={styles.dietTxtVw}>
              <Text style={styles.dietTxt}>{'Keto Diet'}</Text>
            </View> */}
          </View>
          <Text style={styles.mealdataTxt}>{this.props.data.title}</Text>
          <Text style={styles.descTxt}>{this.props.data.about}</Text>
        </TouchableOpacity>
      </ShadowView>
    )
  }
}