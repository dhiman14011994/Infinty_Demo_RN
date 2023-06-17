import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';
import { MaterialIndicator } from 'react-native-indicators';
import Images from '../../Utils/ImageGenerator';

interface Props {
  title: any,
  message: any,
  isLoader?: boolean
}

export default class SuccessPopup extends Component<Props, object> {

  render() {
    return (
      <View style={styles.mainVw}>
        {
          this.props.isLoader ?
            <View style={styles.loaderVw}>
              <MaterialIndicator size={styles.size} color='red' />
            </View>
            : <Image source={Images.SUCCESS_CHECK_GREEN} style={styles.tickImg} />
        }
        <Text style={styles.titleTxt}>{this.props.title}</Text>
        <Text style={styles.messageTxt}>{this.props.message}</Text>
      </View>
    )
  }
}