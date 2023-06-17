
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { View, Image, Platform, StyleSheet, Text } from 'react-native';
import color from '../Constants/Colors';
import Images from '../Utils/ImageGenerator';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import BlankScreen from '../Containers/BlankScreen';
import Community from '../Containers/Community/Index';
import Home from '../Containers/Home/Index';
import Workout from '../Containers/Workout/Index';
import Nutrition from '../Containers/Nutrition/Index';
import MealDetails from '../Containers/MealDetails';
import StartMealPlan from '../Containers/StartMealPlan';
import FoodListing from '../Containers/FoodListing';
import PaymentCard from '../Containers/PaymentCard';
import WorkoutList from '../Containers/WorkoutList';
import RehabilitationList from '../Containers/RehabilitationList';
import BlogsListing from '../Containers/BlogsListing';
import BlogsDetails from '../Containers/BlogsDetails';
import GuidesListing from '../Containers/GuidesListing';
import Profile from '../Containers/Profile';
import Settings from '../Containers/Settings';
import EditProfile from '../Containers/ProfileEdit';
import RehabilitationDtls from '../Containers/RehabilitationDtls';
import ExerciseDetails from '../Containers/ExerciseDetails';
import WorkoutCatList from '../Containers/WorkoutCatList';
import MyDevices from '../Containers/MyDevices';
import WorkoutFilter from '../Containers/WorkoutFilter';
import WaterReminder from '../Containers/WaterReminder';
import MCQWorkout from '../Containers/MCQWorkout';
import CraftPlan from '../Containers/CraftPlan';
import MCQ from '../Containers/MCQ';
import Reminders from '../Containers/Reminders';
import ChangePassword from '../Containers/ChangePassword';
import PopularMealPlan from '../Containers/PopularMealPlan';
import MCQChildQues from '../Containers/MCQChildQues';
import BlogsTrendSimilarDtls from '../Containers/BlogsTrendSimilarDtls';
import PaymentMode from '../Containers/PaymentMode';
// import ChatList from '../Containers/ChatList';
import InviteFriend from '../Containers/InviteFriend';
// import FoodCart from '../Containers/FoodCart';
import MyPlan from '../Containers/MyPlan';
import FitnessStats from '../Containers/FitnessStats';
import BodyFat from '../Containers/BodyFat';
import Transactions from '../Containers/Transactions';
import BMR from '../Containers/BMR';
import MeasureResult from '../Containers/MeasureResult';
import StartWorkout from '../Containers/StartWorkout';
import WorkoutSession from '../Containers/WorkoutSession';
// import SuccessSimilarDetails from '../Containers/SuccessSimilarDetails';
// import SuccessSimilarStories from '../Containers/SuccessSimilarStories';
import HelpTerms from '../Containers/Help&Terms';
import font from '../Resources/Fonts';
import { localize } from '../Resources/Strings';
import StartWorkoutPlan from '../Containers/StartWorkoutPlan';
// import Workout from '../Containers/Workout';
import TransactionDetail from '../Containers/TransactionDetail';
import GuidesDetail from '../Containers/GuidesDetail';
import Messages from '../Containers/Messages';
import MessagePlans from '../Containers/MessagePlans';
import MessagePlansDtls from '../Containers/MessagePlansDtls';
import Relief from '../Containers/Relief';
import ReliefDtls from '../Containers/ReliefDtls';
import MessageChat from '../Containers/MessageChat';
import ReleifListing from '../Containers/ReleifListing';
import ChallengesDetails from '../Containers/ChallengesDetails';
import Challenges from '../Containers/Challenges';
import Consultation from '../Containers/Consultation';
import WorkoutDetails from '../Containers/WorkoutDetails'
import GuidesInvidivualList from '../Containers/GuidesInvidivualList';



export const styles1 = StyleSheet.create({
  tabStyle: {
    flex: 1,
    height: 40,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: color.APP_LIGHT_BG_COLOR
  },
});

export const styles = ScaleSheet.create({
  tabHeight: 65,
  tabImage: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  titleTxt: {
    width: 80,
    fontSize: 12,
    marginTop: 2,
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
    textAlign: 'center'
  },
  titleSelTxt: {
    width: 80,
    fontSize: 12,
    marginTop: 2,
    fontFamily: font.NUNITO_BOLD,
    color: color.APP_PINK_COLOR,
    textAlign: 'center'
  }
});


const CommunityStack = createStackNavigator(
  {
    Community: Community,
    Messages: Messages,
    MessagePlans: MessagePlans,
    MessagePlansDtls: MessagePlansDtls,
  }
)

const ReliefStack = createStackNavigator(
  {
    Relief: Relief,
    ReliefDtls: ReliefDtls,
    Reminders: Reminders,
    MessageChat: MessageChat,
    ReleifListing: ReleifListing,
    Consultation: Consultation,
    PaymentMode: PaymentMode,
    PaymentCard: PaymentCard,
    HelpTerms: HelpTerms,
    Messages: Messages,
    MessagePlans: MessagePlans,
    MessagePlansDtls: MessagePlansDtls,
    BlogsListing: BlogsListing,
    BlogsDetails: BlogsDetails,
  }
)

const HomeStack = createStackNavigator(
  {
    Home: Home,
    GuidesListing: GuidesListing,
    GuidesDetail: GuidesDetail,
    ChangePwdHome: ChangePassword,
    CraftPlan: CraftPlan,
    MCQ: MCQ,
    MCQWorkout: MCQWorkout,
    MCQChildQues: MCQChildQues,
    BlogsListing: BlogsListing,
    BlogsDetails: BlogsDetails,
    Challenges: Challenges,
    ChallengesDetails: ChallengesDetails,
    RehabilitationDtls: RehabilitationDtls,
    StartWorkout: StartWorkout,
    StartWorkoutPlan: StartWorkoutPlan,
    WorkoutSession: WorkoutSession,
    WorkoutCatList: WorkoutCatList,
    Workout: Workout,
    ExerciseDetails: ExerciseDetails,
    WorkoutDetails: WorkoutDetails, 
    WaterReminder: WaterReminder,
    Reminders: Reminders,
    BlogsTrendSimilarDtls: BlogsTrendSimilarDtls,
    WorkoutFilter: WorkoutFilter,
    WorkoutList: WorkoutList,
    PaymentMode: PaymentMode,
    PaymentCard: PaymentCard,
    Messages: MessageChat,
    MessagePlans: MessagePlans,
    MessagePlansDtls: MessagePlansDtls,
    MessageChat: MessageChat,
    RehabilitationList: RehabilitationList,
    GuidesInvidivualList: GuidesInvidivualList,
  }, {
  headerMode: 'none',
})

const NutritionStack = createStackNavigator(
  {
    Nutrition: Nutrition,
    FoodListing: FoodListing,
    MealDetails: MealDetails,
    StartMealPlan: StartMealPlan,
    PaymentMode: PaymentMode,
    PaymentCard: PaymentCard,
    PopularMealPlan: PopularMealPlan,
    Reminders: Reminders,
    // Profile: Profile,   
    CraftPlan: CraftPlan,
    // FoodCart: FoodCart,
    MCQ: MCQ,
    Messages: Messages,
    MessagePlans: MessagePlans,
    MessagePlansDtls: MessagePlansDtls,
  }
)

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
    MyDevices: MyDevices,
    Settings: Settings,
    EditProfile: EditProfile,
    WaterReminder: WaterReminder,
    ChangePwdHome: ChangePassword,
    InviteFriend: InviteFriend,
    MyPlan: MyPlan,
    FitnessStats: FitnessStats,
    BodyFat: BodyFat,
    Reminders: Reminders,
    Transactions: Transactions,
    TransactionDetail: TransactionDetail,
    MeasureResult: MeasureResult,
    BMR: BMR,
    HelpTerms: HelpTerms,
    PaymentMode: PaymentMode,
    PaymentCard: PaymentCard,
    Messages: Messages,
    MessagePlans: MessagePlans,
    MessagePlansDtls: MessagePlansDtls,
    Challenges: Challenges,
    ChallengesDetails: ChallengesDetails,
  }
)

ReliefStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (route.routeName === "WorkoutSession" || route.routeName === "Messages" || route.routeName === "MessagePlans" || route.routeName === "MessagePlansDtls" || route.routeName === "Consultation") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}

HomeStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (route.routeName === "Challenges" || route.routeName === "MCQChildQues" || route.routeName === "MCQWorkout" || route.routeName === "WorkoutSession" || route.routeName === "ChallengesDetails" || route.routeName === "CraftPlan" || route.routeName === "Messages" || route.routeName === "MessagePlans" || route.routeName === "MessagePlansDtls"|| route.routeName === "WorkoutDetails") {
        tabBarVisible = false;
      }
      else if (route.routeName === "MCQ") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}

NutritionStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (route.routeName === "CraftPlan" || route.routeName === "Messages" || route.routeName === "MessagePlans" || route.routeName === "MessagePlansDtls") {
        tabBarVisible = false;
      }
      else if (route.routeName === "MCQ") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}

CommunityStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (route.routeName === "Messages" || route.routeName === "MessagePlans" || route.routeName === "MessagePlansDtls") {
        tabBarVisible = false;
      }
      else if (route.routeName === "MCQ") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}

ProfileStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route: any) => {
      if (route.routeName === "Challenges" || route.routeName === "ChallengesDetails" || route.routeName === "InviteFriend") {
        tabBarVisible = false;
      }
      else if (route.routeName === "MCQ") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}



const AppBottomTabNavigator = createBottomTabNavigator({
  Community: {
    screen: CommunityStack,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={[styles1.tabStyle, { borderTopRightRadius: 0 }]}>
          <Image
            source={focused ? Images.TAB_1_SEL : Images.TAB_1}
            style={styles.tabImage}
          />
          <Text style={focused ? styles.titleSelTxt : styles.titleTxt}>{localize.Community}</Text>
        </View>
      )
    }
  },

  Nutrition: {
    screen: NutritionStack,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={[styles1.tabStyle, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
          <Image
            source={focused ? Images.TAB_2_SEL : Images.TAB_2}
            style={styles.tabImage}
          />
          <Text style={focused ? styles.titleSelTxt : styles.titleTxt}>{localize.Nutrition}</Text>
        </View>
      )
    }
  },

  Training: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={[styles1.tabStyle, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
          <Image
            source={focused ? Images.TAB_3_SEL : Images.TAB_3}
            style={styles.tabImage}
          />
          <Text style={focused ? styles.titleSelTxt : styles.titleTxt}>{localize.Training}</Text>
        </View>
      )
    }
  },

  Relief: {
    screen: ReliefStack,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={[styles1.tabStyle, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
          <Image
            source={focused ? Images.TAB_4_SEL : Images.TAB_4}
            style={styles.tabImage}
          />
          <Text style={focused ? styles.titleSelTxt : styles.titleTxt}>{localize.RELIEF_SMALL}</Text>
        </View>
      )
    }
  },

  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: <View />,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={[styles1.tabStyle, { borderTopLeftRadius: 0 }]}>
          <Image
            source={focused ? Images.TAB_5_SEL : Images.TAB_5}
            style={styles.tabImage}
          />
          <Text style={focused ? styles.titleSelTxt : styles.titleTxt}>{localize.Profile}</Text>
        </View>
      )
    }
  },
}, {
  // order: ['Nutrition', 'Home', 'Workout', 'Community', 'Happiness'],
  order: ['Community', 'Nutrition', 'Training', 'Relief', 'Profile'],
  tabBarOptions: {
    style: {
      // borderRadius: 20,
      borderBottomStartRadius: 0,
      borderBottomEndRadius: 0,
      backgroundColor: color.APP_COMMON_BG_COLOR,
      height: styles.tabHeight,
      borderWidth: 0,
      borderTopColor: color.APP_COMMON_BG_COLOR,
    }
  },
})

export default AppBottomTabNavigator;
