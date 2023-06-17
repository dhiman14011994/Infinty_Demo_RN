import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, BackHandler } from 'react-native';
import { styles } from './styles';
import NavigationHeader from "../../Components/Header";
import { NavigationScreenProp } from 'react-navigation';
import RedButton from '../../Components/RedButton';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class Messages extends Component<Props, object> {

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
            title={'Messages'}
            isMultiple={false}
            leftBtnActn={() => this.props.navigation.goBack()}
            btnImage={Images.BACK}
          />
          <View style={styles.txtCntnr}>
            <Image source={Images.NO_MESSAGE} style={styles.noMessageImg} />
            <Text style={styles.noMsgTxt}>{'No Messages!'}</Text>
            <Text style={styles.titleTxt}>{'Get a plan and start talking to Coach and Nutritionist'}</Text>
          </View>
          <View style={styles.btnVw}>
            <RedButton title={'Get a Plan! NOW!'} onPress={() => this.props.navigation.navigate('MessagePlans')} />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}