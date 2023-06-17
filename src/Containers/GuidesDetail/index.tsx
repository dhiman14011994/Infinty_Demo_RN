
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, FlatList, Alert, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import Tags from "react-native-tags";
import Images from '../../Utils/ImageGenerator';
import { connect } from 'react-redux';
//@ts-ignore
import HTML from 'react-native-render-html';
import RKImageLoder from '../../Utils/RKImageLoder';
import RNFetchBlob from 'rn-fetch-blob'
import FileViewer from 'react-native-file-viewer';
import Toast from 'react-native-simple-toast';
import { GuideModl } from '../../Modals/GuidesModl';
import { getGuidesDtls } from '../../Redux/ReduxAPIHandler/GuidesApi';
import RedButton from '../../Components/RedButton';


export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class GuidesDetail extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    dtls: undefined as any as GuideModl,
  }

  componentDidMount() {
    this.getDtls();
  }

  async requestStoragePermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'RBT',
            message:
              'RBT App needs access to your storage.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      } catch (err) {
      }
    }
  }

  //Function to download the files for noth iOS/Android
  //Will Check for android permission here, in case if not granted.
  //In iPhone files will will be save under FIles app and in Android it'll under download folder.
  async downloadFile(dirs: any, data: any) {
    Toast.show('Downloading is in progress.');
    this.setState({ showLoader: true })
    RNFetchBlob.config({
      path: dirs,
      fileCache: true,
    })
      .fetch('GET', data, {})
      .then((res: any) => {
        let status = res.info().status;
        if (status == 200) {
          setTimeout(() => {
            this.openFolder(dirs)
          }, 50);
        } else {
          setTimeout(() => {
            Alert.alert('Failed to downloaded the file.')
          }, 20)
        }
        this.setState({ showLoader: false })
      })
      .catch((errorMessage: any) => {
        setTimeout(() => {
          Alert.alert('Failed to downloaded the file: ')
        }, 20)
        this.setState({ showLoader: false })
      })
  }

  openFolder(path: any) {
    setTimeout(() => {
      FileViewer.open(path)
        .then((res: any) => {
        })
        .catch(error => {
        });
    }, 200);
  }

  async checkForDownload() {

    let arr: any[] = this.state.dtls.pdf.split('/');
    let data = arr[arr.length - 1];
    let url = this.state.dtls.pdf;

    let dirs: any = RNFetchBlob.fs.dirs
    if (Platform.OS === 'ios') {
      dirs = dirs.DocumentDir + '/' + data
    }
    else {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted) {
      }
      else {
        this.requestStoragePermission()
        return
      }
      dirs = dirs.DownloadDir + '/' + data
    }

    RNFetchBlob.fs.exists(dirs)
      .then((exist) => {
        if (exist) {
          this.openFolder(dirs)
        }
        else {
          this.downloadFile(dirs, url)
        }
      }).catch((err) => {
        this.downloadFile(dirs, url)
      })
  }

  // Fetching Guide Dtls
  async getDtls() {
    const params = {
      "table": "guides",
      "model": "Guide",
      "id": this.props.navigation.state.params.id,
    }
    let data = await getGuidesDtls(params, this.props.token);
    this.setState({dtls: data})
  }


  render() {
    let width = Dimensions.get('screen').width - styles.totalPadding;
    return (
      // <AddQtyPopup />
      <View style={styles.mainVw}>
        {
          this.state.dtls == undefined ? null :
            <View>
              <RKImageLoder style={styles.bannerImg} src={this.state.dtls.image} tempImg={Images.PLACEHOLDER} />
              <View style={[styles.opqVw, { opacity: 0.2 }]} />
            </View>
        }
        {
          this.state.dtls == undefined ? null :
            <SafeAreaView style={{ flex: 1, }}>
              <View style={styles.topNavVw}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
                  <Image style={styles.commonImg} source={Images.BACK} />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsVw}>
                <View style={styles.allDataCntnr}>
                  <View style={styles.likeTitleVw}>
                    <Text style={styles.titleTxt}>{this.state.dtls.title}</Text>
                    {/* <TouchableOpacity style={styles.favBtn} activeOpacity={0.8} onPress={() => this.addLike()}>
                <Image style={styles.favImg} source={require('../../Assets/heart.png')} />
              </TouchableOpacity> */}
                  </View>
                  <Text style={styles.subHeadTxt}>{this.state.dtls.sub_title}</Text>
                  <Tags
                    initialTags={this.state.dtls.tags}
                    inputContainerStyle={{ height: 0, }}
                    inputStyle={{ height: 0 }}
                    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }: any) => (
                      // <TouchableOpacity style={styles.tagVw} key={`${tag}-${index}`} onPress={onPress}>
                      //   <Text style={styles.tagTxt}>{tag}</Text>
                      // </TouchableOpacity>
                      <View style={styles.tagVw}>
                        <Text style={styles.tagTxt}>{tag}</Text>
                      </View>
                    )}
                  />
                  {/* <View style={styles.userInfoVw}>
                    <Image style={styles.userImg} source={require('../../Assets/dummyPic.png')} />
                    <Text style={styles.nameTxt} >{'Eric Woodall'}</Text>
                    <Text style={styles.timeTxt} >{'15 May'}</Text>
                    <View style={styles.dotVw} />
                    <Text style={styles.timeTxt}>{'4 min read'}</Text>
                  </View> */}
                  <View style={styles.htmlCntnr}>
                    <HTML ignoredStyles={['font-size', 'font-weight', 'font-family', 'width']} imagesMaxWidth={width} baseFontStyle={styles.infoTxt} html={this.state.dtls.description} />
                  </View>
                  <TouchableOpacity style={styles.openBtn} onPress={() => this.checkForDownload()}>
                    <Text style={styles.openTxt}>{'Open in PDF Viewer'}</Text>
                  </TouchableOpacity>
                  <RedButton title={'Download Guide PDF'} onPress={() => this.checkForDownload()} lowMargin={true} />               
                </View>
              </ScrollView>
            </SafeAreaView>
        }
      </View >
    )
  }
}

function mapStateToProps(state: any) {
  return {
    guides: state.loginReducer.guidesData.similarGuides,
    token: state.loginReducer.userInfo.loginData.token,
    dtls: state.loginReducer.guidesData.guidesDtls,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    // getGuides: (data: any) => dispatch(getSimilarGuideList(data)),
    // getDtls: (data: any) => dispatch(getGuideDtls(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuidesDetail);