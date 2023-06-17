
import { takeLatest, put } from 'redux-saga/effects'

import loginKeys from '../Constants/LoginKeys';
import blogsKeys from '../Constants/BlogsKeys';
import storiesKeys from '../Constants/StoriesKeys';
import workoutKeys from '../Constants/WorkoutKeys';
import bannerKeys from "../Constants/BannerKeys";
import passwordKeys from '../Constants/PasswordsKeys';
import mealKeys from '../Constants/MealsKeys';
import paymentKeys from '../Constants/PaymentKeys';
import ReliefKeys from '../Constants/ReliefKeys';


import { getBlogsList, getBlogDetail, addLike, getLike } from '../ReduxAPIHandler/BlogApis';
import { loginUser, signupUser, verifyOtp, resendOtp, socialLogin, userProfileApi, updateUserInfo } from '../ReduxAPIHandler/LoginApis';
import { getStoriesList, getStoriesDtls } from '../ReduxAPIHandler/StoriesApis';
import { getExerciseCatList, getExeWorkDetails, getWorkDetails, getUserWorkoutPlan, saveWorkoutProgress } from '../ReduxAPIHandler/WorkoutApis';
import { getBannerList } from '../ReduxAPIHandler/BannerApis';
import { sendForgotPwdOtp, verifyForgotOtp, changePassword } from '../ReduxAPIHandler/ForgotPwdApis';
import { getMealPlansList, getUserMealPlansList, getUserWeeklyMealList, getMeailPlanDetails, getFoodList, getRecMealPlansList, saveLogMeal, getLoggedMealData, getFoodData, getLoggedFoodData } from '../ReduxAPIHandler/MealAPis';
import { getCardsList, addCard, purchasePlan, removeCard } from '../ReduxAPIHandler/PaymentApis';
import { getTransactions, getTermsFAQ, getTransactionDtls } from '../ReduxAPIHandler/CommonApi';
import { YellowBox } from 'react-native';
import { commonKeys } from '../Constants/CommonKeys';
import { guidesKeys } from '../Constants/GuidesKeys';
import { getGuidesList, getGuidesDtls } from '../ReduxAPIHandler/GuidesApi';
import reminderKeys from '../Constants/ReminderKeys';
import { addReminder, getRemindersApi, getUserReminderApi, getUserNotificationsApi } from '../ReduxAPIHandler/ReminderApis';
import { getHomeRemediesDataList,getHomeRemediesDetails,getReliefExerciseDetails,getReliefExerciseDataList} from '../ReduxAPIHandler/ReliefApis';


function* login(params: any) {
  yield loginUser(params.payload);
}

function* ssLogin(params: any) {
  yield socialLogin(params.payload);
}

function* register(params: any) {
  yield signupUser(params.data);
}

function* verfyUserOtp(params: any) {
  yield verifyOtp(params.data);
}

function* sendUserOtp(params: any) {
  console.log('PARAMS": ', params)
    , yield resendOtp(params.data.token);
}

function* getBlogs(params: any) {
  yield getBlogsList(params.data.params, params.data.token);
}

function* getFeaturedBlogs(params: any) {
  yield getBlogsList(params.data.params, params.data.token);
}

function* getTrendsBlogs(params: any) {
  yield getBlogsList(params.data.params, params.data.token);
}

function* getBlogDetails(params: any) {
  yield getBlogDetail(params.payload.params, params.payload.token, 0);
}

function* getSimilarBlogDetails(params: any) {
  yield getBlogDetail(params.payload.params, params.payload.token, 1);
}

function* addBlogLike(params: any) {
  yield addLike(params.payload.params, params.payload.token);
}

function* getStories(params: any) {
  yield getStoriesList(params.data.params, params.data.token, 1);
}

function* getSimilarStories(params: any) {
  yield getStoriesList(params.payload.params, params.payload.token, 2);
}

function* getBannerStories(params: any) {
  yield getStoriesList(params.payload.params, params.payload.token, 3);
}

function* getStoriesDetails(params: any) {
  yield getStoriesDtls(params.payload.params, params.payload.token, 0);
}

function* getSimilarStoriesDetails(params: any) {
  yield getStoriesDtls(params.payload.params, params.payload.token, 1);
}

function* getCatWorkouDtls(params: any) {
  yield getWorkDetails(params.payload.params, params.payload.token);
}

function* getWorkoutCat(params: any) {
  yield getExerciseCatList(params.data.params, params.data.token, params.data.isCat);
}

function* getWorkoutCatDtls(params: any) {
  yield getExeWorkDetails(params.payload.params, params.payload.token, params.payload.isCat);
}

function* getBanners(params: any) {
  yield getBannerList(params.payload.params, params.payload.token, params.payload.type);
}

function* forGotPassword(params: any) {
  yield sendForgotPwdOtp(params.payload);
}

function* forgotVerifyOtp(params: any) {
  yield verifyForgotOtp(params.payload);
}

function* changeUserPassword(params: any) {
  yield changePassword(params.payload);
}

function* mealPansApi(params: any) {
  yield getMealPlansList(params.payload.params, params.payload.token);
}
function* recMealPansApi(params: any) {
  console.log('hi,')
  yield getRecMealPlansList(params.payload.params, params.payload.token, params.payload.type);
}

function* userMealPansApi(params: any) {
  yield getUserMealPlansList(params.payload.params, params.payload.token);
}

function* userWeeklyMealApi(params: any) {
  yield getUserWeeklyMealList(params.payload.params, params.payload.token);
}

function* mealDtlsApi(params: any) {
  yield getMeailPlanDetails(params.payload.params, params.payload.token, params.payload.type);
}

function* purchasePlans(params: any) {
  yield purchasePlan(params.payload.params, params.payload.token);
}

function* getCards(params: any) {
  yield getCardsList(params.payload.token);
}

function* addCards(params: any) {
  yield addCard(params.payload.params, params.payload.token);
}

function* removeCards(params: any) {
  yield removeCard(params.payload.params, params.payload.token);
}

function* getFoods(params: any) {
  yield getFoodList(params.payload.params, params.payload.token);
}

function* getFoodDtls(params: any) {
  yield getFoodData(params.payload.params, params.payload.token);
}

function* logFood(params: any) {
  yield saveLogMeal(params.payload.params, params.payload.token);
}

function* loggedFood(params: any) {
  yield getLoggedMealData(params.payload.endPoint, params.payload.token);
}

function* loggedData(params: any) {
  yield getLoggedFoodData(params.payload.endPoint, params.payload.token);
}

function* getUserTransactions(params: any) {
  yield getTransactions(params.payload.token);
}

function* getUserTransaction(params: any) {
  yield getTransactionDtls(params.payload.token, params.payload.endPoint);
}

function* userProfile(params: any) {
  yield userProfileApi(params.payload.token);
}

function* updateProfile(params: any) {
  yield updateUserInfo(params.payload.params, params.payload.token, params.payload.isSingle, params.payload.isEdit);
}

function* getTermsInfo(params: any) {
  yield getTermsFAQ(params.payload);
}

function* getUserWorkout(params: any) {
  yield getUserWorkoutPlan(params.payload.params, params.payload.token);
}

function* saveProgress(params: any) {
  yield saveWorkoutProgress(params.payload.params, params.payload.token);
}

// function* getGuides(params: any) {
//   yield getGuidesList(params.payload.params, params.payload.token, 0);
// }

// function* getSimilarGuides(params: any) {
//   yield getGuidesList(params.payload.params, params.payload.token, 1);
// }

// function* getBannerGuides(params: any) {
//   yield getGuidesList(params.payload.params, params.payload.token, 2);
// }

// function* getGuidesDetails(params: any) {
//   yield getGuidesDtls(params.payload.params, params.payload.token, 0);
// }

// function* getSimilarGuidesDetails(params: any) {
//   yield getGuidesDtls(params.payload.params, params.payload.token, 1);
// }

function* addRemiderApi(params: any) {
  yield addReminder(params.payload.params, params.payload.token);
}

function* getReminders(params: any) {
  yield getRemindersApi(params.payload.params, params.payload.token);
}

function* getuserReminder(params: any) {
  yield getUserReminderApi(params.payload.token);
}

function* getuserNotifications(params: any) {
  yield getUserNotificationsApi(params.payload.params, params.payload.token);
}

function* getPostLikes(params: any) {
  yield getLike(params.payload.params, params.payload.token);
}
function* getHomeRemedies(params: any) {
  yield getHomeRemediesDataList(params.data.params, params.data.token, params.data.isCat);
}

function* getReliefExercise(params: any) {
  yield getReliefExerciseDataList(params.data.params, params.data.token, params.data.isCat);
}
function* getHomeRemediesDetail(params: any) {
  yield getHomeRemediesDetails(params.data.params, params.data.token, );
}

function* getReliefExerciseDetail(params: any) {
  yield getReliefExerciseDetails(params.data.params, params.data.token);
}

export default function* rootSaga() {
  yield takeLatest(loginKeys.LOGIN, login);
  yield takeLatest(loginKeys.SOCIAL_LOGIN, ssLogin);
  yield takeLatest(loginKeys.SIGNUP, register);
  yield takeLatest(loginKeys.VERIFY_OTP, verfyUserOtp);
  yield takeLatest(loginKeys.SEND_OTP, sendUserOtp);
  yield takeLatest(loginKeys.GET_USER_INFO, userProfile);
  yield takeLatest(loginKeys.UPDATE_USER_INFO, updateProfile);

  yield takeLatest(blogsKeys.GET_BLOGS, getBlogs);
  yield takeLatest(blogsKeys.GET_FEATURED_BLOGS, getFeaturedBlogs);
  yield takeLatest(blogsKeys.GET_TREND_BLOGS, getTrendsBlogs);
  yield takeLatest(blogsKeys.GET_BLOG_DETAILS, getBlogDetails);
  yield takeLatest(blogsKeys.GET_SIMILAR_BLOG_DETAILS, getSimilarBlogDetails);
  yield takeLatest(blogsKeys.ADD_BLOG_LIKE, addBlogLike);
  yield takeLatest(blogsKeys.GET_BLOG_LIKE, getPostLikes);

  yield takeLatest(storiesKeys.GET_STORIES, getStories);
  yield takeLatest(storiesKeys.GET_SIMILAR_STORIES, getSimilarStories);
  yield takeLatest(storiesKeys.GET_BANNER_STORIES, getBannerStories);
  yield takeLatest(storiesKeys.GET_STORIES_DETAILS, getStoriesDetails);
  yield takeLatest(storiesKeys.GET_SIMILAR_STORIES_DETAILS, getSimilarStoriesDetails);

  yield takeLatest(workoutKeys.GET_EXERCISES_CAT, getWorkoutCat);
  yield takeLatest(workoutKeys.GET_EXERCISES_CAT_DTLS, getWorkoutCatDtls);
  yield takeLatest(workoutKeys.GET_WORKOUTS, getWorkoutCat);
  yield takeLatest(workoutKeys.GET_CAT_WORKOUTS_DTLS, getCatWorkouDtls);
  yield takeLatest(workoutKeys.GET_USER_PLAN_DATA, getUserWorkout);
  yield takeLatest(workoutKeys.SAVE_WORKOUT_PROGRESS, saveProgress);

  yield takeLatest(bannerKeys.GET_DB_BANNER, getBanners);

  yield takeLatest(passwordKeys.FORGOT_PASSWORD, forGotPassword);
  yield takeLatest(passwordKeys.VERIFY_FORGOT_OTP, forgotVerifyOtp);
  yield takeLatest(passwordKeys.CHANGE_PASSWORD, changeUserPassword);

  yield takeLatest(mealKeys.GET_MEAL_PLANS, mealPansApi);
  yield takeLatest(mealKeys.GET_RECOMMENDED_MEAL_PLANS, recMealPansApi);
  yield takeLatest(mealKeys.GET_USER_MEAL_PLANS, userMealPansApi);
  yield takeLatest(mealKeys.GET_USER_MEAL_PLANS_DAY, userWeeklyMealApi);
  yield takeLatest(mealKeys.GET_MEAL_PLAN_DTLS, mealDtlsApi);
  yield takeLatest(mealKeys.GET_FOODS, getFoods);
  yield takeLatest(mealKeys.GET_FOOD_DTLS, getFoodDtls);
  yield takeLatest(mealKeys.ADD_MEAL_LOG, logFood);
  yield takeLatest(mealKeys.GET_LOGGED_MEAL, loggedFood);
  yield takeLatest(mealKeys.GET_LOGGED_DATA, loggedData);

  // yield takeLatest(guidesKeys.GET_GUIDES_LIST, getGuides);
  // yield takeLatest(guidesKeys.GET_SIMILAR_GUIDE, getSimilarGuides);
  // yield takeLatest(guidesKeys.GET_GUIDE_BANNER, getBannerGuides);
  // yield takeLatest(guidesKeys.GET_GUIDE_DTLS, getGuidesDetails);
  // yield takeLatest(guidesKeys.GET_GUIDE_DTLS, getSimilarGuidesDetails);

  yield takeLatest(paymentKeys.PURCHASE_PLAN, purchasePlans);
  yield takeLatest(paymentKeys.GET_CARDS, getCards);
  yield takeLatest(paymentKeys.ADD_CARD, addCards);
  yield takeLatest(paymentKeys.REMOVE_CARD, removeCards);

  yield takeLatest(commonKeys.GET_TRANSACTIONS, getUserTransactions);
  yield takeLatest(commonKeys.GET_TRANSACTIONS_DTLS, getUserTransaction);
  yield takeLatest(commonKeys.GET_TERMS_DATA, getTermsInfo);

  yield takeLatest(reminderKeys.SAVE_REMINDER, addRemiderApi);
  yield takeLatest(reminderKeys.GET_REMINDERS, getReminders);
  yield takeLatest(reminderKeys.GET_USER_REMINDER, getuserReminder);
  yield takeLatest(reminderKeys.GET_USER_NOTIFICATION, getuserNotifications);

  yield takeLatest(ReliefKeys.GET_HOMEREMEDIES, getHomeRemedies);
  yield takeLatest(ReliefKeys.GET_HOMEREMEDIES_DTLS, getHomeRemediesDetail);
  yield takeLatest(ReliefKeys.GET_RELIEFEXERCISE, getReliefExercise);
  yield takeLatest(ReliefKeys.GET_RELIEFEXERCISE_DTLS, getReliefExerciseDetail);
}