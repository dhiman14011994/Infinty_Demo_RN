import React, { Component } from 'react';
import { SafeAreaView, View, Text, } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Images from '../../Utils/ImageGenerator';
import color from '../../Constants/Colors';

interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class Consultation extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    index: -1,
    isDisabled: true,
  }

  duration = [
    {
      time: '20 Min Session',
      price: '$30',
      amount: 30,
    },
    {
      time: '40 Min Session',
      price: '$40',
      amount: 40,
    },
    {
      time: '60 Min Session',
      price: '$50',
      amount: 50,
    },
  ];

  componentDidMount() {
  }

  componentWillReceiveProps(props: any) {
  }

  //Creating workouts here
  private card = (data: any) => {
    return (
      <TouchableOpacity style={[styles.cardVw, { borderWidth: 2, borderColor: data.index == this.state.index ? color.APP_PINK_COLOR : color.APP_LIGHT_BG_COLOR }]} onPress={() => this.onCellTap(data.index)} activeOpacity={0.8}>
        <Text style={styles.timeTxt}>{data.item.time}</Text>
        <Text style={styles.priceTxt}>{data.item.price}</Text>
      </TouchableOpacity>
    )
  }

  onCellTap(index: any) {
    this.setState({ index: index, isDisabled: false });
  }

  render() {

    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Consultation'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <View style={styles.dataVw}>
          <Text style={styles.titleTxt}>{'Select Consultation Duration'}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.duration}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={this.card}
          />
          <RedButton title={'Confirm'} onPress={() => this.props.navigation.navigate('PaymentMode', {type: 2, amount: this.duration[this.state.index].amount })} isDisable={this.state.isDisabled} />
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    // getCards: (data: any) => dispatch(getCards(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Consultation);
