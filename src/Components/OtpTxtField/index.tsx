import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';

interface Props {
  value: string,
  onTextChange: any,
  inputRef: any,
}

export default class OtpTxtField extends Component<Props, object> {

  render() {
    return (
      <View style={styles.otpVw}>
        <TextInput keyboardType={'numeric'} placeholder={''} maxLength={1} ref={this.props.inputRef} value={this.props.value} onChangeText={(text: string) => this.props.onTextChange(text)} style={[styles.otpTxtInput, { backgroundColor: this.props.value == '' ? color.APP_COMMON_GREY : color.APP_PINK_COLOR, }]} secureTextEntry={false} />
      </View>
    )
  }
}

