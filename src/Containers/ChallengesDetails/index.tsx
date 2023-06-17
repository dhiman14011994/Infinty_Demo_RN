
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, FlatList, Alert, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import RKImageLoder from '../../Utils/RKImageLoder';
import { GuideModl } from '../../Modals/GuidesModl';
import Images from '../../Utils/ImageGenerator';
import ImagePicker from 'react-native-image-crop-picker';
import { ShareDialog } from 'react-native-fbsdk';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

class ChallengesDetails extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  componentDidMount() {
  }

  uploadVideo = () => {
    this.shareLinkWithShareDialog();
    // ImagePicker.openPicker({
    //   multiple: false,
    //   // cropping: true,
    //   mediaType: "video",
    // }).then(images => {
    //   // this.compressImage(images, images.mime)
    // });
  }


  // Share the link using the share dialog.
  shareLinkWithShareDialog() {
    var tmp: any = this;

    let shareLinkContent: any = {
      contentType: 'link',
      contentUrl: "https://facebook.com",
      contentDescription: 'Wow, check out this great site!',
    }

    ShareDialog.canShow(shareLinkContent).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function (error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalPadding;
    return (
      // <AddQtyPopup />
      <View style={styles.mainVw}>
        <View>
          <RKImageLoder style={styles.bannerImg} src={''} tempImg={Images.PLACEHOLDER} />
          <View style={[styles.opqVw, { opacity: 0.2 }]} />
        </View>
        <SafeAreaView style={{ flex: 1, }}>
          <View style={styles.topNavVw}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
              <Image style={styles.commonImg} source={require('../Challenges/Assets/left_arrow.png')} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsVw}>
            <View style={styles.allDataCntnr}>
              <View style={styles.likeTitleVw}>
                <Text style={styles.titleTxt}>{'50 Pushups for 30 Days'}</Text>
              </View>
              <View style={styles.userInfoVw}>
                <Text style={styles.titleText} >{'INSTRUCTIONS'}</Text>
                <Text style={styles.stepTxt}>{'Step 1'}</Text>
                <Text style={styles.detailTxt}>{'When it comes to cooking there are few tools that are more versatile in the kitchen than the microwave. This device offers so many functions when it comes to cooking that most people never bother to utilize. It’s sad really.'}</Text>
                <Text style={styles.stepTxt}>{'Step 2'}</Text>
                <Text style={styles.detailTxt}>{'When it comes to cooking there are few tools that are more versatile in the kitchen than the microwave. This device offers so many'}</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={() => this.uploadVideo()} activeOpacity={0.8}>
                  <Text style={styles.uploadText}>{this.props.navigation.state.params.id == 1 ? "Participate" : "Upload Video"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inviteButton}>
                  <Text style={styles.uploadText}>Invite Friends</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View >
    )
  }
}



export default ChallengesDetails;