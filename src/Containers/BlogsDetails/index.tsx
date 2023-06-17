
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, Dimensions, Alert, Modal } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { getBlogDetails } from '../../Redux/Actions/BlogsActions';
import { Blogs } from '../../Modals/BlogsModl';
//@ts-ignore
import HTML from 'react-native-render-html';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';
import VideoPlayer from '../../Components/VideoPlayer';
//@ts-ignore
import Tags from "react-native-tags";

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getBlogDetails: any,
  blogDetails: Blogs,
  token: string,
}

class BlogsDetails extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    playVideo: false,
  }

  videoUrl = this.props.blogDetails == undefined ? '' : this.props.blogDetails.video_url;

  componentDidMount() {
    this.getBlogData();
  }

  //Fetching blogs
  getBlogData() {
    const params = {
      "table": "blogs",
      "model": "Blog",
      "id": this.props.navigation.state.params.id,
    }
    this.props.getBlogDetails({ params: params, token: this.props.token })
  }


  render() {
    let width = Dimensions.get('screen').width - styles.totalPadding;
    console.log('DAYA: ', this.props.blogDetails)
    return (
      <View style={styles.mainVw}>
        <Modal visible={this.state.playVideo} transparent={false}>
          <VideoPlayer videoId={this.videoUrl} onCross={() => this.setState({ playVideo: false })} />
        </Modal>
        <SafeAreaView>
          <View style={styles.topNavVw}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
              <Image style={styles.commonImg} source={Images.BACK} />
            </TouchableOpacity>
          </View>
          {
            this.props.blogDetails == undefined ? null :
              <View style={styles.bannerVw}>
                <RKImageLoder style={styles.bannerImg} src={this.props.blogDetails.image} tempImg={Images.PLACEHOLDER} />
                <View style={[styles.opqVw, { opacity: 0.2 }]} />
                {
                  this.props.blogDetails.video_url == '' ? null :
                    <Image source={Images.PLAY_BIG} style={styles.playImg} />
                }
              </View>
          }
          {
            this.props.blogDetails == undefined ? null :
              <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsVw}>
                <TouchableOpacity onPress={() => this.setState({ playVideo: this.props.blogDetails.video_url == '' ? false : true })} activeOpacity={0.8} style={{ alignItems: 'center', justifyContent: 'center', height: 160, width: '100%',}} />
                <View style={styles.allDataCntnr}>
                  <View style={styles.likeTitleVw}>
                    <Text style={styles.titleTxt}>{this.props.blogDetails.title}</Text>
                  </View>
                  <Text style={styles.subHeadTxt}>{this.props.blogDetails.sub_title}</Text>
                  <Tags
                    initialTags={this.props.blogDetails.tags}
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
                  {/* 
                  <View style={styles.userInfoVw}>
                    <Image style={styles.userImg} source={require('../../Assets/dummyPic.png')} />
                    <Text style={styles.nameTxt} >{'Eric Woodall'}</Text>
                    <Text style={styles.timeTxt} >{'15 May'}</Text>
                    <View style={styles.dotVw} />
                    <Text style={styles.timeTxt}>{'4 min read'}</Text>
                  </View> 
                  */}
                  <View style={styles.htmlCntnr}>
                    <HTML ignoredStyles={['font-size', 'font-family', 'width']} imagesMaxWidth={width} baseFontStyle={styles.infoTxt} html={this.props.blogDetails.description} />
                  </View>
                </View>
                <View style={styles.paddingView} />
              </ScrollView>
          }
        </SafeAreaView>
      </View >
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    blogDetails: state.loginReducer.blogsData.blogDetail,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getBlogDetails: (data: any) => dispatch(getBlogDetails(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsDetails);