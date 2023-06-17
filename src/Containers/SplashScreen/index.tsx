import React, { Component } from 'react';
import { Alert, Animated, Image, View } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import Images from '../../Utils/ImageGenerator';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { saveLoginInfo } from '../../Redux/Actions/LoginActions';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  saveToken: any,
}

class SplashScreen extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    opacity: new Animated.Value(0),
  };

  isCurrentView = false;

  componentDidMount() {
    this.props.navigation.addListener('willBlur', (event: any) => {
      if (event.lastState.routeName == 'SplashScreen') {
        this.isCurrentView = false;
      }
    });
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'SplashScreen') {
        this.isCurrentView = true;
        this.checkUserSession();
      }
    });
  }

  //This function will check and logged in user if info available
  private checkUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem('loginData');
      if (value !== null && value != '') {
        setTimeout(() => {
          this.props.saveToken({ success: JSON.parse(value) });
          this.isCurrentView = false;
          this.props.navigation.navigate('Home');
        }, 2000);
      }
      else {
        setTimeout(async () => {
          const value = await AsyncStorage.getItem('isIntro');
          if (value !== null && value != '' && value == '1') {
            this.props.navigation.navigate('Login')
          }
          else {
            this.props.navigation.navigate('Intro')
          }
        }, 2000);
      }
    } catch (error) {
      Alert.alert(error)
    }
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={Images.SPLASH_BG} style={styles.bgImg} />
        {/* <Image source={Images.LOGO} style={styles.logo} /> */}
        <Animated.Image
          source={Images.LOGO}
          onLoad={this.onLoad}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 1],
                  }),
                },
              ],
            },
            styles.logo,
          ]}
        />
      </View>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    loginResponse: state.loginReducer.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    saveToken: (data: any) => dispatch(saveLoginInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);