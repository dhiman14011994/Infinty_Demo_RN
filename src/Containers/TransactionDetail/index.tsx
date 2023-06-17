import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import NavigationHeader from '../../Components/Header';
import {NavigationScreenProp} from 'react-navigation';
import {styles} from './styles';
import {connect} from 'react-redux';
import {getTransactionDtls} from '../../Redux/Actions/CommonActions';
import {TransactionDtlsModl} from '../../Modals/CommonModl';
import Moment from 'moment';
import Images from '../../Utils/ImageGenerator';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  getTransactionDtls: any;
  transaction: TransactionDtlsModl;
  token: any;
}

class TransactionDetail extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  componentDidMount() {
    this.props.getTransactionDtls({
      token: this.props.token,
      endPoint: this.props.navigation.state.params.endPoint,
    });
  }

  render() {
    let data: TransactionDtlsModl = this.props.transaction;
    return (
      <SafeAreaView style={styles.mainVw}>       
         <NavigationHeader
          title={'Transactions Details'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        {data == undefined ? null : (
          <View style={styles.cntnrVw}>
            <View style={styles.marginVw} />
            <View style={styles.commonVw}>
              <Text style={styles.planTxt}>{data.title}</Text>
              <Text style={styles.amountTxt}>
                {'$' + data.transaction_amount}
              </Text>
            </View>
            <View style={styles.sepVw} />
            <View style={styles.commonVw}>
              <Text style={styles.commonLeftTxt}>{'Duration:'}</Text>
              <Text style={styles.commonRightTxt}>{data.duration}</Text>
            </View>
            <View style={styles.commonVw}>
              <Text style={styles.commonLeftTxt}>{'Order ID:'}</Text>
              <Text style={styles.commonRightTxt}>{data.order_id}</Text>
            </View>
            <View style={styles.commonVw}>
              <Text style={styles.commonLeftTxt}>{'Order Date:'}</Text>
              <Text style={styles.commonRightTxt}>
                {Moment(data.created_at).format('DD MMMM yyyy')}
              </Text>
            </View>
            <View style={styles.commonVw}>
              <Text style={styles.commonLeftTxt}>{'Plan Ends On:'}</Text>
              <Text style={styles.commonRightTxt}>
                {Moment(data.end_date).format('DD MMMM yyyy')}
              </Text>
            </View>
            <View style={styles.sepVw} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    transaction: state.loginReducer.commonData.transaction,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getTransactionDtls: (data: any) => dispatch(getTransactionDtls(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
