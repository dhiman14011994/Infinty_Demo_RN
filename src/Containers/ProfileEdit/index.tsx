import React, { Component } from 'react';
import { SafeAreaView, Image, ScrollView, Text, View, Modal, Picker, Alert, Dimensions } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RedButton from '../../Components/RedButton';
import { UserInfo } from '../../Modals/LoginModl';
import { connect } from 'react-redux';
import { saveLoginInfo, getUserInfo, updateUserInfo, saveUserResp } from '../../Redux/Actions/LoginActions';
import { updateUserImage } from '../../Redux/ReduxAPIHandler/CommonApi';
import ImageResizer from 'react-native-image-resizer';
import Moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import RKImageLoder from '../../Utils/RKImageLoder';
import { apiStart } from '../../Redux/Actions/CommonActions';
import { commonKeys } from '../../Redux/Constants/CommonKeys';
import ImagePicker from 'react-native-image-crop-picker';
import Images from '../../Utils/ImageGenerator';
import ActionSheet from 'react-native-actionsheet'

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: any,
  getUserProfile: any,
  userProfile: UserInfo,
  saveUserData: any,
  apiStart: any,
  apiStop: any,
  status: boolean,
  updateStatus: any,
}

class EditProfile extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    name: '',
    email: '',
    mobile: '',
    showCropper: false,
    imageData: undefined as any,
    cropperParams: {},
    croppedImage: '',
  }

  sheetRef: any;

  componentDidMount() {
    this.props.getUserProfile({ token: this.props.token })
  }

  componentWillReceiveProps(props: any) {
    if (props.userProfile != undefined) {
      this.setState({
        name: props.userProfile.name,
        email: props.userProfile.email,
        mobile: props.userProfile.mobile,
      })
    }
    if (props.status) {
      this.props.updateStatus(false);
      this.props.navigation.goBack();
    }
  }

  updateLogo = () => {
    this.sheetRef.show();
  }

  takeImage(isCamera: boolean) {
    if (isCamera) {
      ImagePicker.openCamera({
        multiple: false,
        cropping: true,
      }).then(images => {
        this.compressImage(images, images.mime)
      });
    }
    else {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
      }).then(images => {
        this.compressImage(images, images.mime)
      });
    }    
  }

  /**
   * @function <compressImage> is used for compressing the image
   */
  async compressImage(response: any, type: any) {
    this.props.apiStart();
    let height = response.height;
    let width = response.width;
    while (height > 800) {
      height = height - 100;
    }
    while (width > 800) {
      width = width - 100;
    }
    ImageResizer.createResizedImage(response.path, width, height, 'JPEG', 30).then((resp) => {
      console.log('compressed response = ', response);
      this.saveProfilIemage(resp.path, type)
    }).catch((err) => {
      this.props.apiStop();
    });
  }

  async saveProfilIemage(uri: any, type: any) {
    let name = Moment(Date()).format('X');
    let params = [{
      name: 'file',
      filename: name + '.' + type.split('/')[1],
      data: RNFetchBlob.wrap(uri)
    }];
    await updateUserImage(this.props.token, params);
    this.props.getUserProfile({ token: this.props.token })
    this.props.apiStop();
  }

  //Fetching Saving UserInfo
  private saveUserInfoData() {
    const params = {
      "name": this.state.name,
    }
    this.props.saveUserData({ params: params, token: this.props.token, isSingle: false, isEdit: true })
  }

  onSelectGender(item: any) {
    this.setState({ gender: item })
  }

  renderFeildVw(title: string, value: string, type: number, editable: boolean) {
    return (
      <View style={styles.feildCntnr}>
        <Text style={styles.feildTitleTxt}>{title}</Text>
        <View style={[styles.feildVw, { borderBottomWidth: 2 }]}>
          <TextInput style={styles.feildTxt} value={value} onChangeText={(text: string) => this.handleText(text, type)} editable={editable} />
          {
            editable ?
              <Image source={Images.EDIT} style={styles.editImg} />
              : null
          }
        </View>
      </View>
    )
  }

  handleText(text: string, type: number) {
    switch (type) {
      case 1:
        this.setState({name: text})
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Edit Profile'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <ActionSheet
          ref={o => this.sheetRef = o}
          title={'Select Image'}
          options={['Take Photo', 'Choose from Library', 'cancel']}
          cancelButtonIndex={2}
          onPress={(index) => this.takeImage(index == 0 ? true : false)}
        />
        {
          this.props.userProfile == undefined ? null :
            <ScrollView style={styles.scrollVw}>
              <View style={styles.imageVw}>
                <RKImageLoder
                  style={styles.profileImg}
                  src={this.props.userProfile.image}
                  tempImg={require('../../Assets/dummy.png')}
                />
                <TouchableOpacity style={styles.prifileBtn} onPress={() => this.updateLogo()} activeOpacity={0.8}>
                  <Text style={styles.changeProfileTxt}>{'Upload Photo'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.txtVwCntnr}>
                {
                  this.renderFeildVw('NAME', this.state.name, 1, true)
                }
                {
                  this.renderFeildVw('EMAIL', this.state.email, 2, false)
                }
                {
                  this.renderFeildVw('PHONE NUMBER', this.state.mobile, 3, false)
                }
                <RedButton lowMargin={true} title={'Confirm'} onPress={() => this.saveUserInfoData()} />
              </View>
            </ScrollView>
        }
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
    status: state.loginReducer.userInfo.userInfoStatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUserProfile: (data: any) => dispatch(getUserInfo(data)),
    saveToken: (data: any) => dispatch(saveLoginInfo(data)),
    saveUserData: (data: any) => dispatch(updateUserInfo(data)),
    apiStart: () => dispatch(apiStart()),
    apiStop: () => dispatch({ type: commonKeys.API_SUCCESS }),
    updateStatus: () => dispatch(saveUserResp(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);