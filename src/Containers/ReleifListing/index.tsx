import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Text, Image, FlatList, Dimensions, BackHandler, Alert } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import ReliefCell from '../../Cells/ReliefCell';
import Images from '../../Utils/ImageGenerator';
import HealthTipsCell from '../../Cells/HealthTipsCell';
import { getReliefDataList, getRemediesDataList } from '../../Redux/ReduxAPIHandler/ReliefApis';
import { ReliefExercise } from '../../Modals/ReliefModl';
import { getHealthTips } from '../../Redux/ReduxAPIHandler/BlogApis';
import { Blogs } from '../../Modals/BlogsModl';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class ReleifListing extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    list: [] as any[],
    blogs: [] as Blogs[],
  }

  type = this.props.navigation.state.params.type;

  componentDidMount() {
    if (this.type == 1) {
      this.getReliefList();
    }
    else if (this.type == 2) {
      this.getHealthTipsList();
    }
    else {
      this.getRemediesList();
    }
  }

  async getReliefList() {
    const params = {
      "table": "relief_exercises",
      "model": "ReliefExercise"
    }
    let data = await getReliefDataList(params, this.props.token);
    this.setState({ list: data });
  }

  async getRemediesList() {
    const params = {
      "table": "home_remedies",
      "model": "HomeRemedy"
    }
    let data = await getRemediesDataList(params, this.props.token);
    this.setState({ list: data });
  }

  async getHealthTipsList() {
    const params = {
      "table": "blogs",
      "model": "Blog",
      "category": 8,
    }
    let data = await getHealthTips(params, this.props.token);
    this.setState({ blogs: data })
  }

  //Creating relief plans here
  private releifCell = ({ item, index }: any) => {
    let listType = this.type == 3 ? 2 : 1
    return (
      <ReliefCell isFull={true} isReleif={this.type == 1 ? false : true} data={item} onTapCell={() => this.props.navigation.navigate('ReliefDtls',{ id: item.id, type: listType})} />
    )
  }

  //Creating tips here
  private tipsCell = ({ item, index }: any) => {
    return (
      <HealthTipsCell data={item} onPress={() => this.props.navigation.navigate('BlogsDetails',{ id: item.id })} />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={this.props.navigation.state.params.title}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
          {
            this.type == 1 || this.type == 3 ? <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.topMenuTbl}
              data={this.state.list}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.releifCell}
            />
              : <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.topMenuTbl}
                data={this.state.blogs}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.tipsCell}
              />
          }
          <View style={styles.paddingView} />
        </ScrollView >
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    userProfile: state.loginReducer.userInfo.userInfo,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleifListing);
