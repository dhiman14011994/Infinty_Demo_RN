import React, { Component } from 'react';
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from '../../Components/Header';
import WorkoutExercisesCell from '../../Cells/WorkoutExercisesCell';
import { connect } from 'react-redux';
import workoutKeys from '../../Redux/Constants/WorkoutKeys';
import { saveCatExerciseDtls } from '../../Redux/Actions/WorkoutsActions';
import Images from '../../Utils/ImageGenerator';
import { WorkoutCat } from '../../Modals/WorkoutModl';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  getWorkout: any,
  workouts: WorkoutCat[],
  token: string,
  saveCatExerciseDtls: any,
}
class WorkoutList extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false,
    }
  }

  equipment = -1;
  level = -1;

  state = {
    isCalled: false,
    isSearched: false,
    page: 1,
    prevPage: 0,
    searchTxt: '',
    workoutsArr: [] as WorkoutCat[],
  }

  componentDidMount() {
    this.getWorkoutData('', this.state.page)
    this.props.navigation.addListener('willFocus', (event: any) => {
      if (event.state != undefined && event.state.routeName == 'WorkoutList') {
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
          this.getWorkoutData(this.state.searchTxt, 0);
        }
        this.clearCache();
      }
    });
  }

  componentWillReceiveProps(props: any) {
    if (props.workouts.length > 0) {
      let page = this.state.page;
      let prevPage = this.state.page;
      page = page + 1;
      let arr = this.state.isSearched ? props.workouts : [...this.state.workoutsArr, ...props.workouts];
      if (this.state.page == 1) {
        arr = props.workouts;
      }
      this.setState({ isCalled: false, page: page, prevPage: prevPage, workoutsArr: arr, isSearched: false })
    }
    else if (this.state.page == 1) {
      this.setState({ isCalled: false, workoutsArr: [], isSearched: false })
    }
  }

  clearCache() {
    this.props.saveCatExerciseDtls();
  }

  //Fetching workout categories
  private getWorkoutData(text: string, page: any) {
    this.setState({ prevPage: this.state.page + 1 })
    let params = {
      "table": "excercise_categories",
      "model": "ExcerciseCategory",
      "filters": [{
        "title": text,
        "equipment_req": this.equipment == -1 ? '' : this.equipment,
        "pace": this.level == -1 ? '' : this.level
      }],
      "page": page
    }
    this.props.getWorkout({ params: params, token: this.props.token, isCat: true })
  }

  handleChangeText(text: string) {
    this.setState({ page: 1, prevPage: 0, isSearched: true, serchedTxt: text })
    this.getWorkoutData(text, 1)
  }

  //Creating exercises here
  private renderExercise = (data: any) => {
    return (
      <WorkoutExercisesCell isHome={false} data={data} onPress={() => this.props.navigation.navigate('WorkoutDetails', { id: data.item.id, tags: data.item.tags })} />
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
    this.getWorkoutData('', this.state.page)
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Workout Plans'}
          leftBtnActn={() => this.props.navigation.goBack()}
          isMultiple={false}
          btnImage={Images.BACK}
        />
        <View style={styles.searchVw}>
            <Image source={Images.SEARCH} style={styles.searchImg} />
            <TextInput placeholder={'Search'} style={styles.searchInput} placeholderTextColor={'white'} onChangeText={(text: string) => this.handleChangeText(text)} />
            <TouchableOpacity style={styles.filterBtn} onPress={() => this.props.navigation.navigate('WorkoutFilter', { equipment: this.equipment, level: this.level, isCat: false })} activeOpacity={0.8}>
              <Image source={Images.FILTER} style={styles.searchImg} />
            </TouchableOpacity>
          </View>
        {
          this.state.workoutsArr.length == 0 ?
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.noWorkoutTxt}>{'No workout found.'}</Text>
            </View> :
            <FlatList
              showsVerticalScrollIndicator={false}
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
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    workouts: state.loginReducer.workoutData.srchWorkoutCat,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getWorkout: (data: any) => dispatch({ type: workoutKeys.GET_EXERCISES_CAT, data }),
    saveCatExerciseDtls: (data: any) => dispatch(saveCatExerciseDtls(undefined)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);