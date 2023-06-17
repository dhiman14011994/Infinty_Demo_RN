import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from './styles';
import SettingsCell from '../../Cells/SettingsCell';
import settingsData from './SettingConstants';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp } from 'react-navigation';
import { redeemApi } from '../../Redux/ReduxAPIHandler/CommonApi';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { saveLoginInfo } from '../../Redux/Actions/LoginActions';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  token: string;
  saveToken: any;
}

class Settings extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  //Will create a custom cell with data and return it to flatlist
  private renderCell = (item: any, index: any) => {
    return <SettingsCell item={item} onpress={() => this.handleTap(index)} />;
  };

  //Cell tap handling
  private handleTap(index: any) {
    switch (index) {
      case 0:
        this.props.navigation.navigate('ChangePwdHome', { type: 1 });
        break;

      case 1:
        this.props.navigation.navigate('PaymentMode', { type: '' });
        break;

      case 2:
        this.props.navigation.navigate('Transactions');
        break;

      case 3:
        this.props.navigation.navigate('HelpTerms', { type: 1 });
        break;

      default:
        break;
    }
  }

  //Delete action
  private deleteBtn() {
    Alert.alert(
      'Are you sure!',
      'All your account data including active packages will be deleted. Are you sure you want to Delete your account?',
      [
        {
          text: 'NO',
          onPress: () => { },
        },
        {
          text: 'YES',
          style: 'destructive',
          onPress: () => this.deleteAccount(),
        },
      ],
      { cancelable: false },
    );
  }

  async deleteAccount() {
    await redeemApi(this.props.token);
    try {
      await AsyncStorage.setItem('loginData', '');
      this.props.saveToken({ success: { token: '' } });
      this.props.navigation.navigate('Login');
    } catch (error) {
      Alert.alert(error);
    }
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Settings'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Image source={require('../../Assets/bg.png')} style={styles.bgImg} />
        <ScrollView style={styles.scrollVw}>
          {settingsData.map((data: any, index: any) =>
            this.renderCell(data, index),
          )}
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => this.deleteBtn()}
            activeOpacity={0.8}>
            <Text style={styles.deletetTxt}>{'Delete Account'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    saveToken: (data: any) => dispatch(saveLoginInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
