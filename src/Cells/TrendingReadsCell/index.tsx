import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';
import { Blogs } from '../../Modals/BlogsModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  data: any,
  onPress: any
}

export default class TrendingReadsCell extends Component<Props, object> {

  render() {

    let item: Blogs = this.props.data.item;
    return (
      <TouchableOpacity style={styles.mainVw} activeOpacity={0.8} onPress={() => this.props.onPress()}>
        <View>
          <RKImageLoder style={styles.logoImg} src={item.image} tempImg={Images.PLACEHOLDER} />
          <View style={styles.newTxtVw}>
            <Text style={styles.newTxt}>{item.tag_line}</Text>
          </View>
        </View>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <Text style={styles.descTxt}>{item.sub_title}</Text>
      </TouchableOpacity>
    )
  }
}