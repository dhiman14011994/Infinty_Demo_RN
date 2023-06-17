
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, FlatList, BackHandler, Alert, StyleSheet, ImageStore } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import Tags from "react-native-tags";
import TrendingReadsCell from '../../Cells/TrendingReadsCell';
import { connect } from 'react-redux';
import blogsKeys from '../../Redux/Constants/BlogsKeys';
import { getSimilarBlogDetails, addBlogLike, getBlogLike } from '../../Redux/Actions/BlogsActions';
import { Blogs } from '../../Modals/BlogsModl';
//@ts-ignore
import HTML from 'react-native-render-html';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getBlogDetails: any,
  blogDetails: Blogs,
  token: string,
  getLike: any,
  isLiked: any,
  addLike: any,
}

class BlogsTrendSimilarDtls extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  favImg = require('../../Assets/heart.png');
  unFavImg = require('../../Assets/blank-heart.png');

  componentDidMount() {
    this.getBlogLike();
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

  //Fetching blogs
  getBlogLike() {
    const params = {
      "post_type": "blog",
      "post_id": this.props.navigation.state.params.id,
    }
    this.props.getLike({ params: params, token: this.props.token })
  }

  addLike() {
    const params = {
      "post_id": this.props.navigation.state.params.id,
      "post_type": "blog"
    }
    this.props.addLike({ params: params, token: this.props.token })
  }

  render() {
    return (
      // <AddQtyPopup />
      <SafeAreaView style={styles.mainVw}>
        {
          this.props.blogDetails == undefined ? null :
            <View>
              <RKImageLoder style={styles.bannerImg} src={this.props.blogDetails.image} tempImg={Images.PLACEHOLDER} />
              <View style={[styles.opqVw, { opacity: 0.2 }]} />
            </View>
        }
        <View style={styles.topNavVw}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
            <Image style={styles.commonImg} source={require('../../Assets/backWhite.png')} />
          </TouchableOpacity>
        </View>
        {
          this.props.blogDetails == undefined ? null :
            <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsVw}>
              <View style={styles.allDataCntnr}>
                <View style={styles.likeTitleVw}>
                  <Text style={styles.titleTxt}>{this.props.blogDetails.title}</Text>
                  <TouchableOpacity style={styles.favBtn} activeOpacity={0.8} onPress={() => this.addLike()}>
                    <Image style={styles.favImg} source={this.props.isLiked == 1 ? this.favImg : this.unFavImg} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.subHeadTxt}>{this.props.blogDetails.sub_title}</Text>
                <Tags
                  initialTags={this.props.blogDetails.tags}
                  inputContainerStyle={{ height: 0 }}
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
                <View style={styles.htmlCntnr}>
                  <HTML ignoredStyles={['font-size', 'font-family', 'width']} baseFontStyle={styles.infoTxt} html={this.props.blogDetails.description} />
                </View>
              </View>
              <View style={styles.paddingView} />
            </ScrollView>
        }
      </SafeAreaView >
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    blogDetails: state.loginReducer.blogsData.similarBlogDtl,
    isLiked: state.loginReducer.blogsData.isLiked,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getBlogDetails: (data: any) => dispatch(getSimilarBlogDetails(data)),
    addLike: (data: any) => dispatch(addBlogLike(data)),
    getLike: (data: any) => dispatch(getBlogLike(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsTrendSimilarDtls);