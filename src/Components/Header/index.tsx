import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles'

interface Props {
  title: string,
  btnImage: any,
  isRightBtn?: Boolean,
  rightImage?: any,
  right2Image?: any,
  leftBtnActn: any,
  rightBtnActn?: any,
  right2BtnActn?: any,
  isMultiple?: boolean,
  backgroundColor?:any,
  background?:any
}

export default class NavigationHeader extends Component<Props, object> {

  singleBtnHeader() {
    return (
      <View>
        <View style={[styles.mainVw,{backgroundColor:this.props.background==true?this.props.backgroundColor: color.APP_HEADER_BG_COLOR}]}>
          <TouchableOpacity onPress={() => this.props.leftBtnActn()} style={styles.leftBtn}>
            <Image source={this.props.btnImage} style={styles.multiBtnLeftImg} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>{this.props.title}</Text>
          <TouchableOpacity onPress={() => this.props.rightBtnActn()} style={styles.leftBtn}>
            <Image source={this.props.rightImage} style={styles.multiBtnLeftImg} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  multipleButtonHeader() {
    return (
      <View>
        <View style={styles.mainVw}>
          <TouchableOpacity onPress={() => this.props.leftBtnActn()} style={styles.leftDualBtn}>
            <Image source={this.props.btnImage} style={styles.btnLeftImg} />
          </TouchableOpacity>
          <Text style={styles.titleDualTxt}>{this.props.title}</Text>
          <TouchableOpacity onPress={() => this.props.rightBtnActn()} style={styles.rightBtn}>
            <Image source={this.props.rightImage} style={styles.btnRightmg} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.right2BtnActn()} style={styles.rightBtn}>
            <Image source={this.props.right2Image} style={styles.btnRightmg} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        {
          this.props.isMultiple ?
            this.multipleButtonHeader() :
            this.singleBtnHeader()
        }
      </View>
    )
  }
}