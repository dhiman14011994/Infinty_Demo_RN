/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-this */
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import customStyles from '../../Constants/Styles';
import { TextInput } from 'react-native-gesture-handler';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import {
  addCard,
  purchasePlan,
  purchasePlanResp,
  addCardResp,
} from '../../Redux/Actions/PaymentActions';
import { saveLoginInfo } from '../../Redux/Actions/LoginActions';
import creditCardType from 'credit-card-type';
import { cardImg } from '../../Utils/CardImgGenerator';
import Images from '../../Utils/ImageGenerator';
import color from '../../Constants/Colors';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  addCard: any;
  cardResp: any;
  token: string;
  saveMealId: any;
  getCards: any;
  startPlan: any;
  planResponse: any;
  changeStatus: any;
  cardStatus: any;
}

class PaymentCard extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    cardNumber: '',
    name: '',
    month: '',
    cvv: '',
    cardType: '',
  };

  componentWillReceiveProps(props: any) {
    if (props.cardResp) {
      this.props.cardStatus();
      this.props.navigation.goBack();
    }
  }

  //Fetching banners
  private saveCard() {
    const params = {
      number: this.state.cardNumber.replace(/ /g, ''),
      exp_month: this.state.month.split('/')[0],
      exp_year: this.state.month.split('/')[1],
      cvc: this.state.cvv,
      name: this.state.name,
    };
    this.props.addCard({ params: params, token: this.props.token, type: 1 });
  }

  //Managing spaces for card number
  private handlingCardNumber(number: string) {
    if (number.length < 20) {
      this.setState({
        cardNumber: number
          .replace(/\s?/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim(),
      });
    }
    if (number == '') {
      this.setState({ cardType: '' });
    } else {
      let self = this;
      creditCardType(number).filter(function (card) {
        self.setState({ cardType: card.type });
      });
    }
  }

  //Date handling
  private cardDateManager(isMonth: boolean, text: string) {
    let date = text;
    if (text.length == 2) {
      date = text + '/';
    }
    console.log('Date ', Number(date))
    this.setState({ month: date })
  }

  render() {
    let screenWidth = Dimensions.get('screen').width;

    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Payment'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <KeyboardAvoidingView
          style={styles.dataVw}
          behavior={'padding'}
          keyboardVerticalOffset={Platform.OS === 'android' ? -300 : 0}
          enabled>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.cardVw}>
              <Image
                source={require('../../Assets/cardBg.png')}
                style={[
                  styles.cardImg,
                  { width: screenWidth - styles.totalMargin },
                ]}
              />
              <Image
                source={cardImg(this.state.cardType, true)}
                style={styles.cardIconImg}
              />
              <Text style={styles.cardNoTxt}>{this.state.cardNumber}</Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '75%' }}>
                  <Text style={styles.cardSubText}>{'CARD HOLDER'}</Text>
                  <Text style={styles.cardSubDescText}>{this.state.name}</Text>
                </View>
                <View style={{ width: '25%', alignItems: 'flex-end' }}>
                  <Text style={styles.cardSubText}>{'EXP DATE'}</Text>
                  <Text style={styles.cardSubDescText}>
                    {this.state.month}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.textInputCntnr}>
              <View>
                <Text style={styles.inputTitleTxt}>{'Card Number'}</Text>
                <TextInput
                  keyboardType={'numeric'}
                  onChangeText={(text: string) => this.handlingCardNumber(text)}
                  style={[styles.commonTxtInput]}
                  value={this.state.cardNumber}
                  placeholder={'0000 0000 0000 0000'}
                  placeholderTextColor={color.VERY_LIGHT_GREY}
                  maxLength={19}
                />
              </View>
              <View>
                <Text style={styles.inputTitleTxt}>{'Name on Card'}</Text>
                <TextInput
                  onChangeText={(text: string) => this.setState({ name: text })}
                  style={[styles.commonTxtInput]}
                  value={this.state.name}
                  placeholder={'Name'}
                  placeholderTextColor={color.VERY_LIGHT_GREY}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: styles.marginRight, }}>
                  <Text style={styles.inputTitleTxt}>{'Expiry Date'}</Text>
                  <TextInput
                    onEndEditing={() => {
                      this.setState({
                        month:
                          this.state.month.length == 1
                            ? 0 + this.state.month
                            : this.state.month,
                      });
                    }}
                    placeholderTextColor={color.VERY_LIGHT_GREY}
                    keyboardType={'numeric'}
                    maxLength={5}
                    onChangeText={(text: string) =>
                      this.cardDateManager(true, text)
                    }
                    style={styles.commonTxtInput}
                    value={this.state.month}
                    placeholder={'MM / YY'}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: styles.marginLeft, }}>
                  <Text style={styles.inputTitleTxt}>{'Security Code'}</Text>
                  <TextInput
                    keyboardType={'numeric'}
                    maxLength={4}
                    onChangeText={(text: string) => this.setState({ cvv: text })}
                    style={styles.commonTxtInput}
                    placeholderTextColor={color.VERY_LIGHT_GREY}
                    value={this.state.cvv}
                    placeholder={'CVV'}
                  />
                </View>
              </View>
            </View>
            <RedButton title={'Add Card'} onPress={() => this.saveCard()} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    cardResp: state.loginReducer.paymentData.cardSaved,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addCard: (data: any) => dispatch(addCard(data)),
    startPlan: (data: any) => dispatch(purchasePlan(data)),
    changeStatus: () => dispatch(purchasePlanResp(false)),
    cardStatus: () => dispatch(addCardResp(false)),
    saveMealId: (data: any) => dispatch(saveLoginInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard);
