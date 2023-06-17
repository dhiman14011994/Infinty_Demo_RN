import React, { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, Text, View, BackHandler } from 'react-native';
import { styles } from './styles';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class CraftPlan extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    isFromMeal: false,
  }

  componentDidMount() {
    this.setState({ isFromMeal: this.props.navigation.state.params.isFromMeal})
  }

  handleTap() {
    if(this.state.isFromMeal) {
      this.props.navigation.navigate('MCQ', { isFromMeal: this.state.isFromMeal });
    }
    else {
      this.props.navigation.navigate('MCQWorkout', {index: 0, mcqData: []});
    }
  }

  handleBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={this.props.navigation.state.params.isFromMeal ? Images.MEAL_MCQ : Images.BG_IMAGE} style={styles.bgImg} />
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.navBarVw}>
            <TouchableOpacity onPress={() => this.handleBack()} style={styles.navBtn}>
              <Image source={Images.BACK} style={styles.btnLeftImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.messageCntnrVw}>
            <Text style={styles.messageTxt}>{'We will ask you some questions to suggest a ' + (this.state.isFromMeal ? 'mealplan' : 'workout plan') + ' that works for you!'}</Text>
            <RedButton title={'Proceed'} onPress={() => this.handleTap()} />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}