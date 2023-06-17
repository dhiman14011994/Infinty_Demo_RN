import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';

interface Props {
  title: string,
  onPress: any,
  isDisable?: boolean,
  lowMargin?: boolean,
}

export default class RedButton extends Component<Props, object> {
  render() {
    return (
      <TouchableOpacity style={[styles.loginBtn, (this.props.lowMargin ? styles.noMarginVw : null), { backgroundColor: this.props.isDisable ? '#611c22' : color.APP_COMMON_BTN_COLOR }]} onPress={() => this.props.onPress()} activeOpacity={0.8}>
        <Text style={styles.loginBtntTxt}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}