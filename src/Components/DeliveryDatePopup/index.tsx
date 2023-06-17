import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import RedButton from '../RedButton';

interface Props {
  onCross: any,
}

export default class DeliveryDatePopup extends Component<Props, object> {

  state = {
    dateIndex: -1,
    timeIndex: -1,
  }

  //Creating exercises here
  private renderDates = (data: any) => {
    let isCurrent = data.index == this.state.dateIndex;
    return (
      <TouchableOpacity style={[styles.dateVw, { borderWidth: 1, backgroundColor: isCurrent ? color.DARK_RED : 'white' }]} onPress={() => this.setState({dateIndex: data.index})}>
        <Text style={[styles.dateTxt, {color: isCurrent ? 'white' : 'black'}]}>{'1'}</Text>
        <View style={{ borderColor: isCurrent ? 'white' : color.DARK_RED, borderBottomWidth: 1 }} />
        <Text style={[styles.weekTxt, {color: isCurrent ? 'white' : color.GREY}]}>{'MON'}</Text>
      </TouchableOpacity>
    )
  }

  //Creating exercises here
  private renderTime = (data: any) => {
    let isCurrent = data.index == this.state.timeIndex;
    let width = (Dimensions.get('screen').width - styles.totalMargin) / 2
    return (
      <TouchableOpacity style={[styles.timeVw, { borderWidth: 1, width: width, backgroundColor: isCurrent ? color.DARK_RED : 'white' }]} onPress={() => this.setState({timeIndex: data.index})}>
        <Text style={[styles.timeTxt, {color: isCurrent ? 'white' : color.DARK_RED}]}>{'6:00 AM TO 11:00 AM'}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <Image source={require('../../Assets/blurBg.png')} style={{ opacity: 0.8, position: 'absolute' }} />
        <SafeAreaView style={styles.dataVw}>
          <View style={{ backgroundColor: 'white', paddingBottom: 15 }}>
            <View>
              <Text style={styles.greyTitleTxt}>{'Select Delivery Date'}</Text>
              <TouchableOpacity>
                <Text></Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.monthTxt}>{'June'}</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={[1, 1, 1, 1, 1, 1, 1]}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderDates}
              style={styles.tblVw}
            />
            <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
            <Text style={styles.greyTitleTxt}>{'Select Delivery Time'}</Text>
            <FlatList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              data={[1, 1, 1, 1, 1, 1]}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderTime}
              style={styles.tblVw}
            />
            <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
            <RedButton lowMargin={true} onPress={() => {}} title={'Confirm'}/>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}