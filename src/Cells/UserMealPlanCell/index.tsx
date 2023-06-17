import React, { Component } from 'react';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onTapCell: any,
  isPurchased: boolean,
}

export default class UserMealPlanCell extends Component<Props, object> {

  render() {
    return (
      <ShadowView style={[customStyles.shadow, styles.mealVw]}>
        <TouchableOpacity onPress={() => this.props.isPurchased ? {} : this.props.onTapCell()} activeOpacity={ this.props.isPurchased ? 1 : 0.8}>
          <View>
            <RKImageLoder style={styles.mealImg} src={this.props.data.image} tempImg={Images.PLACEHOLDER} />
            {
              this.props.isPurchased ?
                <View style={styles.dietTxtVw}>
                  <Text style={styles.dietTxt}>{'Week ' + this.props.data.week_no}</Text>
                </View>
                : null
            }
          </View>
          <Text style={styles.mealdataTxt}>{this.props.data.title}</Text>
          <Text numberOfLines={1} style={styles.descTxt}>{this.props.isPurchased ? this.props.data.sub_title : this.props.data.about}</Text>
        </TouchableOpacity>
      </ShadowView>
    )
  }
}