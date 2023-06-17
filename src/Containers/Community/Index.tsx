import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from "../../Components/Header";
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import { WebView } from 'react-native-webview';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class Community extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  isCurrentView = true;
  fbUrl = 'https://www.facebook.com/infiniteathlet/'
  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Community'}
          isMultiple={true}
          leftBtnActn={() => this.props.navigation.navigate('Reminders')}
          right2BtnActn={() => this.props.navigation.navigate('Messages')}
          btnImage={Images.NOTIFICATION}
          right2Image={Images.CHAT}
        />
        <WebView source={{ uri: this.fbUrl }} />
      </SafeAreaView>
    )
  }
}