import React, { Component } from 'react';
import { SafeAreaView, View, Image, Dimensions, Text, ScrollView, Alert, Modal, Platform } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { TextInput, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import { CardModl } from '../../Modals/Payment';
import { connect } from 'react-redux';
import { purchasePlan, purchasePlanResp, getCards, removeCard, removeCardResp } from '../../Redux/Actions/PaymentActions';
import AsyncStorage from '@react-native-community/async-storage';
import { saveLoginInfo } from '../../Redux/Actions/LoginActions';
import ActionSheet from 'react-native-actionsheet'
import PaymentPopup from '../../Components/PaymentPopup';
import { cardImg } from '../../Utils/CardImgGenerator';
import Images from '../../Utils/ImageGenerator';
//@ts-ignore
import stripe from 'tipsi-stripe'
import Toast from 'react-native-simple-toast'

interface Props {
  navigation: NavigationScreenProp<any, any>,
  cardsList: CardModl[],
  token: string,
  saveId: any,
  getCards: any,
  startPlan: any,
  planResponse: any,
  changeStatus: any,
  removeCard: any,
  removeStatus: any,
  changeRemoveStatus: any,
}

class PaymentMode extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    showPopup: false,
    isFirstTime: true,
    cardsList: [] as CardModl[],



  }

  cardId = '';
  ref: any;
  isFromSetting = this.props.navigation.state.params.type == '' ? true : false;

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'PaymentMode') {
        this.props.getCards({ token: this.props.token })
      }
    });
  }

  componentWillReceiveProps(props: any) {
    this.setState({ cardsList: props.cardsList, isFirstTime: false })
    if (props.planResponse) {
      this.props.changeStatus();
      this.setState({ showPopup: true })
    }
    else if (props.removeStatus) {
      this.props.changeRemoveStatus();
      this.props.getCards({ token: this.props.token })
    }
  }


  async componentWillMount() {
    // const allowed = await stripe.deviceSupportsNativePay()
    // const amexAvailable = await stripe.canMakeNativePayPayments({
    //   networks: ['american_express'],
    // })
    // const discoverAvailable = await stripe.canMakeNativePayPayments({
    //   networks: ['discover'],
    // })
    // const masterCardAvailable = await stripe.canMakeNativePayPayments({
    //   networks: ['master_card'],
    // })
    // const visaAvailable = await stripe.canMakeNativePayPayments({
    //   networks: ['visa'],
    // })
    // this.setState({
    //   allowed,
    //   amexAvailable,
    //   discoverAvailable,
    //   masterCardAvailable,
    //   visaAvailable,
    // })
  }

  //HAndling the meal Response
  private async mealResponse() {
    try {
      const value: any = await AsyncStorage.getItem('loginData');
      let userInfo: any = JSON.parse(value)
      if (this.props.navigation.state.params.type == 'mealplan') {
        userInfo['mealplan'] = this.props.navigation.state.params.id;
      }
      else {
        userInfo['workoutplan'] = this.props.navigation.state.params.id;
      }
      await AsyncStorage.setItem('loginData', JSON.stringify(userInfo));
      this.props.saveId({ success: userInfo })
      if (this.props.navigation.state.params.type == 'mealplan') {
        this.props.navigation.navigate('Nutrition')
      }
      else {
        this.props.navigation.navigate('Home')
      }
      this.setState({ showPopup: false })
    } catch (error) {
      Alert.alert(error);
    }
  }

  //Creating workouts here
  private card = (data: any) => {
    let item = data.item as CardModl;
    return (
      <TouchableOpacity style={styles.cardVw} onPress={() => this.onCellTap(item.id)}>
        <Image source={cardImg(item.brand, false)} style={styles.cardImg} />
        <Text style={styles.cardTxt}>{'XXXX-XXXX-XXXX-' + item.last4}</Text>
        {
          this.isFromSetting ?
            <TouchableOpacity onPress={() => this.onCellTap(item.id)}>
              <Image source={require('../../Assets/dots.png')} style={styles.dotImg} />
            </TouchableOpacity>
            : <View style={styles.blankVw} />
        }
      </TouchableOpacity>
    )
  }

  //Save Meal Plan
  private savePlan(cardId: any) {
    const params = {
      "card_id": cardId,
      "plan_id": this.props.navigation.state.params.id,
      "plan_type": this.props.navigation.state.params.type,
      "amount": this.props.navigation.state.params.amount,
      "duration": this.props.navigation.state.params.duration,
    }
    this.props.startPlan({ params: params, token: this.props.token })
  }

  //Save Meal Plan
  private removeCardApi(cardId: any) {
    const params = {
      "card_id": cardId,
    }
    this.props.removeCard({ params: params, token: this.props.token })
  }

  private addPayment() {
    if (this.isFromSetting) {
      this.props.navigation.navigate('PaymentCard')
    }
    else {
      this.props.navigation.navigate('PaymentCard', { id: this.props.navigation.state.params.id, type: this.props.navigation.state.params.type, amount: this.props.navigation.state.params.amount })
    }
  }

  onCellTap(cardId: any) {
    this.cardId = cardId;
    if (this.isFromSetting) {
      this.ref.show()
    }
    else {
      this.purchaseCard();
    }
  }

  //Remove action
  private removeCard() {
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'NO',
          onPress: () => { }
        },
        {
          text: 'YES',
          onPress: () => this.removeCardApi(this.cardId),
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  }

  //Purchase action
  private purchaseCard() {
    Alert.alert(
      'Do you want to proceed with the payment?',
      '',
      [
        {
          text: 'NO',
          onPress: () => { }
        },
        {
          text: 'YES',
          onPress: () => this.savePlan(this.cardId),
        }
      ],
      { cancelable: false }
    );
  }

  //Google Payment Setup
  googlePay = async () => {

    // const requestData: any = {
    //   cardPaymentMethod: {
    //     tokenizationSpecification: {
    //       type: 'PAYMENT_GATEWAY',
    //       gateway: 'stripe',
    //       gatewayMerchantId: 'sk_test_51HlYRRADzkt2w4Qoxg19k6F8oVxk9HV2CnN1kCRocOtZSTT6mbnMCeU3X8ibRLlI3IvAg2pYFajk3CrHNQcAC8ux00hEIjKdqO',
    //       stripe: {
    //         publishableKey: 'pk_test_51HlYRRADzkt2w4QoMkCAlJZOB5l0AzIJM8MzZkU4PxVcNKSg43bzYicAJRBn2a1ds3m5IjijDh1CCZezRL6ejx8b00xaVV1wzc',
    //         version: '2018-11-08',
    //       },
    //     },
    //     allowedCardNetworks: ['VISA', 'MASTERCARD'],
    //     allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    //   },
    //   transaction: {
    //     totalPrice: '10',
    //     totalPriceStatus: 'FINAL',
    //     currencyCode: 'USD',
    //   },
    //   merchantName: 'Example Merchant',
    // };

    // GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

    // // Check if Google Pay is available
    // GooglePay.isReadyToPay(['VISA', 'MASTERCARD'], ['PAN_ONLY', 'CRYPTOGRAM_3DS'])
    //   .then((ready) => {
    //     if (ready) {
    //       // Request payment token
    //       GooglePay.requestPayment(requestData)
    //         .then((token: string) => {
    //           console.log('TOKEN: ', token)
    //           // Send a token to your payment gateway
    //         })
    //         .catch((error) => console.log(error.code, error.message));
    //     }
    //   })
    if (Platform.OS === 'ios') {
      Toast.show('This device not support google payment')
    }
    else {


      try {
        //  let device=await stripe.deviceSupportsAndroidPay()
        //  console.log('<<device>>',device)
        const type = stripe.setOptions({
          publishableKey: 'pk_test_51HmYhhJfXgRZXtM1ulNcwYh3ug3oKUrvWgUl6LYHkFMmHJQOsZvmyqGltxuGnR6SvIX2e8azVINiwmdCWkY6HTQw00V5OeajyO',
          androidPayMode: 'test',
        })

        const token = await stripe.paymentRequestWithAndroidPay({
          total_price: '1.00',
          currency_code: 'USD',
          shipping_address_required: false,
          billing_address_required: true,
          shipping_countries: ["US", "CA"],
          line_items: [{
            currency_code: 'USD',
            description: 'Whisky',
            total_price: '1.00',
            unit_price: '1.00',
            quantity: '1',
          }, {
            currency_code: 'USD',
            description: 'Vine',
            total_price: '1.00',
            unit_price: '1.00',
            quantity: '1',
          }],
        })
        console.log('<<device>>', token)
      }
      catch (error) {
        console.error(error);
      }
    }

    // Alert.alert('here')
  }


  //Apple Payment method

  applePay = async (): Promise<void> => {
    if (Platform.OS === 'ios') {
      try {

        this.setState({
          loading: true,
          status: null,
          token: null,
        })
        const support = await stripe.deviceSupportsApplePay()
        console.log("support", support)

        const type = stripe.setOptions({
          publishableKey: 'pk_test_51HmYhhJfXgRZXtM1ulNcwYh3ug3oKUrvWgUl6LYHkFMmHJQOsZvmyqGltxuGnR6SvIX2e8azVINiwmdCWkY6HTQw00V5OeajyO',
          merchantId: 'merchant.com.infinite.com',
        })

        const items = [{
          label: 'Whisky',
          amount: '1.00',
        }, {
          label: 'Tipsi, Inc',
          amount: '1.00',
        }]

        const shippingMethods = [{
          id: 'fedex',
          label: 'FedEX',
          detail: 'Test @ 10',
          amount: '1.00',
        }]

        const options = {
          requiredBillingAddressFields: ['all'],
          requiredShippingAddressFields: ['phone', 'postal_address'],
          shippingMethods,
        }
        const token = await stripe.paymentRequestWithApplePay(items, options)
        stripe.completeApplePayRequest()
        console.log("token", token)

      } catch (error) {
        this.setState({ loading: false, status: `Error: ${error.message}` })
        console.error("error", error)
      }

    } else {
      Toast.show('This device not support apple payment')
    }


  }


  render() {
    let screenWidth = Dimensions.get('screen').width;

    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Payment Mode'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Modal visible={this.state.showPopup} transparent={true}>
          <PaymentPopup onPress={() => this.mealResponse()} />
        </Modal>
        <ActionSheet
          ref={o => this.ref = o}
          title={''}
          options={['Delete', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => {
            switch (index) {
              case 0:
                this.removeCard()
                break;

              case 1:
                this.cardId = ''
                break;

              default:
                break;
            }
          }}
        />
        <ScrollView scrollEnabled={this.state.cardsList.length == 0 ? false : true} style={styles.scrollVw} contentContainerStyle={{ flex: this.state.cardsList.length == 0 ? 1 : 0 }}>
          {/* <TouchableOpacity style={styles.paymentBtn} onPress={() => this.applePay()}> */}
          <TouchableOpacity style={styles.paymentBtn} onPress={() => this.applePay()}>
            <Image source={Images.APPLE_PAY} style={styles.paymentImg} />
            <Text style={styles.paymentTxt}>{'Apple Pay'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBtn} onPress={() => this.googlePay()}>
            <Image source={Images.GOOGLE_PAY} style={styles.paymentImg} />
            <Text style={styles.paymentTxt}>{'Google Pay'}</Text>
          </TouchableOpacity>
          {
            this.state.cardsList.length == 0 && !this.state.isFirstTime ?
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.noCardTxt}>{'No card found'}</Text>
              </View>
              :
              <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.topMenuTbl}
                data={this.state.cardsList}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.card}
              />
          }
          <RedButton title={'Add Card'} onPress={() => this.addPayment()} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    cardsList: state.loginReducer.paymentData.cards,
    token: state.loginReducer.userInfo.loginData.token,
    planResponse: state.loginReducer.paymentData.planPurchased,
    removeStatus: state.loginReducer.paymentData.cardRemove,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getCards: (data: any) => dispatch(getCards(data)),
    startPlan: (data: any) => dispatch(purchasePlan(data)),
    changeStatus: (data: any) => dispatch(purchasePlanResp(false)),
    saveId: (data: any) => dispatch(saveLoginInfo(data)),
    removeCard: (data: any) => dispatch(removeCard(data)),
    changeRemoveStatus: (data: any) => dispatch(removeCardResp(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMode);
