import React, { Component } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from './styles';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles'
import color from '../../Constants/Colors';

interface Props {
  data: any,
}

export default class RBTLiveCell extends Component<Props, object> {


  //Render time slots
  private renderTimeSlots(title: any, index: any) {
    let widthBtn = (Dimensions.get('screen').width - styles.totalBtnMargin) / 3;
    return (
      <TouchableOpacity onPress={() => this.setState({ index: 0 })} activeOpacity={0.8} style={[styles.moreBtn, { width: widthBtn, borderWidth: 1 }]}>
        <Text style={styles.menuTxt}>{'6:00 PM'}</Text>
      </TouchableOpacity>
    )
  }

  render() {

    let width = Dimensions.get('screen').width - styles.totalMargin;

    let item = this.props.data.item;

    return (
      <ShadowView style={[customStyles.shadow, styles.mainVw]}>
        <View>
          <Image style={[styles.logoImg, { width: width }]} source={require('../../Assets/dummy.png')} />
          <View style={styles.newTxtVw}>
            <Text style={styles.newTxt}>{'LIVE'}</Text>
          </View>
        </View>
        <View style={styles.dateTitleCntnr}>
          <View style={styles.dateCntnr}>
            <View style={styles.monthVw}>
              <Text style={styles.monthTxt}>{'May'}</Text>
            </View>
            <View style={styles.dateVw}>
              <Text style={styles.dateTxt}>{'24'}</Text>
            </View>
          </View>
          <View style={styles.titleCntnr}>
            <Text style={styles.titleTxt}>{'Strength and Conditioning: Full Body Workout'}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.nameTxt}><Text style={styles.byTxt}>{'by '}</Text>{'Jason Sangha'}</Text>
              <Text style={styles.timeTxt}>{'30 min'}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          {
            slots.map((item: any, index: any) => (
              this.renderTimeSlots(item.title, index)
            ))
          }
        </View>
        <View style={styles.imageJoinCntnr}>
          <View style={styles.imageVw}>
            <Image source={require('../../Assets/dummyPic.png')} style={styles.profileImg} />
            <Image source={require('../../Assets/dummyPic.png')} style={[styles.profileImg, { left: styles.left }]} />
            <View style={[styles.countVw, { left: styles.left * 2, borderWidth: 2, }]}>
              <View style={[styles.opaqueVw, { opacity: 0.6 }]} />
              <Text style={styles.countTxt}>{'+76'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.joinBtn}>
            <Text style={styles.countTxt}>{'JOIN'}</Text>
          </TouchableOpacity>
        </View>
      </ShadowView>
    )
  }
}

let slots = [{ title: '6:00 PM' }, { title: '8:00 PM' }, { title: 'more' }]