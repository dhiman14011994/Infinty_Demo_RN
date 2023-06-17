import React, { Component } from 'react';
import { TextInput, View, FlatList, TouchableOpacity, Text, Keyboard, Image, KeyboardType } from 'react-native';
import { styles } from './styles'
import color from '../../Constants/Colors';

interface Props {
  type: KeyboardType,
  text: string,
  errorTxt?: string,
  placeholder: string,
  letfImg?: any,
  rightImg?: any,
  isSecure?: boolean,
  isOther?: boolean
  changeText: any,
  onPress?: any,
  editable?: boolean,
}

export default class FixedTxtFld extends Component<Props, object> {
  render() {
    let isError = this.props.errorTxt == null || this.props.errorTxt == undefined || this.props.errorTxt == '' ? false : true
    return (
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          {
            this.props.letfImg == null ? null :
              <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8}>
                <Image style={styles.leftImg} source={this.props.letfImg} />
              </TouchableOpacity>
          }
          <View style={{ flex: 1 }}>
            <TextInput editable={this.props.editable} keyboardType={this.props.type} style={styles.commonTxt} onChangeText={(text: any) => this.props.changeText(text)} value={this.props.text} placeholder={this.props.placeholder} secureTextEntry={this.props.isSecure} placeholderTextColor={color.APP_LIGHT_COLOR} />
          </View>
          {
            this.props.rightImg == null ? null :
              <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8}>
                <Image style={styles.rightImg} source={this.props.rightImg} />
              </TouchableOpacity>
          }
        </View>
        {
          !isError ? null :
            <Text style={styles.errorTxt}>{this.props.errorTxt}</Text>
        }
      </View>
    )
  }
}
