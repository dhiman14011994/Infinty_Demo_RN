import React, { Component } from 'react';
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, FlatList, Text, TextPropTypes, Alert } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from '../../Components/Header';
import ExercisesCell from '../../Cells/ExercisesCell';
import { WorkoutCat } from '../../Modals/WorkoutModl';
import { connect } from 'react-redux';
import workoutKeys from '../../Redux/Constants/WorkoutKeys';
import { saveExerciseCatDtls } from '../../Redux/Actions/WorkoutsActions';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getWorkoutCat: any,
  workoutCat: WorkoutCat[],
  token: string,
  saveExerciseCatDtls: any,
}

class WorkoutCatList extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    }
  }

  equipment = -1;
  level = -1;

  state = {
    isSearched: false,
    isCalled: false,
    page: 1,
    prevPage: 0,
    workoutsArr: [] as WorkoutCat[],
    serchedTxt: '',
  }

  componentDidMount() {
    this.getWorkoutCatData('', this.state.page)
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'WorkoutCatList') {
        let params: any = this.props.navigation.state.params;
        if (params != undefined) {
          if (params.clear == true) {
            this.equipment = -1;
            this.level = -1;
          }
          else {
            this.equipment = params.equipment;
            this.level = params.level;
          }
          this.setState({ page: 1, prevPage: 0 })
          this.getWorkoutCatData(this.state.serchedTxt, 0);
        }
        this.clearCache();
      }
    });
  }

  componentWillReceiveProps(props: any) {
    if (props.workoutCat.length > 0) {
      let page = this.state.page;
      let prevPage = this.state.page;
      page = page + 1;
      let arr = this.state.isSearched ? props.workoutCat : [...this.state.workoutsArr, ...props.workoutCat];
      if (this.state.page == 1) {
        arr = props.workoutCat;
      }
      this.setState({ isCalled: false, page: page, prevPage: prevPage, workoutsArr: arr, isSearched: false })
    }
    else if (this.state.page == 1) {
      this.setState({ isCalled: false, workoutsArr: [], isSearched: false })
      // Alert.alert('No exercise found.')
    }
  }

  clearCache() {
    this.props.saveExerciseCatDtls();
  }


  //Fetching workout categories
  private getWorkoutCatData(text: string, page: any) {
    this.setState({ prevPage: this.state.page + 1 })
    const params = {
      "table": "excercises",
      "model": "Excercise",
      "page": page,
      "filters": [{
        "title": text,
        "equipment_req": this.equipment == -1 ? '' : this.equipment,
        "level": this.level == -1 ? '' : this.level
      }]
    }
    this.props.getWorkoutCat({ params: params, token: this.props.token, isCat: false })
  }

  handleChangeText(text: string) {
    this.setState({ page: 1, prevPage: 0, isSearched: true, serchedTxt: text })
    this.getWorkoutCatData(text, 1)
  }

  //Creating exercises here
  private renderExercise = (data: any) => {
    return (
      <ExercisesCell data={data} onPress={() => this.props.navigation.navigate('ExerciseDetails', { id: data.item.id })} />
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
    this.getWorkoutCatData('', this.state.page)
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Exercises'}
          leftBtnActn={() => this.props.navigation.goBack()}
          isMultiple={false}
          btnImage={Images.BACK}
        />
        <View style={styles.cntnrVw}>
          <View style={styles.searchVw}>
            <Image source={Images.SEARCH} style={styles.searchImg} />
            <TextInput placeholder={'Search for Exercises'} style={styles.searchInput} placeholderTextColor={'white'} onChangeText={(text: string) => this.handleChangeText(text)} />
            <TouchableOpacity style={styles.filterBtn} onPress={() => this.props.navigation.navigate('WorkoutFilter', { equipment: this.equipment, level: this.level, isCat: false })} activeOpacity={0.8}>
              <Image source={Images.FILTER} style={styles.searchImg} />
            </TouchableOpacity>
          </View>
          {
            this.state.workoutsArr.length == 0 ?
              <View style={styles.errorVw}>
                <Text style={styles.noWorkoutTxt}>{'No exercise found.'}</Text>
              </View> :
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                style={styles.exerciseTbl}
                data={this.state.workoutsArr}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.renderExercise}
                onEndReachedThreshold={0.1}
                onScroll={({ nativeEvent }: any) => {
                  if (this.state.isCalled == false && this.isCloseToBottom(nativeEvent)) {
                    this.loadMoreData()
                  }
                }}
              />
          }
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    workoutCat: state.loginReducer.workoutData.srchWorkouts,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getWorkoutCat: (data: any) => dispatch({ type: workoutKeys.GET_EXERCISES_CAT, data }),
    saveExerciseCatDtls: (data: any) => dispatch(saveExerciseCatDtls(undefined)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCatList);