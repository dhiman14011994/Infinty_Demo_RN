import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity, TouchableHighlightBase } from 'react-native';
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

export default class MessagePlansDtls extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    amount: 300,
    index: 2,
  }

  renderPlan(subscription: string, amount: any, desc: string, index: any) {
    let isEnable = this.state.index == index ? true : false;
    return (
      <TouchableOpacity style={[styles.planVw, { borderColor: isEnable ? color.APP_LIGHT_PINK : color.APP_LIGHT_BG_COLOR, borderWidth: 2, }]} onPress={() => this.setState({ index: index, amount: amount })} activeOpacity={0.8}>
        <View style={styles.planTitleVw}>
          <Text style={styles.planTitlext}>{subscription}</Text>
          <Text style={styles.amountTxt}>{'$' + amount}</Text>
        </View>
        <Text style={styles.descTxt}>{desc}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationHeader
            title={this.props.navigation.state.params.title}
            isMultiple={false}
            leftBtnActn={() => this.props.navigation.goBack()}
            btnImage={Images.BACK}
          />
          <ScrollView style={styles.plansCntnr} showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', borderColor: 'white', borderBottomWidth: 1, paddingVertical: 15,}}> 
              <Text style={styles.selctedPlanTxt}>{this.props.navigation.state.params.title}</Text>
              <Text style={styles.selectedAmtTxt}>{`$${this.state.amount}/Month`}</Text>
            </View>
            {
              this.renderPlan('1 Month Subscription', 100, 'Auto renewal subscription, gets renewed every month', 1)
            }
            {
              this.renderPlan('3 Month Subscription', 300, 'You can renew it after 3 months manually', 2)
            }
            {
              this.renderPlan('6 Month Subscription', 600, 'You can renew it after 6 months manually', 3)
            }
            <View style={{ flex: 1 }} />
            <View style={styles.btnVw}>
              <RedButton title={'Confirm'} onPress={() => {}} />
            </View>
            <View style={styles.paddingVw} />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}