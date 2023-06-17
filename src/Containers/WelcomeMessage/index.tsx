import React, { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class WelcomeMessage extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={Images.BG_IMAGE} style={styles.bgImg} />
        <SafeAreaView style={styles.messageCntnrVw}>
          <Text style={styles.welcomeTxt}>{localize.WELCOME + ` ${this.props.navigation.state.params.name}`}</Text>
          <Text style={styles.messageTxt}>{localize.WELCOME_COMPLETE_MESSAGE}</Text>
          <RedButton title={localize.PROCEED} onPress={() => this.props.navigation.navigate('Welcome')} />
        </SafeAreaView>
      </View>
    )
  }
}