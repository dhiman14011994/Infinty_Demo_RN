import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { } from 'react-native-svg';
import { styles } from './styles';
import { Reminder, Notification } from '../../Modals/ReminderModl';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  data: Notification;
}

export default class ReminderCell extends Component<Props, object> {

  render() {
    return (
      // <View style={styles.mainVw}>
      //   <Image source={require('../../Assets/attention.png')} style={styles.img}/>
      //   <View style={styles.txtVw}>
      //     <Text style={styles.titleTxt}>{this.props.data.title}</Text>
      //     <Text style={styles.descTxt}>{this.props.data.description}</Text>
      //   </View>
      //   <Text style={styles.timeTxt}>{'10:00 am'}</Text>
      // </View>
      <View style={styles.mainVw}>
        <Image source={Images.WATER} style={styles.img}/>
        <View style={styles.txtVw}>
          <Text style={styles.titleTxt}>{'Title'}</Text>
          <Text style={styles.descTxt}>{'DATA'}</Text>
        </View>
        <Text style={styles.timeTxt}>{'10:00 am'}</Text>
      </View>
    )
  }
}