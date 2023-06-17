import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { } from 'react-native-svg';
import { styles } from './styles';
import { TransactionModl } from '../../Modals/CommonModl';
import Moment from 'moment';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: TransactionModl,
  onPress: any,
}

export default class TransactionCell extends Component<Props, object> {

  render() {
    let item: TransactionModl = this.props.data;
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={styles.mainVw}>
        <View style={styles.txtVw}>
          <Text style={styles.titleTxt}>{item.title}</Text>
          <Text style={styles.orderIdTxt}>{'Order ID ' + item.order_id}</Text>
          <Text style={styles.commonLeftTxt}>{'Amount: ' + item.transaction_amount + item.transaction_currency}</Text>
          <Text style={styles.commonLeftTxt}>{'Date: ' + Moment(item.created_at).format('DD-MM-yyyy')}</Text>
        </View>
        <Image source={Images.RIGHT_ARROW} style={styles.img} />
      </TouchableOpacity>
      // <View style={styles.mainVw}>
      //   <View style={styles.txtVw}>
      //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
      //       <Text style={styles.titleTxt}>{this.props.data.title}</Text>
      //       <Text style={styles.orderIdTxt}>{'Order ID ' + this.props.data.order_id}</Text>
      //     </View>
      //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
      //       <Text style={styles.commonLeftTxt}>{'Duration: 12 Months'}</Text>
      //       <Text style={styles.commonRightTxt}>{'Start Date: 20/06/2020'}</Text>
      //     </View>
      //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
      //       <Text style={styles.commonLeftTxt}>{'Pack: PLUS'}</Text>
      //       <Text style={styles.commonRightTxt}>{'E-mail ID: anthonylolli@rbt.com'}</Text>
      //     </View>
      //   </View>
      //   <Image source={require('../../Assets/rightArrow.png')} style={styles.img} />
      // </View>
    )
  }
}