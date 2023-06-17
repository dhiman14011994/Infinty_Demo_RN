import React, { Component } from 'react';
//@ts-ignore
import Tags from "react-native-tags";
import { NavigationScreenProp } from 'react-navigation';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import * as filterData from './FilterConstants';
import color from '../../Constants/Colors';
import RedButton from '../../Components/RedButton';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class WorkoutFilter extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    durationArr: filterData.durationData,
    levelArr: filterData.levelData,
    // isFilterApplied: false,
    equipmentIndex: -1,
    levelIndex: -1,
  }

  isCat = this.props.navigation.state.params.isCat;

  componentDidMount() {
    let params: any = this.props.navigation.state.params;
    this.setState({equipmentIndex: params.equipment, levelIndex: params.level})
  }

  checkForApplied() {
    let flag = true
    if (this.state.equipmentIndex == -1 || this.state.levelIndex == -1) {
      flag = false
    }
    this.setState({ isFilterApplied: flag })
  }

  private renderFilter(title: string, type: any, array: any[]) {
    let filterIndex = type == 0 ? this.state.equipmentIndex : this.state.levelIndex
    return (
      <View style={styles.tagCntnr}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Tags
          initialTags={array}
          inputContainerStyle={{ height: 0 }}
          inputStyle={{ height: 0 }}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }: any) => (
            <TouchableOpacity
              style={[styles.tagVw, { borderWidth: 1, backgroundColor: index == filterIndex ? color.DARK_RED : color.APP_COMMON_BG_COLOR }]}
              key={`${tag}-${index}`}
              onPress={() => this.handleTap(index, type)}>
              <Text style={[styles.tagTxt, { color: 'white' }]}>{tag.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  //Handling tags taps
  private handleTap(index: any, type: any) {
    switch (type) {
      case 0:
        this.setState({ equipmentIndex: index })
        break;

      case 1:
        this.setState({ levelIndex: index })
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'Filter'}
          leftBtnActn={() => this.props.navigation.goBack()}
          isMultiple={false}
          btnImage={Images.BACK}
        />
        <ScrollView>
          {
            this.renderFilter('Equipment Requirement', 0, this.state.durationArr)
          }
          {
            this.renderFilter('Exercise Intensity Level', 1, this.state.levelArr)
          }
          <RedButton title={'Apply Filters'} onPress={() => this.props.navigation.navigate(this.isCat ? 'WorkoutList' : 'WorkoutCatList', { equipment: this.state.equipmentIndex, level: this.state.levelIndex, clear: false })} />
          <TouchableOpacity style={styles.clearBtn} activeOpacity={0.8} onPress={() => this.props.navigation.navigate(this.isCat ? 'WorkoutList' : 'WorkoutCatList', { clear: true })} >
            <Text style={styles.clearTxt}>{'Clear Filters'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

