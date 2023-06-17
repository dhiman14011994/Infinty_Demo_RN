import React, { Component } from 'react';
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from '../../Components/Header';
import { connect } from 'react-redux';
import { getMealPlans, getRecomMealPlans } from '../../Redux/Actions/MealActions';
import { MealPlan } from '../../Modals/MealModl';
import RecomendedMealCell from '../../Cells/RecomendedMealCell';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getMealPlans: any,
  mealPlans: MealPlan[],
  recMealPlans: MealPlan[],
  getRecomenMealPlans: any,
  token: string,
}
class PopularMealPlan extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    }
  }

  state = {
    isCalled: false,
    isSearched: false,
    page: 1,
    prevPage: 0,
    searchTxt: '',
    plansArr: [] as MealPlan[],
  }

  isRecomended = this.props.navigation.state.params.isRec;

  componentDidMount() {
    if (this.isRecomended) {
      this.getRecomMealPlansData();
    }
    else {
      this.getMealPlans('', this.state.page);
    }
  }

  componentWillReceiveProps(props: any) {
    if (props.mealPlans.length > 0) {
      let page = this.state.page;
      let prevPage = this.state.page;
      page = page + 1;
      let arr = this.state.isSearched ? props.mealPlans : [...this.state.plansArr, ...props.mealPlans];
      this.setState({ isCalled: false, page: page, prevPage: prevPage, plansArr: arr, isSearched: false })
    }
  }

  //Fetching workout categories
  private getMealPlans(text: string, page: any) {
    this.setState({ prevPage: this.state.page + 1 })
    let params = {
      "table": "meal_plan",
      "model": "MealPlan",
      "filters": [{ "title": text }],
      "page": page
    }
    this.props.getMealPlans({ params: params, token: this.props.token, type: 1 })
  }

  //Fetching Recommended Plans
  private getRecomMealPlansData() {
    const params = {
      "data": this.props.navigation.state.params.data,
    }
    this.props.getRecomenMealPlans({ params: params, token: this.props.token, type: 1 })
  }

  handleChangeText(text: string) {
    this.setState({ page: 1, prevPage: 0, isSearched: true, serchedTxt: text })
    this.getMealPlans(text, 1)
  }

  //Creating meals plans here
  private renderPopularMeals = ({ item, index }: any) => {
    return (
      <RecomendedMealCell data={item} onTapCell={() => this.props.navigation.navigate('StartMealPlan', { id: item.id, isRecommended: this.isRecomended })} />
      // <PopularMealsCell isFromList={true} data={item} onTapCell={() => this.props.navigation.navigate('MealDetails')} />
    )
  }

  //Checking if table reaches end or not
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 50; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  //Load more page action
  loadMoreData() {
    if (this.state.prevPage == this.state.page) {
      return
    }
    this.setState({ isCalled: true })
    this.getMealPlans('', this.state.page)
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
         <NavigationHeader
          title={'Popular Plans'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <View style={styles.srchCntnr}>
          <View style={styles.searchVw}>
            <Image source={Images.SEARCH} style={styles.searchImg} />
            <TextInput placeholderTextColor={'white'} placeholder={'Search'} style={styles.searchInput} onChangeText={(text: string) => this.handleChangeText(text)} />
            {/* <TouchableOpacity onPress={() => { }} activeOpacity={0.8}>
              <Image source={require('../../Assets/filter.png')} style={styles.searchImg} />
            </TouchableOpacity> */}
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.exerciseTbl}
          data={this.isRecomended ? this.props.recMealPlans : this.state.plansArr}
          keyExtractor={(item: any, index: any) => index.toString()}
          renderItem={this.renderPopularMeals}
          onEndReachedThreshold={0.1}
          onScroll={({ nativeEvent }: any) => {
            if (this.state.isCalled == false && this.isCloseToBottom(nativeEvent)) {
              this.loadMoreData()
            }
          }}
        />
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    mealPlans: state.loginReducer.mealData.srchedMealPlans,
    recMealPlans: state.loginReducer.mealData.recMealPlans,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getMealPlans: (data: any) => dispatch(getMealPlans(data)),
    getRecomenMealPlans: (data: any) => dispatch(getRecomMealPlans(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularMealPlan);