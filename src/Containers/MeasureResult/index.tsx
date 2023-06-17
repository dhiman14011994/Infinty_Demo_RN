import React, { Component } from "react";
import NavigationHeader from "../../Components/Header";
import { SafeAreaView, Image, Text, TextInput, View, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { NavigationScreenProp } from "react-navigation";
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class MeasureResult extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  isBmr = this.props.navigation.state.params.isBmr;

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={this.isBmr ? 'BMR Calculator': 'Body Fat'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <View style={styles.cntnrVw}>
          <Text style={styles.bodyFatTxt}>{this.isBmr ? 'Your BMR Score' : 'Your Body Fat Percentage is'}</Text>
          <Text style={[styles.resultTxt, {fontSize: this.isBmr ? styles.smallFont : styles.bigFont}]}>{this.props.navigation.state.params.result + (this.isBmr ? '' : '%')}</Text>
          {
            this.isBmr ?
          <Text style={styles.caloriesTxt}>{'Calories Per Day'}</Text>
            : null
          }
          <TouchableOpacity style={styles.commonBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('FitnessStats')}>
            <Text style={styles.btnTxt}>{'Ok'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}