import React, { Component } from 'react';
import { SafeAreaView, FlatList, BackHandler } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp, } from 'react-navigation';
import { styles } from './styles';
import TransactionCell from '../../Cells/TransactionCell';
import { connect } from 'react-redux';
import { getTransaction } from '../../Redux/Actions/CommonActions';
import { TransactionModl } from '../../Modals/CommonModl';
import Images from '../../Utils/ImageGenerator';


interface Props {
  navigation: NavigationScreenProp<any, any>,
  getTransactions: any,
  transactions: TransactionModl[],
  token: any,
}

class Transactions extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  componentDidMount() {
    this.props.getTransactions({ token: this.props.token })
  }

  //Creating workouts here
  private transactions = (data: any) => {
    let endPoint = `id=${data.item.id}&plan_type=${data.item.plan_type}`
    return (
      <TransactionCell data={data.item} onPress={() => this.props.navigation.navigate('TransactionDetail', { endPoint: endPoint })} />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>        
        <NavigationHeader
          title={'Transactions'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.tblVw}
          data={this.props.transactions}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={this.transactions}
        />
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    transactions: state.loginReducer.commonData.transactions,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getTransactions: (data: any) => dispatch(getTransaction(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);