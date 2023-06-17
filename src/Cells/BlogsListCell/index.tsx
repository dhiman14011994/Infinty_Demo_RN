import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { styles } from './styles';
import { Blogs } from '../../Modals/BlogsModl';
import { CircleSnail } from 'react-native-progress';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
}

export default class BlogsListCell extends Component<Props, object> {

  render() {

    let item: Blogs = this.props.data.item;
    let width = Dimensions.get('screen').width - styles.totalPadding;
    return (
      <TouchableOpacity style={styles.mainVw} onPress={() => this.props.onPress()} activeOpacity={0.8}>
        <RKImageLoder style={styles.logoImg} src={item.image} tempImg={Images.PLACEHOLDER} />
        <View style={styles.titleDataVw}>
          <Text numberOfLines={2} style={styles.titleTxt}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.subTitleTxt}>{item.sub_title}</Text>
          <View style={{flex: 1}} />
          {/* <View style={styles.timeCntnr}>
            <Text numberOfLines={1} style={styles.timeTxt}>{'15 May'}</Text>
            <Text numberOfLines={1} style={styles.timeTxt}>{'5 min read'}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    )
  }
}