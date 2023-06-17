import React, { Component } from 'react';
import { TextInput, View, Picker, TouchableOpacity, Text, Keyboard, Image, KeyboardType, Dimensions } from 'react-native';
import { styles } from './styles'
import color from '../../Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker'

interface Props {
  doneActn: any,
  onChangeValue: any,
  date: Date,
}

export default class DatePickerVw extends Component<Props, object> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={[styles.doneBtnVw, {borderTopWidth: 1}]} >
          <TouchableOpacity style={styles.doneBtn} onPress={() => this.props.doneActn()} activeOpacity={0.8}>
            <Text style={styles.genderTxt}>{'Done'}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          style={{ width: Dimensions.get('screen').width, backgroundColor: 'white' }}
          mode={'time'}
          date={this.props.date}
          onDateChange={(date: any) => this.props.onChangeValue(date)}
        />
      </SafeAreaView>
    )
  }
}