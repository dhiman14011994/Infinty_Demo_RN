import React, { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, Text, View, ScrollView, BackHandler, MaskedViewComponent, FlatList } from 'react-native';
import { styles } from './styles';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import color from '../../Constants/Colors';
import { MCQModl } from '../../Modals/CommonModl';
import { connect } from 'react-redux';
import { getMCQList } from '../../Redux/ReduxAPIHandler/CommonApi';
import Images from '../../Utils/ImageGenerator';
import { getMCQ } from '../../Redux/ReduxAPIHandler/WorkoutApis';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class MCQ extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    mcqArr: [] as MCQModl[],
    selectedQues: [] as any[],
    index: 0,
  }

  isFromMeal = this.props.navigation.state.params.isFromMeal

  componentDidMount() {
    this.getQuestions();

    console.log('PARENT MCQ DATA: ', this.props.navigation.state.params.mcqData);
  }

  async getQuestions() {
    let endpoint = '';
    if (this.props.navigation.state.params.isFromMeal) {
      endpoint = 'mealplan';
    }
    else {
      endpoint = 'workoutplan';
    }
    let resp = await getMCQList(this.props.token, endpoint);
    this.setState({ mcqArr: resp });
  }

  //Creating options buttons
  private renderBtn(item: any, index: any) {
    return (
      <TouchableOpacity onPress={() => this.handleTap(index)} style={[styles.optBtn, { borderWidth: 2, backgroundColor: item.isSelected ? color.APP_PINK_COLOR : color.APP_GREY }]} activeOpacity={0.8}>
        <Text style={styles.optTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  private handleTap(index: any) {

    // let mcq = [...this.state.selectedQues];
    let mainAarr = this.state.mcqArr;
    let currentMcq = mainAarr[this.state.index];
    let answers = currentMcq.answers;
    let mcq = answers[index];
    mcq.isSelected = !mcq.isSelected;
    answers[index] = mcq;
    currentMcq.answers = answers;
    mainAarr[this.state.index] = currentMcq;
    this.setState({ mcqArr: mainAarr })
  }

  onProceed() {
    if (this.state.index == (this.state.mcqArr.length - 1)) {
      let params: any = [];
      for (let i = 0; i < this.state.mcqArr.length; i++) {
        let mcq = this.state.mcqArr[i];
        let str = '';
        for (let j = 0; j < mcq.answers.length; j++) {
          let answer = mcq.answers[j];
          if (answer.isSelected) {
            str = str + answer.id + ',';
          }
        }
        if (str != '') {
          params.push({ 'qid': mcq.id, 'ans': str.slice(0, str.length - 1) });
        }
      }
      console.log('HIIHIHIHIHI >>>> ', this.props.navigation.state.params.mcqData, params)
      if (this.isFromMeal) {
        this.props.navigation.navigate('Nutrition', { recomended: true, mcq: params })
      } else {
        this.props.navigation.navigate('Home', { recomended: true, mcq: params, mcqData: this.props.navigation.state.params.mcqData })
      }
    }
    else {
      this.setState({ index: this.state.index + 1 })
    }
  }

  private handleBack() {
    if (this.state.index == 0) {
      this.props.navigation.goBack()
    }
    else {
      this.setState({ index: this.state.index - 1 })
    }
  }

  render() {
    return (
      <View style={styles.mainVw}>
        <Image source={this.isFromMeal ? Images.MEAL_MCQ : Images.BG_IMAGE} style={styles.bgImg} />
        <SafeAreaView style={styles.mcqCntnrVw}>
          <View style={styles.navBarVw}>
            <TouchableOpacity onPress={() => this.handleBack()} style={styles.navBtn}>
              <Image source={Images.BACK} style={styles.btnLeftImg} />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
            style={{ flex: 1 }}>
            {
              this.state.mcqArr.length > 0 ?
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Text style={styles.titleTxt}>{this.state.mcqArr[this.state.index].title}</Text>
                  {
                    this.state.mcqArr[this.state.index].answers.map((item: any, index: any) => (
                      this.renderBtn(item, index)
                    ))
                  }
                </View>
                : null
            }
          </ScrollView>
          <RedButton lowMargin={true} title={'Proceed'} onPress={() => this.onProceed()} />
          <View style={styles.paddingVw} />
        </SafeAreaView>
      </View>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MCQ);
