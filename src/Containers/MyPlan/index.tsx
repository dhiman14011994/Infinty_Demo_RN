/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { MyPlans } from '../../Modals/Payment';
import { getMyPlans } from '../../Redux/ReduxAPIHandler/PaymentApis';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import { connect } from 'react-redux';
import Images from '../../Utils/ImageGenerator';

export interface Props {
  navigation: NavigationScreenProp<any, any>;
  token: any;
}

class MyPlan extends Component<Props, object> {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

  state = {
    plans: [] as MyPlans[],
  };

  componentDidMount() {
    this.getUserPlans();
  }

  //Creating meals plans here
  private renderPlans = ({ item }: any) => {
    let data: MyPlans = item;
    return (
      <View style={styles.cellVw}>
        <View style={styles.titleVw}>
          <Text style={styles.planTitleTxt}>{data.plan_type}</Text>
          <Text style={[styles.planTitleTxt, { opacity: 0.7 }]}>
            {data.duration}
          </Text>
        </View>
        <View style={styles.dateVw}>
          <View>
            <Text style={[styles.dateTxt, { opacity: 0.7 }]}>
              {'Start date: '}
            </Text>
            <Text style={[styles.dateTxt, { opacity: 0.7 }]}>{'Ends On:'}</Text>
          </View>
          <View>
            <Text style={[styles.dateTxt, { opacity: 0.7 }]}>
              {data.start_date}
            </Text>
            <Text style={[styles.dateTxt, { opacity: 0.7 }]}>
              {data.end_date}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  async getUserPlans() {
    let resp: any = await getMyPlans(this.props.token);
    this.setState({ plans: resp });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={'My Plans'}
          isMultiple={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={Images.BACK}
        />
        {
          this.state.plans.length == 0 ?
            <View style={styles.noDataVw}>
              <Text style={styles.noPlanTxt}>{'No plan found.'}</Text>
            </View> :
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={styles.planTbl}
              data={this.state.plans}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderPlans}
            />
        }
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.loginReducer.userInfo.loginData.token,
  };
}

export default connect(mapStateToProps)(MyPlan);
