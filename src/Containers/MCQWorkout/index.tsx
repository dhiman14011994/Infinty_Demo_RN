import React, { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, Text, View, ScrollView, BackHandler, MaskedViewComponent, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import RedButton from '../../Components/RedButton';
import { NavigationScreenProp } from 'react-navigation';
import color from '../../Constants/Colors';
import { MCQModl, QuestionsModl } from '../../Modals/CommonModl';
import { connect } from 'react-redux';
import { getMCQList } from '../../Redux/ReduxAPIHandler/CommonApi';
import Images from '../../Utils/ImageGenerator';
import { getMCQ } from '../../Redux/ReduxAPIHandler/WorkoutApis';
import Index from '../Home/Index';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class MCQWorkout extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    mcq: undefined as any as QuestionsModl,
    selectedQues: [] as any[],
    mcqArr: this.props.navigation.state.params.ques as MCQModl[],
    isChild: false,
    index: this.props.navigation.state.params.index,
  }

  params: any[] = [];

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    let mcq = await getMCQ(this.props.token);
    this.setState({ mcq: mcq });
  }

  //Creating options buttons
  private renderBtn(item: any, index: any) {
    return (
      <TouchableOpacity key={index} onPress={() => this.state.isChild ? this.handleChildTap(index) : this.handleTap(index)} style={[styles.optBtn, { borderWidth: 2, backgroundColor: item.isSelected ? color.APP_PINK_COLOR : color.APP_GREY }]} activeOpacity={0.8}>
        <Text style={styles.optTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  private handleTap(index: any) {
    let mainAarr = this.state.mcq.mcqQuestion;
    let currentMcq = mainAarr[this.state.index];
    let answers = currentMcq.answers;

    let mcq = answers[0];
    mcq.isSelected = index == 0 ? true : false;
    answers[0] = mcq;
    currentMcq.answers = answers;

    let mcq1 = answers[1];
    mcq1.isSelected = index == 1 ? true : false;
    answers[1] = mcq1;
    currentMcq.answers = answers;

    mainAarr[this.state.index] = currentMcq;
    this.setState({ mcqArr: mainAarr })
    this.onProceed(index == 0 ? true : false);
  }

  private handleChildTap(index: any) {
    let mainAarr = this.state.mcqArr;
    let currentMcq = mainAarr[0];
    let answers = currentMcq.answers;
    let mcq = answers[index];
    mcq.isSelected = !mcq.isSelected;
    answers[index] = mcq;
    currentMcq.answers = answers;
    mainAarr[0] = currentMcq;
    this.setState({ mcqArr: mainAarr })
  }

  onProceed(isTrue: boolean) {
    let mcq = this.state.mcq.mcqQuestion[this.state.index];
    let str = '';
    for (let j = 0; j < mcq.answers.length; j++) {
      let answer = mcq.answers[j];
      if (answer.isSelected) {
        str = str + answer.id + ',';
      }
    }
    if (str != '' && isTrue) {
      this.removeIfExist(mcq.id);
      this.params = [...this.params, ...[{ 'qid': mcq.id, 'ans': str.slice(0, str.length - 1) }]];
    }

    if (isTrue) {
      this.setState({ mcqArr: this.state.mcq.mcqQuestion[this.state.index].ChildQuestion, isChild: true })
    }
    else {
      if ((this.state.index + 1) < this.state.mcq.mcqQuestion.length) {
        this.removeIfExist(mcq.id);
        for (let index = 0; index < mcq.ChildQuestion.length; index++) {
          const element: MCQModl = mcq.ChildQuestion[index];
          this.removeIfExist(element.id);
        }
        this.removeIfExist(mcq.ChildQuestion);
        this.setState({ index: this.state.index + 1 })
      }
      else {
        let data = { "ans": this.params };
        this.props.navigation.navigate('MCQ', { recomended: true, mcqData: data, isFromMeal: false });
      }
    }
  }

  onProceedChild() {
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
        this.removeIfExist(mcq.id);
        this.params.push({ 'qid': mcq.id, 'ans': str.slice(0, str.length - 1) });
      }
    }

    if ((this.state.index + 1) < this.state.mcq.mcqQuestion.length) {
      this.setState({ mcqArr: this.state.mcq.mcqQuestion[this.state.index].ChildQuestion, isChild: false, index: this.state.index + 1 })
    }
    else {
      let data = { "ans": this.params };
      this.props.navigation.navigate('MCQ', { recomended: true, mcqData: data, isFromMeal: false });
    }
  }

  removeIfExist(qid: any) {
    for (let index = 0; index < this.params.length; index++) {
      const element = this.params[index];
      if(element.qid == qid) {
        this.params.splice(index, 1);
        break;
      }
    }
  }

  private handleBack() {
    if (this.state.index == 0 && !this.state.isChild) {
      this.props.navigation.goBack()
    }
    else {
      if (this.state.isChild) {
        this.setState({ isChild: false })
      }
      else {
        let mainAarr = this.state.mcq.mcqQuestion;
        let currentMcq = mainAarr[this.state.index - 1];
        let answers = currentMcq.answers;
        if (answers[0].isSelected) {
          this.setState({ mcqArr: this.state.mcq.mcqQuestion[this.state.index - 1].ChildQuestion, isChild: true, index: this.state.index - 1 })
        }
        else {
          this.setState({ isChild: false, index: this.state.index - 1 })
        }
      }
    }
  }

  render() {
    let data = this.state.mcq == undefined ? [] : this.state.isChild ? this.state.mcqArr : this.state.mcq.mcqQuestion;
    let index = this.state.isChild ? 0 : this.state.index;
    return (
      <View style={styles.mainVw}>
        <Image source={Images.BG_IMAGE} style={styles.bgImg} />
        {
          this.state.mcq == undefined ? null :
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
                  data.length > 0 ?
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                      <Text style={styles.titleTxt}>{data[index].title}</Text>
                      {
                        data[index].answers.map((item: any, index: any) => (
                          this.renderBtn(item, index)
                        ))
                      }
                    </View>
                    : null
                }
              </ScrollView>
              {
                this.state.isChild ?
                  <RedButton lowMargin={true} title={'Proceed'} onPress={() => this.onProceedChild()} />
                  : null
              }
              <View style={styles.paddingVw} />
            </SafeAreaView>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MCQWorkout);
