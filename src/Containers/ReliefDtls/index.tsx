
import React, { Component } from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text, View, ScrollView, FlatList, Alert, Dimensions, PermissionsAndroid, Platform, ImageStore, Modal } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import Tags from "react-native-tags";
import TrendingReadsCell from '../../Cells/TrendingReadsCell';
import { connect } from 'react-redux';
//@ts-ignore
import HTML from 'react-native-render-html';
import RKImageLoder from '../../Utils/RKImageLoder';
import { GuideModl } from '../../Modals/GuidesModl';
import { getGuideDtls } from '../../Redux/Actions/GuidesActions';
import ReliefKeys from '../../Redux/Constants/ReliefKeys';
import { HomeRemediesDtls, ReliefExerciseDtls } from '../../Modals/ReliefModl'
import Images from '../../Utils/ImageGenerator';
import VideoPlayer from '../../Components/VideoPlayer';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
  homeRemediesDtls: HomeRemediesDtls,
  getHomeRemedies: any
  reliefExerciseDtls: ReliefExerciseDtls,
  getReliefExercise: any
}

class ReliefDtls extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    showPlayer: false,
  }

  componentDidMount() {
    if (this.props.navigation.state.params.type == 2) {
      this.getHomeRemediesData();
    }
    else {
      this.getReliefExerciseData();
    }
  }

  //Creating blogs view here
  private readsCell = (data: any) => {
    return (
      <TrendingReadsCell data={data} onPress={() => this.props.navigation.navigate('BlogsTrendSimilarDtls', { id: data.item.id })} />
    )
  }

  getHomeRemediesData() {
    const params = {
      "table": "home_remedies",
      "model": "HomeRemedy",
      "id": this.props.navigation.state.params.id
    }
    this.props.getHomeRemedies({ params: params, token: this.props.token })
  }

  getReliefExerciseData() {
    const params = {
      "table": "relief_exercises",
      "model": "ReliefExercise",
      "id": this.props.navigation.state.params.id
    }
    this.props.getReliefExercise({ params: params, token: this.props.token })
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalPadding;
    let data: any = this.props.navigation.state.params.type == 2 ? this.props.homeRemediesDtls : this.props.reliefExerciseDtls;
    return (
      // <AddQtyPopup />
      <View style={styles.mainVw}>
        {data === undefined ? null : (
          <Modal animated={true} visible={this.state.showPlayer}>
            <VideoPlayer
              videoId={data.videos}
              onCross={() => this.setState({ showPlayer: false })}
            />
          </Modal>
        )}
        {
          data == undefined ? null :
            <View>
              <RKImageLoder style={styles.bannerImg} src={data.image} tempImg={Images.PLACEHOLDER} />
              <View style={[styles.opqVw, { opacity: 0.2 }]} />
            </View>
        }
        {
          data == undefined ? null :
            <SafeAreaView style={{ flex: 1, }}>
              <View style={styles.topNavVw}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.leftBtn}>
                  <Image style={styles.commonImg} source={Images.BACK} />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsVw}>
                <TouchableOpacity style={styles.playBtn} activeOpacity={1} />
                <View style={styles.allDataCntnr}>
                  <View style={styles.likeTitleVw}>
                    <Text style={styles.titleTxt}>{data.title}</Text>
                  </View>
                  {
                    data.tags != undefined && data.tags.length > 0 ?
                      <Tags
                        initialTags={data.tags}
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
                      : null
                  }
                  <Text style={styles.descTxt}>{'Description'}</Text>
                  <View style={styles.htmlCntnr}>
                    <HTML ignoredStyles={['font-size', 'font-weight', 'font-family', 'width']} imagesMaxWidth={width} baseFontStyle={styles.infoTxt} html={data.description} />
                  </View>
                  {
                    data.videos == '' ? null :
                      <TouchableOpacity style={styles.playBtn} activeOpacity={0.8} onPress={() => this.setState({showPlayer: true})}>
                        <RKImageLoder style={styles.playerImg} src={data.image} tempImg={Images.PLACEHOLDER} />
                        <View style={[styles.opqVw1, { opacity: 0.2 }]} />
                        <Image source={Images.PLAY_BIG} style={styles.playImg} />
                      </TouchableOpacity>
                  }
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
    token: state.loginReducer.userInfo.loginData.token,
    homeRemediesDtls: state.loginReducer.homeReliefData.HomeRemediesDtls,
    reliefExerciseDtls: state.loginReducer.homeReliefData.ReliefExerciseDtls
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getHomeRemedies: (data: any) => dispatch({ type: ReliefKeys.GET_HOMEREMEDIES_DTLS, data }),
    getReliefExercise: (data: any) => dispatch({ type: ReliefKeys.GET_RELIEFEXERCISE_DTLS, data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReliefDtls);