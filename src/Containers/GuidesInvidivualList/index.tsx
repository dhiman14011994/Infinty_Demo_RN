import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, Alert } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Images from '../../Utils/ImageGenerator';
import { getGuidesList } from '../../Redux/ReduxAPIHandler/GuidesApi';
import GuidesCell from '../../Cells/GuidesCell';
import { GuideModl } from '../../Modals/GuidesModl';

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  token: string,
}

class GuidesInvidivualList extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    guides: [] as GuideModl[],
  }

  type = this.props.navigation.state.params.type;

  componentDidMount() {
    this.getGuides();
  }

  async getGuides() {
    let params = {
      "table": "guides",
      "model": "Guide",
      "category": this.type,
    }
    let data = await getGuidesList(params, this.props.token)
    this.setState({ guides: data })
  }

  //Creating guides view here
  private renderGuides = (data: any) => {
    return (
      <GuidesCell isList={true} data={data} onPress={() => this.props.navigation.navigate('GuidesDetail', { id: data.item.id })} />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={this.props.navigation.state.params.title}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        <View style={styles.scrollVw}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.topMenuTbl}
            data={this.state.guides}
            keyExtractor={(item: any, index: any) => index.toString()}
            renderItem={this.renderGuides}
            onEndReachedThreshold={0.1}
            onEndReached={info => {
              Alert.alert('Hello')
            }}
          />
          <View style={styles.paddingView} />
        </View >
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(GuidesInvidivualList);
