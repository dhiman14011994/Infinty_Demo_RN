/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import RKImageLoder from '../../Utils/RKImageLoder';
import WorkoutDtlsCell from '../../Cells/WorkoutDtlsCell';
import { connect } from 'react-redux';
import { ExerciseCatDtls } from '../../Modals/WorkoutModl';
import { getCatExerciseDtls } from '../../Redux/Actions/WorkoutsActions';
import { secondsToMinute } from '../../Utils/TimeFunction';
import Images from '../../Utils/ImageGenerator';
//@ts-ignore
import Tags from "react-native-tags";

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  getDtls: any;
  token: string;
  workoutDtls: ExerciseCatDtls;
}

class WorkoutDetails extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    selectedIndex: -1,
  };

  componentDidMount() {
    this.getWorkoutData();
    console.log('TAGS: ', this.props.navigation.state.params.tags)
  }

  //Fetching workout details
  private getWorkoutData() {
    let params = {
      id: this.props.navigation.state.params.id,
    };
    this.props.getDtls({ params: params, token: this.props.token, isCat: false });
  }

  renderWorkouts = (data: any) => {
    return (
      // <WorkoutDtlsCell data={data} onPress={() => { }} onSelect={() => this.setState({ selectedIndex: this.state.selectedIndex == data.index ? -1 : data.index })} isSelected={this.state.selectedIndex == data.index} />
      <WorkoutDtlsCell
        data={data}
        onPress={() => { }}
        onSelect={() => { }}
        isSelected={true}
      />
    );
  };

  render() {
    let dtls: ExerciseCatDtls = this.props.workoutDtls;
    var time = dtls == undefined ? 0 : secondsToMinute(dtls.duration);
    return (
      <SafeAreaView style={styles.mainVw}>
        {this.props.workoutDtls == undefined ? null : (
          <RKImageLoder
            style={styles.bannerImg}
            src={dtls.image}
            tempImg={require('../../Assets/dummy.png')}
          />
        )}
        {this.props.workoutDtls == undefined ? null : (
          <View style={{ flex: 1 }}>
            <View style={styles.topNavVw}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.leftBtn}>
                <Image
                  style={styles.arrowImg}
                  source={Images.BACK}
                />
              </TouchableOpacity>
              {/* <Text style={styles.headerTxt}>{'Push Up'}</Text> */}
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.detailsVw}>
              <View style={styles.allDataCntnr}>
                <Text style={styles.titleTxt}>{dtls.title}</Text>
                <View style={styles.infoVw}>
                  <Image
                    style={styles.infoImg}
                    source={require('../../Assets/red_clock.png')}
                  />
                  <Text style={styles.infoTxt}>{time}</Text>
                </View>
                <View style={styles.infoVw}>
                  <Image
                    style={styles.infoImg}
                    source={require('../../Assets/dumble.png')}
                  />
                  <Text style={styles.infoTxt}>{dtls.equipment_req}</Text>
                </View>
                <View style={styles.infoVw}>
                  <Image
                    style={styles.infoImg}
                    source={require('../../Assets/men.png')}
                  />
                  <Text style={styles.infoTxt}>{dtls.level}</Text>
                </View>
                <Tags
                  initialTags={this.props.navigation.state.params.tags}
                  inputContainerStyle={{ height: 0, }}
                  inputStyle={{ height: 0 }}
                  renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }: any) => (
                    // <TouchableOpacity style={styles.tagVw} key={`${tag}-${index}`} onPress={onPress}>
                    //   <Text style={styles.tagTxt}>{tag}</Text>
                    // </TouchableOpacity>
                    <View style={styles.tagVw}>
                      <Text style={styles.tagTxt}>{tag.name}</Text>
                    </View>
                  )}
                />
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={[dtls.excercises]}
                  style={styles.tbl}
                  scrollEnabled={false}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={this.renderWorkouts}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
    workoutDtls: state.loginReducer.workoutData.workoutDtls,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getDtls: (data: any) => dispatch(getCatExerciseDtls(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDetails);
