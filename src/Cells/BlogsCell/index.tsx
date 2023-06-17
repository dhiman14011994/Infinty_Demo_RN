import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Blogs } from '../../Modals/BlogsModl';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
}

export default class BlogsCell extends Component<Props, object> {

  render() {
    let blog: Blogs = this.props.data.item
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.8} style={styles.mainVw}>
        <RKImageLoder style={styles.logoImg} src={blog.image} tempImg={Images.PLACEHOLDER} />
        <Text style={styles.titleTxt}>{blog.title}</Text>
        <Text style={styles.descTxt}>{blog.sub_title}</Text>
      </TouchableOpacity>
    )
  }
}