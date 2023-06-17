import React, { Component } from "react";
import NavigationHeader from "../../Components/Header";
import { SafeAreaView, Image, Text, TextInput, View, Share, Alert, Clipboard } from "react-native";
import { styles } from "./styles";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import Images from '../../Utils/ImageGenerator';
import RedButton from "../../Components/RedButton";
import Toast from 'react-native-simple-toast';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

class InviteFriend extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  async shareLink() {
    try {
      const result = await Share.share({
        message:
          'GP2440SH',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }


  copyText = async () => {
    Clipboard.setString('GP2440SH')
    Toast.show('Code copied to clipboard.');
  }


  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Invite Friends'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <Image source={Images.GROUP} style={styles.bgImg} />
        <View style={styles.shareVw}>
          <Text style={styles.yourCodeTxt}>{'Your friends to join Infinite Athlete Family, please click on invite to spread the word.'}</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn} onPress={() => this.shareLink()} activeOpacity={0.8}>
          <Text style={styles.codeText}>{'Invite Friends'}</Text>
          <Image source={Images.SHARE} style={styles.shareImg} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.pwdData,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);