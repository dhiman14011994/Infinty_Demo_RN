import React, { Component } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Share } from 'react-native';
import { styles } from './styles';
import { WebView } from 'react-native-webview';
import Images from '../../Utils/ImageGenerator';

interface Props {
  url: string,
  onCross: any,
}

export default class WebBrowser extends Component<Props, object> {

  webRef: any;

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <View style={styles.headerVw}>
          <TouchableOpacity style={styles.crossBtn} onPress={() => this.props.onCross()} activeOpacity={0.8} >
            <Image source={Images.CANCEL} style={styles.crossImg} />
          </TouchableOpacity>
        </View>
        <WebView ref={WEBVIEW_REF => (this.webRef = WEBVIEW_REF)} onLoadStart={() => { }} source={{ uri: this.props.url }} />
      </SafeAreaView>
    )
  }
}