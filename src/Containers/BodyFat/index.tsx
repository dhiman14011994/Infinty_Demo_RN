
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Platform, Switch, Dimensions } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import FlipToggle from 'react-native-flip-toggle-button';
import NavigationHeader from '../../Components/Header';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class BodyFat extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    isCm: true,
    isMale: true,
    isDisable: true,
    height: '',
    weight: '',
    waist: '',
    neck: '',
    wrist: '',
    hip: '',
    forearm: '',
  }

  handleChange(checked: boolean) {
    this.setState({ isKg: checked });
  }

  calculateFat() {
    if (this.state.isDisable) {
      return;
    }
    if (this.state.isMale) {
      this.maleFatCalculator();
    }
    else {
      this.feMaleFatCalculator();
    }
  }

  maleFatCalculator() {
    // REFRENCE SITE: https://www.bmi-calculator.net/body-fat-calculator/body-fat-formula.php
    let totalWeight = (Number(this.state.weight) * 1.082) + 94.42;
    let waistMeasure = Number(this.state.waist) * 4.15;
    let leanBodyFat = totalWeight - waistMeasure;
    let bodyFat = Number(this.state.weight) - leanBodyFat;
    let fatPercent = (bodyFat * 100) / Number(this.state.weight);
    this.props.navigation.navigate('MeasureResult', { isBmr: false, result: fatPercent.toFixed(2) })
  }

  feMaleFatCalculator() {
    // REFRENCE SITE: https://www.bmi-calculator.net/body-fat-calculator/body-fat-formula.php
    let totalWeight = (Number(this.state.weight) * 0.732) + 8.987;
    let wristMeasure = Number(this.state.wrist) / 3.140;
    let waistMeasure = Number(this.state.waist) * 0.157;
    let hipMeasure = Number(this.state.hip) * 0.249;
    let forearmMeasure = Number(this.state.forearm) * 0.434;
    let leanBodyFat = totalWeight + waistMeasure - wristMeasure - hipMeasure + forearmMeasure;
    let bodyFat = Number(this.state.weight) - leanBodyFat;
    let fatPercent = (bodyFat * 100) / Number(this.state.weight);
    this.props.navigation.navigate('MeasureResult', { isBmr: false, result: fatPercent.toFixed(2) })
  }

  onTextEnter() {
    setTimeout(() => {
      if (this.state.waist == '') {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.neck == '') {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.weight == '') {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.wrist == '' && !this.state.isMale) {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.hip == '' && !this.state.isMale) {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.forearm == '' && !this.state.isMale) {
        this.setState({ isDisable: true });
        return;
      }

      this.setState({ isDisable: false });
    }, 20);
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Body Fat'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Image source={require('../../Assets/bg.png')} style={styles.bgImg} />
        <KeyboardAvoidingView style={styles.scrollVw} behavior={'padding'} keyboardVerticalOffset={(Platform.OS === 'android') ? -300 : 0} enabled>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.mesurementTitleVw}>
              <Text style={styles.inputTitleTxt}>{'Gender'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { this.setState({ isMale: true }), this.onTextEnter() }} activeOpacity={0.8} style={[styles.genderBtn, { borderWidth: 1, backgroundColor: this.state.isMale ? color.APP_LIGHT_PINK : 'transparent', borderColor: this.state.isMale ? 'transparent' : color.APP_LIGHT_PINK }]}>
                <Text style={[styles.genderTxt, { color: this.state.isMale ? 'white' : color.APP_LIGHT_PINK }]}>{'Male'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ isMale: false }), this.onTextEnter() }} activeOpacity={0.8} style={[styles.genderBtn, { borderWidth: 1, backgroundColor: !this.state.isMale ? color.APP_LIGHT_PINK : 'transparent', borderColor: !this.state.isMale ? 'transparent' : color.APP_LIGHT_PINK }]}>
                <Text style={[styles.genderTxt, { color: !this.state.isMale ? 'white' : color.APP_LIGHT_PINK }]}>{'Female'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mesurementTitleVw}>
              <Text style={styles.inputTitleTxt}>{'Waist'}</Text>
            </View>
            <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
              <TextInput keyboardType={'numeric'} onChangeText={(text: any) => { this.setState({ waist: text }), this.onTextEnter() }} style={styles.commonInput} />
            </View>
            <View style={styles.mesurementTitleVw}>
              <Text style={styles.inputTitleTxt}>{'Neck'}</Text>
            </View>
            <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
              <TextInput keyboardType={'numeric'} onChangeText={(text: any) => { this.setState({ neck: text }), this.onTextEnter() }} style={styles.commonInput} />
            </View>
            {
              this.state.isMale == true ? null :
                <View>
                  <View style={styles.mesurementTitleVw}>
                    <Text style={styles.inputTitleTxt}>{'Wrist'}</Text>
                  </View>
                  <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
                    <TextInput keyboardType={'numeric'} onChangeText={(text: any) => { this.setState({ wrist: text }), this.onTextEnter() }} style={styles.commonInput} />
                  </View>
                  <View style={styles.mesurementTitleVw}>
                    <Text style={styles.inputTitleTxt}>{'Hip'}</Text>
                  </View>
                  <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
                    <TextInput keyboardType={'numeric'} onChangeText={(text: any) => { this.setState({ hip: text }), this.onTextEnter() }} style={styles.commonInput} />
                  </View>
                  <View style={styles.mesurementTitleVw}>
                    <Text style={styles.inputTitleTxt}>{'Forearm'}</Text>
                  </View>
                  <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
                    <TextInput keyboardType={'numeric'} onChangeText={(text: any) => [this.setState({ forearm: text }), this.onTextEnter()]} style={styles.commonInput} />
                  </View>
                </View>
            }
            <View style={styles.mesurementTitleVw}>
              <Text style={styles.inputTitleTxt}>{'Weight'}</Text>
            </View>
            <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
              <TextInput keyboardType={'numeric'} onChangeText={(text: any) => { this.setState({ weight: text }), this.onTextEnter() }} style={styles.commonInput} />
            </View>
            <RedButton isDisable={this.state.isDisable} title={'Calculate Body Fat'} onPress={() => this.calculateFat()} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
