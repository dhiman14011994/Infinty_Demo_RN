import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../Utils/ImageGenerator';

interface Props {
  item: any,
  onpress: any,
}

export default class SettingsCell extends Component<Props, object> {
  render() {
    return (
      <TouchableOpacity style={styles.cellVw} onPress={() => this.props.onpress()} activeOpacity={0.8}>
        <Image source={this.props.item.iconFront} style={styles.settingImg} />
        <Text style={styles.settingTxt}>{this.props.item.title}</Text>
        <Image source={this.props.item.iconBack} style={[styles.settingImg, styles.arrowImg]} />
      </TouchableOpacity>
    )
  }
}