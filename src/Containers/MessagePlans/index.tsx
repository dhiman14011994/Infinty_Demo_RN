import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import NavigationHeader from "../../Components/Header";
import { NavigationScreenProp } from 'react-navigation';
import RedButton from '../../Components/RedButton';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';
import color from '../../Constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class MessagePlans extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  render() {
    return (
      <View style={styles.mainVw}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationHeader
            title={'Premium Plans'}
            isMultiple={false}
            leftBtnActn={() => this.props.navigation.goBack()}
            btnImage={Images.BACK}
          />
          <ScrollView style={styles.plansCntnr} showsVerticalScrollIndicator={false}>
            <View style={styles.planVw}>
              <View style={styles.planTitleVw}>
                <Text style={[styles.planTitlext, { color: color.APP_DARK_GREY, }]}>{'PLATINUM PLAN'}</Text>
                <View style={[styles.planBorderVw, { backgroundColor: color.APP_DARK_GREY }]} />
              </View>
              <Text style={styles.descTxt}>{'Personal Coach'}</Text>
              <Text style={styles.amountDescTxt}>{'at '}
                <Text style={styles.amountTxt}>{'$100'}</Text>
                <Text>{' /Month'}</Text>
              </Text>
              <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('MessagePlansDtls', {title: 'Platinum Plan', amount: '$100'})}>
                <Text style={styles.exploreTxt}>{'Explore'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.planVw}>
              <View style={styles.planTitleVw}>
                <Text style={[styles.planTitlext, { color: '#FFD54DCC', }]}>{'GOLD PLAN'}</Text>
                <View style={[styles.planBorderVw, { backgroundColor: '#FFD54DCC' }]} />
              </View>
              <Text style={[styles.amountDescTxt, { marginBottom: 0 }]}>{'at '}
                <Text style={styles.amountTxt}>{'$70'}</Text>
                <Text>{' /Month'}</Text>
              </Text>
              <TouchableOpacity style={styles.viewPlanBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('MessagePlansDtls', {title: 'Gold Plan', amount: '$70'})}>
                <Text style={styles.viewPlanTxt}>{'View Plan'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.planVw}>
              <View style={styles.planTitleVw}>
                <Text style={[styles.planTitlext, { color: '#B5B5B5CC', }]}>{'GOLD PLAN'}</Text>
                <View style={[styles.planBorderVw, { backgroundColor: '#B5B5B5CC' }]} />
              </View>
              <Text style={[styles.amountDescTxt, { marginBottom: 0 }]}>{'at '}
                <Text style={styles.amountTxt}>{'$40'}</Text>
                <Text>{' /Month'}</Text>
              </Text>
              <TouchableOpacity style={styles.viewPlanBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('MessagePlansDtls', {title: 'Silver Plan', amount: '$40'})}>
                <Text style={styles.viewPlanTxt}>{'View Plan'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.paddingVw} />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}