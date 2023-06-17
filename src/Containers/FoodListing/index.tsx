import React, { Component } from 'react';
import { SafeAreaView, View, Image, FlatList, Modal, Text, Animated } from 'react-native';
import { styles } from './styles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AddFoodCell from '../../Cells/AddFoodCell';
import NavigationHeader from '../../Components/Header';
import AddQtyPopup from '../../Components/AddQtyPopup';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { getFoods, addMealLog, saveMealLog } from '../../Redux/Actions/MealActions';
import { Food } from '../../Modals/MealModl';
//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view'
import customStyles from '../../Constants/Styles'
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../../Utils/ImageGenerator';
import color from '../../Constants/Colors';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getFoods: any,
  saveAddedFood: any,
  foodList: Food[],
  addedList: Food[],
  token: string,
  logMeal: any,
  logResp: boolean,
  updateResp: any,
}

class FoodListing extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  isHidden = true;

  state = {
    isSearched: false,
    isCalled: false,
    page: 1,
    prevPage: 0,
    serchedTxt: '',
    showQtyPopup: false,
    foodList: [] as Food[],
    addedFoodList: [] as Food[],
    bounceValue: new Animated.Value(100),
  }

  componentDidMount() {
    this.getFoodsData('a', this.state.page);
  }

  async componentWillReceiveProps(props: any) {
    if (props.foodList.length > 0) {
      if (this.state.foodList.length < 10 && props.foodList.length < 10 && this.state.foodList.length != 0) {
      }
      else {
        let page = this.state.page;
        let prevPage = this.state.page;
        page = page + 1;
        let arr = this.state.isSearched ? props.foodList : [...this.state.foodList, ...props.foodList];
        this.setState({ isCalled: false, page: page, prevPage: prevPage, foodList: arr, isSearched: false })
      }
    }
    if (this.state.foodList.length > 0) {
      this.updateQty(props.addedList)
    }
    if (props.logResp) {
      this.props.updateResp();
      await AsyncStorage.setItem('index', '2');
      this.props.navigation.navigate('Nutrition');
    }
  }

  private handleChangeText(text: string) {
    this.setState({ page: 1, prevPage: 0, isSearched: true, serchedTxt: text, foodList: [], addedFoodList: [] })
    this.getFoodsData(text, 1)
  }

  //Fetching blogs
  getFoodsData(text: string, page: number) {
    // this.setState({ prevPage: this.state.page + 1 })
    // const params = {
    //   "table": "food_items",
    //   "model": "FoodItem",
    //   "page": page,
    //   "filters": [{ "title": text }]
    // }
    this.props.getFoods({ params: text, token: this.props.token })
  }

  //View Cart Action
  private logMeal() {
    // this.props.saveAddedFood(this.state.addedFoodList);
    // this.props.navigation.navigate('FoodCart')
    let title = this.props.navigation.state.params.title;
    let schedule = title == 'Breakfast' ? 0 : title == 'Lunch' ? 1 : title == 'Snacks' ? 2 : 3
    let data: any[] = [];
    for (let i = 0; i < this.state.addedFoodList.length; i++) {
      const item: Food = this.state.addedFoodList[i];
      data.push({
        "food_item_id": item.id,
        "serving": item.qty,
        "schedule_time": schedule
      })
    }
    this.props.logMeal({ params: { data: data }, token: this.props.token })
  }

  //Creating food cell here
  private renderFoods = (data: any) => {
    return (
      <AddFoodCell onPress={() => this.props.navigation.navigate('MealDetails', { id: data.item.id })} data={data} onAddTap={(qty: any) => this.onAddQty(qty, data.index)} />
    )
  }
  //Update Qty from cart data
  private updateQty(addedFood: Food[],) {
    let foodTmp = this.state.foodList;

    for (let i = 0; i < foodTmp.length; i++) {
      let food = foodTmp[i];

      const found = addedFood.some((data1: Food) => food.id === data1.id);
      const index = addedFood.findIndex((data1: Food) => food.id === data1.id);
      if (found) {
        foodTmp[i] = addedFood[index];
      }
      else {
        food.qty = 0;
        foodTmp[i] = food;
      }
    }

    this.setState({ foodList: foodTmp, addedFoodList: addedFood })
  }

  //Handling quantity popup data
  private onAddQty(qty: number, index: any) {
    let foodTmp = this.state.foodList;
    let addedTmp = this.state.addedFoodList;
    let food = foodTmp[index];
    const found = addedTmp.some((data1: Food) => food.id === data1.id);
    const index1 = addedTmp.indexOf(food);
    food.qty = qty;
    foodTmp[index] = food;
    if (found) {
      if (food.qty == 0) {
        addedTmp.splice(index1, 1);
      }
      else {
        addedTmp[index1] = food;
      }
    }
    else if (food.qty > 0) {
      addedTmp.push(food)
    }
    this.setState({ foodList: foodTmp, addedFoodList: addedTmp })
  }

  private getTotalAmount() {
    let amount = 0;
    for (let i = 0; i < this.state.addedFoodList.length; i++) {
      let food = this.state.addedFoodList[i];
      amount = amount + (food.qty * food.total_calories)
    }
    this.toggleSubview()
    return amount;
  }

  //Hiding quantity popup
  private onCross() {
    this.setState({ showQtyPopup: false })
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
    this.getFoodsData('', this.state.page)
  }

  toggleSubview() {

    this.isHidden = this.state.addedFoodList.length == 0
    var toValue = 0;

    if (this.isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }
    ).start();

    this.isHidden = !this.isHidden;
  }

  async backBtn() {
    await AsyncStorage.setItem('index', '2');
    this.props.navigation.navigate('Nutrition');
    this.props.navigation.goBack()
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal visible={this.state.showQtyPopup} transparent={true}>
          <AddQtyPopup onAdd={(qty: number) => { }} onCross={() => this.onCross()} />
        </Modal>
        <NavigationHeader
          title={'Add ' + this.props.navigation.state.params.title}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <View style={styles.srchCntnr}>
          <View style={styles.searchVw}>
            <Image source={Images.SEARCH} style={styles.searchImg} />
            <TextInput placeholderTextColor={'white'} value={this.state.serchedTxt} placeholder={'Search for Meals'} style={styles.searchInput} onChangeText={(text: string) => this.handleChangeText(text)} />
            {/* <TouchableOpacity>
            <Image source={require('../../Assets/filter.png')} style={styles.searchImg} />
          </TouchableOpacity> */}
          </View>
        </View>
        {
          this.state.serchedTxt != '' ?
            <Text numberOfLines={1} style={styles.srchtxt}>{this.state.foodList.length + ' search results for '}<Text style={styles.srchRedtxt}>{`'${this.state.serchedTxt}'`}</Text></Text>
            : null
        }
        <View style={{flex: 1, backgroundColor: color.APP_COMMON_BG_COLOR}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.topMenuTbl}
            data={this.state.foodList}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={this.renderFoods}
          />
          {
            this.getTotalAmount() != 0 ?
              <Animated.View
                style={[styles.cartCntnr,
                { transform: [{ translateY: this.state.bounceValue }] }]}
              >
                <ShadowView style={[customStyles.shadow, styles.cartCntnr]}>
                  <TouchableOpacity onPress={() => this.logMeal()} style={styles.cartVw} activeOpacity={0.8}>
                    <View>
                      <Text style={styles.itemtxt}>{this.state.addedFoodList.length + ' ITEM'}</Text>
                      <Text style={styles.amountTxt}>{'Cal ' + this.getTotalAmount()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.viewCartTxt}>{'Add To Log'}</Text>
                      <Image style={styles.arrowImg} source={require('../../Assets/polygon.png')} />
                    </View>
                  </TouchableOpacity>
                </ShadowView>
              </Animated.View>
              : null
          }
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    foodList: state.loginReducer.mealData.foods,
    addedList: state.loginReducer.mealData.addedFood,
    logResp: state.loginReducer.mealData.mealLogResp,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getFoods: (data: any) => dispatch(getFoods(data)),
    logMeal: (data: any) => dispatch(addMealLog(data)),
    updateResp: (data: any) => dispatch(saveMealLog(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListing);