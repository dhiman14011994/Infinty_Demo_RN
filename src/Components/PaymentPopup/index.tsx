import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Images from '../../Utils/ImageGenerator';

interface Props {
  onPress: any,
}

export default class PaymentPopup extends Component<Props, object> {

  componentDidMount() {
    setTimeout(() => {
      this.props.onPress()
    }, 5000);
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={Images.SUCCESS_CHECK_GREEN} style={styles.tickImg} />
        <Text style={styles.titleTxt}>{'Payment Successful'}</Text>
        {/* <Text style={styles.messageTxt}>{this.props.message}</Text> */}
      </View>
    )
  }
}