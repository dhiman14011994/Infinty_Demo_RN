import React, { Component } from 'react';
import { TextInput, View, Picker, TouchableOpacity, Text, Keyboard, Image, KeyboardType } from 'react-native';
import { styles } from './styles'
import color from '../../Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  doneActn: any,
  onChangeValue: any,
  value: any,
}

export default class CustomPicker extends Component<Props, object> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.doneBtnVw} >
          <TouchableOpacity style={styles.doneBtn} onPress={() => this.props.doneActn()} activeOpacity={0.8}>
            <Text style={styles.genderTxt}>{'Done'}</Text>
          </TouchableOpacity>
        </View>
        <Picker selectedValue={this.props.value} style={{ backgroundColor: 'white' }} onValueChange={(itemValue, itemIndex) => this.props.onChangeValue(itemValue, itemIndex)} >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </SafeAreaView>
    )
  }
}