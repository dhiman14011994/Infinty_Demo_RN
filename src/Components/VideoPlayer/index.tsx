import React, { Component } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { WebView } from 'react-native-webview';
import Images from '../../Utils/ImageGenerator';
import { videoBaseUrl } from '../../Constants/API';

interface Props {
  videoId: string,
  onCross: any,
}

export default class VideoPlayer extends Component<Props, object> {

  url = videoBaseUrl + this.props.videoId;
  webRef: any;

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <TouchableOpacity style={styles.crossBtn} onPress={() => this.props.onCross()} activeOpacity={0.8} >
          <Image source={Images.CROSS_WHITE} style={styles.crossImg} />
        </TouchableOpacity>
        <WebView ref={WEBVIEW_REF => (this.webRef = WEBVIEW_REF)} onLoadStart={() => { }} source={{ uri: this.url }} />
      </SafeAreaView>
    )
  }
}