import React, { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class Welcome extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={Images.BG_IMAGE} style={styles.bgImg} />
        <SafeAreaView style={styles.contentVw}>
          <TouchableOpacity style={[styles.commonBtn, { borderWidth: 1 }]} onPress={() => this.props.navigation.navigate('InitialBodyDetail', { gender: 0 })} activeOpacity={0.8}>
            <View style={[styles.bgVw, {opacity: 0.5,}]} />
            <Text style={styles.btnTxt}>{localize.MALE}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.commonBtn, { borderWidth: 1 }]} onPress={() => this.props.navigation.navigate('InitialBodyDetail', { gender: 1 })} activeOpacity={0.8}>
          <View style={[styles.bgVw, {opacity: 0.5,}]} />
            <Text style={styles.btnTxt}>{localize.FEMALE}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.commonBtn, { borderWidth: 1 }]} onPress={() => this.props.navigation.navigate('InitialBodyDetail', { gender: 2 })} activeOpacity={0.8}>
          <View style={[styles.bgVw, {opacity: 0.5,}]} />
            <Text style={styles.btnTxt}>{localize.OTHER}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    )
  }
}