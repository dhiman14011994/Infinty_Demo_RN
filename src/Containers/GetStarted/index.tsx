import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, BackHandler } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import RedButton from '../../Components/RedButton';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class GetStarted extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={Images.BG_IMAGE} style={styles.bgImg} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.txtCntnr}>
            <Image source={Images.SUCCESS_CHECK} style={styles.tickImg} />
            <Text style={styles.titleTxt}>{'Profile Complete'}</Text>
          </View>
          <RedButton title={'Get Started'} onPress={() => this.props.navigation.navigate('Home')} />
        </SafeAreaView>
      </View>
    )
  }
}