import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from "../../Components/Header";
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import { WebView } from 'react-native-webview';
import RedButton from '../../Components/RedButton';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class IntroVideo extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  webRef: any;
  // url = 'https://design.iphoneapps.co.in/intro.mp4';
  url = 'http://iphoneapps.co.in:9898/vimeoVideoPlayer?vdo_id=448858487';

  state = {
    url: this.url,
  }

  componentDidMount() {
    // this.props.navigation.addListener('willFocus', (route) => { this.webRef && this.webRef.reload(); });
    let self = this;
    this.props.navigation.addListener('willBlur', (event: any) => {
      self.setState({ url: '' })
    });
    this.props.navigation.addListener('willFocus', (event: any) => {
      console.log('EVENT 2', event)
      if (event.state != undefined && event.state.routeName == 'IntroVideo') {
        self.setState({ url: this.url })
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <WebView ref={WEBVIEW_REF => (this.webRef = WEBVIEW_REF)} onLoadStart={() => { }} source={{ uri: this.state.url }} />
        <RedButton title={'Proceed'} onPress={() => this.props.navigation.navigate('StartJourney')} />
      </SafeAreaView>
    )
  }
}