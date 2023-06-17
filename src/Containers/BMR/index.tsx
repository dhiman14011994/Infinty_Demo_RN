/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
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
  navigation: NavigationScreenProp<any, any>;
}

export default class BMR extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    isCm: true,
    isKg: true,
    isMale: true,
    isDisable: true,
    height: '',
    inches: '',
    weight: '',
    age: '',
  };

  handleChange(checked: boolean) {
    this.setState({ isKg: checked });
  }

  calculateFat() {
    if(!this.state.isDisable){
    if (this.state.isMale) {
      this.maleFatCalculator();
    } else {
      this.feMaleFatCalculator();
    }}
  }

  maleFatCalculator() {
    let bmr = 0;
    if (this.state.isKg && this.state.isCm) {
      bmr =
        66 +
        13.7 * Number(this.state.weight) +
        5 * Number(this.state.height) -
        6.8 * Number(this.state.age);
    } else {
      bmr =
        66 +
        6.23 * Number(this.state.weight) +
        12.7 * (Number(this.state.height) * 12 + Number(this.state.inches)) -
        6.8 * Number(this.state.age);
    }
    this.props.navigation.navigate('MeasureResult', {
      isBmr: true,
      result: bmr.toFixed(2),
    });
  }

  feMaleFatCalculator() {
    let bmr = 0;
    if (this.state.isKg && this.state.isCm) {
      bmr =
        655 +
        9.6 * Number(this.state.weight) +
        1.8 * Number(this.state.height) -
        4.7 * Number(this.state.age);
    } else {
      bmr =
        655 +
        4.35 * Number(this.state.weight) +
        4.7 * (Number(this.state.height) * 12 + Number(this.state.inches)) -
        4.7 * Number(this.state.age);
    }
    this.props.navigation.navigate('MeasureResult', {
      isBmr: true,
      result: bmr.toFixed(2),
    });
  }

  onTextEnter() {
    setTimeout(() => {
      if (this.state.height == '') {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.inches == '' && !this.state.isCm) {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.weight == '') {
        this.setState({ isDisable: true });
        return;
      }
      if (this.state.age == '') {
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
          title={'BMR Calculator'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Image source={require('../../Assets/bg.png')} style={styles.bgImg} />
        <KeyboardAvoidingView
          style={styles.scrollVw}
          behavior={'padding'}
          keyboardVerticalOffset={Platform.OS === 'android' ? -300 : 0}
          enabled>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.mesurementTitleVw}>
              <Text style={styles.inputTitleTxt}>{'Gender'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.setState({ isMale: true })}
                activeOpacity={0.8}
                style={[
                  styles.genderBtn,
                  {
                    borderWidth: 1,
                    backgroundColor: this.state.isMale
                      ? color.APP_PINK_COLOR
                      : 'transparent',
                    borderColor: this.state.isMale ? 'transparent' : color.APP_PINK_COLOR,
                  },
                ]}>
                <Text
                  style={[styles.genderTxt, { color: this.state.isMale ? 'white' : color.APP_PINK_COLOR }]}>
                  {'Male'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ isMale: false })}
                activeOpacity={0.8}
                style={[
                  styles.genderBtn,
                  {
                    borderWidth: 1,
                    backgroundColor: !this.state.isMale
                      ? color.APP_PINK_COLOR
                      : 'transparent',
                    borderColor: !this.state.isMale ? 'transparent' : color.APP_PINK_COLOR,
                  },
                ]}>
                <Text
                  style={[styles.genderTxt, { color: !this.state.isMale ? 'white' : color.APP_PINK_COLOR, }]}>
                  {'Female'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mesurementTitleVw}>
              <Text style={styles.inputTitleTxt}>{'Age'}</Text>
            </View>
            <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
              <TextInput
                keyboardType={'numeric'}
                onChangeText={(text: any) => { this.setState({ age: text }), this.onTextEnter() }}
                style={styles.commonInput}
              // placeholder={'Enter Age'}
              />
            </View>
            <View style={[styles.mesurementTitleVw, styles.mesurementExtndVw]}>
              <Text style={styles.inputTitleTxt}>{'Weight'}</Text>
              <View style={styles.unitsVw}>
                <Text
                  style={[
                    styles.unitsTxt,
                    { color: this.state.isKg ? color.APP_PINK_COLOR : 'white' },
                  ]}>
                  {' kg '}
                </Text>
                <FlipToggle
                  value={!this.state.isKg}
                  buttonWidth={styles.buttonWidth}
                  buttonHeight={styles.buttonHeight}
                  buttonRadius={styles.buttonRadius}
                  sliderWidth={styles.sliderWidth}
                  sliderHeight={styles.sliderHeight}
                  sliderRadius={styles.sliderRadius}
                  sliderOnColor={color.APP_PINK_COLOR}
                  sliderOffColor={color.APP_PINK_COLOR}
                  buttonOnColor={color.VERY_LIGHT_GREY}
                  buttonOffColor={color.VERY_LIGHT_GREY}
                  onToggle={(newState: any) =>
                    this.setState({ isKg: !newState })
                  }
                />
                <Text
                  style={[
                    styles.unitsTxt,
                    { color: !this.state.isKg ? color.APP_PINK_COLOR : 'white' },
                  ]}>
                  {' lb '}
                </Text>
              </View>
            </View>
            <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
              <TextInput
                keyboardType={'numeric'}
                onChangeText={(text: string) => { this.setState({ weight: text }), this.onTextEnter() }}
                style={styles.commonInput}
              // placeholder={'Enter Weight'}
              />
              <Text style={styles.unitsSmallTxt}>
                {this.state.isKg ? 'kg' : 'lb'}
              </Text>
            </View>
            <View style={[styles.mesurementTitleVw, styles.mesurementExtndVw]}>
              <Text style={styles.inputTitleTxt}>{'Height'}</Text>
              <View style={styles.unitsVw}>
                <Text
                  style={[
                    styles.unitsTxt,
                    { color: this.state.isCm ? color.APP_PINK_COLOR : 'white' },
                  ]}>
                  {' cm '}
                </Text>
                <FlipToggle
                  value={!this.state.isCm}
                  buttonWidth={styles.buttonWidth}
                  buttonHeight={styles.buttonHeight}
                  buttonRadius={styles.buttonRadius}
                  sliderWidth={styles.sliderWidth}
                  sliderHeight={styles.sliderHeight}
                  sliderRadius={styles.sliderRadius}
                  sliderOnColor={color.APP_PINK_COLOR}
                  sliderOffColor={color.APP_PINK_COLOR}
                  buttonOnColor={color.VERY_LIGHT_GREY}
                  buttonOffColor={color.VERY_LIGHT_GREY}
                  onToggle={(newState: any) => { this.setState({ isCm: !newState }), this.onTextEnter() }
                  }
                />
                <Text
                  style={[
                    styles.unitsTxt,
                    { color: !this.state.isCm ? color.APP_PINK_COLOR : 'white' },
                  ]}>
                  {' ft '}
                </Text>
              </View>
            </View>
            <View style={[styles.inputVw, { borderBottomWidth: 1 }]}>
              <TextInput
                keyboardType={'numeric'}
                onChangeText={(text: string) => { this.setState({ height: text }), this.onTextEnter() }}
                style={styles.commonInput}
              // placeholder={'Enter Height'}
              />
              <Text style={styles.unitsSmallTxt}>
                {this.state.isCm ? 'cm' : 'ft'}
              </Text>
              {!this.state.isCm ? (
                <TextInput
                  keyboardType={'numeric'}
                  onChangeText={(text: string) => { this.setState({ inches: text }), this.onTextEnter() }}
                  style={styles.commonInput}
                // placeholder={'Enter height'}
                />
              ) : null}
              {!this.state.isCm ? (
                <Text style={styles.unitsSmallTxt}>{'in'}</Text>
              ) : null}
            </View>
            <RedButton
              isDisable={this.state.isDisable}
              title={'Calculate BMR'}
              onPress={() => this.calculateFat()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
