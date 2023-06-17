import React, { Component } from 'react';
import { SafeAreaView, FlatList, BackHandler, Dimensions, ScrollView } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { NavigationScreenProp, } from 'react-navigation';
import { styles } from './styles';
import TransactionCell from '../../Cells/TransactionCell';
import { connect } from 'react-redux';
import { getTransaction, getTermsData } from '../../Redux/Actions/CommonActions';
//@ts-ignore
import HTML from 'react-native-render-html';
import Images from '../../Utils/ImageGenerator';

interface Props {
  navigation: NavigationScreenProp<any, any>,
  help: string,
  policy: string,
  getData: any,
  token: any,
}

class HelpTerms extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
  }

  type = this.props.navigation.state.params.type;

  componentDidMount() {
    this.getInfo();
  }

  //Fetching blogs
  private getInfo() {
    const params = {
      "table": "pages",
      "model": "Page",
      "id": this.type,
    }
    this.props.getData({ params: params, token: this.props.token, type: this.type })
  }

  render() {
    let width = Dimensions.get('screen').width - styles.totalMargin;
    let title = this.type == '1' ? 'Privacy Policy' : 'Help Support';
    let info = this.type == '1' ? this.props.policy : this.props.help ;
    console.log('ssss: ', info, this.type)
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={title}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <ScrollView style={styles.htmlVw} showsVerticalScrollIndicator={false}>
          <HTML ignoredStyles={['height', 'width', 'font-family']} baseFontStyle={styles.commonTxt} html={info} imagesMaxWidth={width} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  console.log(state.loginReducer.commonData)
  return {
    token: state.loginReducer.userInfo.loginData.token,
    help: state.loginReducer.commonData.help,
    policy: state.loginReducer.commonData.policy,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getData: (data: any) => dispatch(getTermsData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpTerms);