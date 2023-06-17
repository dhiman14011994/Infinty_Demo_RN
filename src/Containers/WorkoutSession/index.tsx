/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  StatusBar,
  Platform,
  BackHandler
} from 'react-native';
import { styles } from './styles';
import RedButton from '../../Components/RedButton';
import { ScrollView } from 'react-native-gesture-handler';
import color from '../../Constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import { Excercis, UserWorkout } from '../../Modals/WorkoutModl';
import { connect } from 'react-redux';
import {
  saveWorkoutProgress,
  workoutProgresssResp,
} from '../../Redux/Actions/WorkoutsActions';
import RKImageLoder from '../../Utils/RKImageLoder';
import { secondsToMinute } from '../../Utils/TimeFunction';
import { getInset } from 'react-native-safe-area-view';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import KeepAwake from 'react-native-keep-awake';
import Orientation from 'react-native-orientation';
import { videoBaseUrl } from '../../Constants/API';
import { hideNavigationBar, showNavigationBar, } from 'react-native-navigation-bar-color';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  status: boolean;
  saveProgress: any;
  changeStatus: any;
  token: string;
  userWorkout: UserWorkout;
}

class WorkoutSession extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    isStopped: true,
    isDisable: true,
    showCountDown: true,
    isUp: true,
    min: 0,
    sec: 0,
    index: 0,
    count: 4,
    url: 's',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  };

  dataVwRef: any;
  flatListRef: any;
  webRef: any;
  id = this.props.navigation.state.params.id;
  index = this.props.navigation.state.params.index;
  category: UserWorkout = this.props.userWorkout;
  exercises: Excercis[] = this.props.userWorkout.categoryData[this.index]
    .excercises;
  stop = false;
  isFirstTime = true;
  topPadding = getInset('top', false);
  bottomPadding = getInset('bottom', false);
  vwIndex = 0;
  isCurrentView = true;

  enableImg = Images.NEXT_ENABLED;
  disabledImg = Images.NEXT_DISABLE;
  playImg = Images.PLAY;
  stopImg = Images.STOP;
  upImg = Images.UP_ARROW_WHITE;
  downImg = Images.DOWN_ARROW_WHITE;

  timer = 0;

  componentDidMount() {
    this.countTimer();
    this.setCurrentIndex();
    KeepAwake.activate();
    hideNavigationBar();
    this.props.navigation.addListener('willBlur', () => {
      KeepAwake.deactivate();
      this.isCurrentView = false;
      showNavigationBar();
    });

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButtonClick(),
    );
  }

  componentWillUnmount() {
    showNavigationBar();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    Orientation.lockToPortrait();
  }

  componentWillReceiveProps(props: any) {
    if (props.status === true) {
      this.isFirstTime = true;
      this.handleNext();
      this.props.changeStatus();
    }
  }

  handleBackButtonClick = () => {
    if (this.isCurrentView) {
      return true;
    }
  };

  setCurrentIndex() {
    for (let i = 0; i < this.exercises.length; i++) {
      const excercise: Excercis = this.exercises[i];
      if (excercise.completed === 0) {
        this.setState({ index: i });
        break;
      }
    }
  }

  renderVwCell = (data: any) => {
    let exe: Excercis =
      this.state.index === this.exercises.length
        ? this.exercises[this.state.index - 1]
        : this.exercises[this.state.index];

    return data.index == 0 ? this.playerVw() : this.workoutVw(exe);
  };

  renderCell = (data: any) => {
    return (
      <View style={styles.progressCntnr}>
        {/* <View style={[styles.progressVw1, { backgroundColor: index < (this.state.index) ? color.DARK_RED : '#C9C9D1' }]} /> */}
        <View
          style={[
            styles.imgVw,
            {
              backgroundColor:
                data.index < this.state.index ? color.DARK_RED : '#C9C9D1',
            },
          ]}>
          <Image
            style={styles.tickImg}
            source={Images.WHITE_TICK}
          />
        </View>
        <View
          style={[
            styles.progressVw2,
            {
              backgroundColor:
                data.index < this.state.index ? color.DARK_RED : '#C9C9D1',
            },
          ]}
        />
      </View>
    );
  };

  countTimer() {
    let count = this.state.count;
    if (count !== 1) {
      count = count - 1;
      this.setState({ count: count });
      setTimeout(() => {
        this.countTimer();
      }, 1000);
    } else {
      this.setState({ showCountDown: false });
      setTimeout(() => {
        this.handleScroll(false);
      }, 250);
    }
  }

  handleTimer(isStopped: boolean) {
    if (
      isStopped &&
      this.state.min === 0 &&
      this.state.sec === 0 &&
      this.state.index !== this.exercises.length
    ) {
      this.setState({ isStopped: false });
      this.stop = !this.stop;
      this.startTimer();
    } else {
      this.stop = !this.stop;
      this.stopTimer();
    }
  }

  startTimer = () => {
    if (this.isFirstTime) {
      console.log('HERE')
      this.handleScroll(true);
      this.isFirstTime = false;
    }
    setTimeout(() => {
      let min = this.state.min;
      let sec = this.state.sec;
      sec = sec + 1;
      if (sec === 59) {
        sec = 0;
        min = min + 1;
      }
      this.setState({ min: min, sec: sec });
      if (this.stop) {
        this.startTimer();
      }
    }, 1000);
  };

  stopTimer = () => {
    setTimeout(() => {
      this.setState({ isStopped: true });
    }, 1000);
  };

  handleNext() {
    let index = this.state.index;
    this.stop = false;
    if (index < this.exercises.length) {
      index = 1 + index;
      // if (index != this.exercises.length) {
      this.setState({ index: index, isStopped: true });
      // }
      setTimeout(() => {
        this.setState({ min: 0, sec: 0 });
      }, 1000);
      if (index > 5 && index < this.exercises.length) {
        try {
          this.flatListRef.scrollToIndex({ animated: true, index: index });
        } catch (error) { }
      }
    }
    if (index === this.exercises.length) {
      this.setState({ isDisable: false });
    }
  }

  onClose() {
    Alert.alert(
      '',
      "It's recommended to complete the session in one go for optimal results. Are you sure, you want to exit and continue later?",
      [
        {
          text: 'NO',
          onPress: () =>  hideNavigationBar(),
        },
        {
          text: 'YES',
          onPress: () => {
            this.props.navigation.goBack();
            this.isCurrentView = false;
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }

  getTime() {
    let time = this.state.min * 60 + this.state.sec;
    return time;
  }

  //Fetching workout categories
  private saveProgress() {
    if (this.state.isStopped && !this.isFirstTime && this.state.isDisable) {
      let params = {
        workout_plan_id: this.id,
        week_no: this.category.planData.week_no,
        day_no: this.category.planData.current_day,
        category_excercise_id: this.category.categoryData[this.index]
          .category_id,
        excercise: this.exercises[this.state.index].id,
        end_time: this.getTime(),
        idle_time_duration: this.category.categoryData[this.index].duration,
      };
      this.props.saveProgress({
        params: params,
        token: this.props.token,
        isCat: false,
      });
    }
  }

  endSession() {
    if (!this.state.isDisable) {
      this.props.navigation.goBack();
    }
  }

  //Handling Scroll View scrolling for video player
  handleScroll(animated: boolean) {
    let exe: Excercis =
      this.state.index === this.exercises.length
        ? this.exercises[this.state.index - 1]
        : this.exercises[this.state.index];
    if (this.dataVwRef != undefined) {
      this.vwIndex = this.vwIndex == 0 ? 1 : 0;
      this.dataVwRef.scrollToIndex({ animated: animated, index: this.vwIndex });
      this.setState({
        isUp: !this.state.isUp,
        url: !this.state.isUp ? exe.video : '',
      });
      if (!this.state.isUp) {
        this.webRef.reload();
        // Orientation.lockToLandscapeLeft();
      } else {
        this.webRef.stopLoading();
        // Orientation.lockToPortrait();
      }
    }
  }

  workoutVw(exe: Excercis) {
    let min =
      (this.state.min + '').length === 1
        ? '0' + this.state.min
        : this.state.min;
    let sec =
      (this.state.sec + '').length === 1
        ? '0' + this.state.sec
        : this.state.sec;
    var time = secondsToMinute(this.category.categoryData[this.index].duration);
    let height = this.state.height;
    let barHeight = Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
      default: 0
    })
    height = height - barHeight;
    return (
      <View style={{ minHeight: height }}>
        <TouchableOpacity
          style={styles.videoBtn}
          activeOpacity={0.8}
          onPress={() => this.handleScroll(true)}>
          <Image
            source={this.downImg}
            style={styles.arrowImg}
          />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleVw}>
            <View style={styles.sideVw} />
            <Text style={styles.titleTxt}>
              {this.category.categoryData[this.index].category_title}
            </Text>
            <TouchableOpacity
              style={styles.sideVw}
              onPress={() => this.onClose()}
              activeOpacity={0.8}>
              <Image
                source={Images.CROSS_WHITE}
                style={styles.crossImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dataCntnr}>
            <View style={styles.sideVw} />
            <View style={styles.dataVw}>
              <Text style={styles.idealTimeTxt}>{'Ideal Time Required'}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={Images.CLOCK}
                  style={styles.clockImg}
                />
                <Text style={styles.timeTxt}>{time}</Text>
              </View>
              <TouchableOpacity onPress={() => this.handleTimer(!this.stop)}>
                <Image
                  source={this.state.isStopped ? this.playImg : this.stopImg}
                  style={styles.stopImg}
                />
              </TouchableOpacity>
              <Text style={styles.stopTxt}>
                {this.state.isStopped ? 'Start' : 'Stop'}
              </Text>
              <Text style={[styles.exeName, { marginTop: 20 }]}>
                {'x' + exe.repitition + ' ' + exe.title}
              </Text>
              <Text style={styles.countTimeTxt}>{min + ' : ' + sec}</Text>
            </View>
            <View style={[styles.sideVw, { alignItems: 'center' }]}>
              <FlatList
                ref={(ref) => (this.flatListRef = ref)}
                onScrollToIndexFailed={() => { }}
                listKey={moment().valueOf().toString()}
                showsVerticalScrollIndicator={false}
                style={styles.exerciseTbl}
                data={this.exercises}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.renderCell}
              />
            </View>
          </View>
          {this.state.index === this.exercises.length ? null : (
            <TouchableOpacity
              onPress={() => this.saveProgress()}
              activeOpacity={0.8}
              style={styles.nextBtn}>
              <Text
                style={[
                  styles.nextExeTxt,
                  {
                    color:
                      this.state.isStopped && !this.isFirstTime
                        ? color.DARK_RED
                        : 'white',
                  },
                ]}>
                {'Next Exercise'}
              </Text>
              <Image
                source={
                  this.state.isStopped && !this.isFirstTime
                    ? this.enableImg
                    : this.disabledImg
                }
                style={styles.nextImg}
              />
            </TouchableOpacity>
          )}
          <RedButton
            title={'End Session'}
            onPress={() => this.endSession()}
            isDisable={this.state.isDisable}
            lowMargin={true}
          />
          <View style={styles.marginVw} />
        </ScrollView>
      </View>
    );
  }

  playerVw() {
    let barHeight = Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
      default: 0
    })
    let deviceH = this.state.height;
    let windowH = Dimensions.get('window').height;
    let bottomNavBarH = deviceH - windowH;
    barHeight = bottomNavBarH == 0 ? barHeight : 0;

    const webHeight =
      this.state.height - (this.topPadding + this.bottomPadding + barHeight);
    return (
      <View style={{ height: webHeight, }}>
        <WebView
          ref={(WEBVIEW_REF) => (this.webRef = WEBVIEW_REF)}
          onLoadStart={() => { }}
          source={{ uri: videoBaseUrl + this.state.url }}
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
        />
        <TouchableOpacity
          style={[styles.videoBtn, { marginBottom: 0 }]}
          activeOpacity={0.8}
          onPress={() => this.handleScroll(true)}>
          <Image
            source={this.upImg}
            style={styles.arrowImg}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let exe: Excercis =
      this.state.index === this.exercises.length
        ? this.exercises[this.state.index - 1]
        : this.exercises[this.state.index];

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* <Image source={{uri: exe.image}} style={styles.commonVw} /> */}
        <RKImageLoder
          style={{
            height: this.state.height,
            width: this.state.width,
            position: 'absolute',
            resizeMode: 'contain',
            backgroundColor: 'black',
          }}
          src={exe.image}
          tempImg={Images.DUMMY}
        />
        <View
          style={[styles.commonVw, { backgroundColor: 'black', opacity: 0.6 }]}
        />
        {this.state.showCountDown ? (
          <Text style={styles.countTxt}>{this.state.count}</Text>
        ) : (
            <SafeAreaView>
              <FlatList
                ref={(ref) => {
                  this.dataVwRef = ref;
                }}
                onScrollToIndexFailed={(err: any) => console.log('ERRR:', err)}
                scrollEnabled={false}
                initialScrollIndex={1}
                showsVerticalScrollIndicator={false}
                style={styles.dataTbl}
                data={[1, 1]}
                listKey={'header'}
                keyExtractor={(index: any) => index.toString()}
                renderItem={this.renderVwCell}
              />
            </SafeAreaView>
          )}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    status: state.loginReducer.workoutData.progressResp,
    userWorkout: state.loginReducer.workoutData.userWorkout,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    saveProgress: (data: any) => dispatch(saveWorkoutProgress(data)),
    changeStatus: () => dispatch(workoutProgresssResp(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSession);
