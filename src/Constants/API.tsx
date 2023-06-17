
let BASE_URL = 'http://iphoneapps.co.in:9699/api/'
// let BASE_URL = 'http://10.8.0.115:8000/api/'
export const REMINDER_LINK = 'https://www.haquechiropractic.com/';
export const videoBaseUrl = 'http://iphoneapps.co.in:9699/vimeoVideoPlayer?vdo_id=';

const api = {
  POST_LOGIN: BASE_URL + 'login',
  POST_SIGNUP: BASE_URL + 'register',
  POST_GET_DATA: BASE_URL + 'getData',
  POST_GET_DATA_BY_ID: BASE_URL + 'getDataById',
  POST_VERIFY_OTP: BASE_URL + 'verifyUserOtp',
  POST_RESEND_OTP: BASE_URL + 'resendOtp',
  POST_FORGOT_PWD: BASE_URL + 'forgotPassword',
  POST_VERIFY_FORGOT_OTP: BASE_URL + 'verifyForgotUserOtp',
  POST_CHANGE_PASSWORD: BASE_URL + 'changePassword',
  POST_CHANGE_FORGOT_PASSWORD: BASE_URL + 'changeForgotPassword',
  POST_SOCIAL_LOGIN: BASE_URL + 'socialLogin',
  POST_USER_MEAL_PLAN: BASE_URL + 'getUserMealPlanData',
  POST_USER_MEAL_PLAN_DAY: BASE_URL + 'getUserMealPlanDaysData',
  POST_SAVE_USER_MEAL_PLAN: BASE_URL + 'saveUserMealPlan',
  POST_ADD_CARD: BASE_URL + 'addCard',
  GET_CARD: BASE_URL + 'getCard',
  REMOVE_CARD: BASE_URL + 'removeCard',
  POST_PAYMENT: BASE_URL + 'payment',
  GET_QUESTIONS_ANSWER: BASE_URL + 'getQuestionAnswers?plan_type=',
  GET_RECOMMENDED_PLANS: BASE_URL + 'getRecommendedPlans',
  GET_TRANSACTIONS: BASE_URL + 'getTransaction',
  GET_USER_PROFILE: BASE_URL + 'getUserProfile',
  GET_UPDATE_USER_INFO: BASE_URL + 'updateUserInformation',
  POST_MEAL_LOG_SAVE: BASE_URL + 'mealLogSave',
  GET_MEAL_LOG: BASE_URL + 'getMealLog',
  GET_MEAL_LOG_GRAPH: BASE_URL + 'getMealLogGraph',
  GET_CATEGORY_EXERCISES: BASE_URL + 'getWorkoutCategoryExcercises?category=',
  ADD_LIKE: BASE_URL + 'addLike',
  GET_TRANSACTION: BASE_URL + 'getTransactionDetail?',
  GET_USER_WORKOUT_PLAN_DATA: BASE_URL + 'getUserWorkoutPlanData',
  POST_SAVE_WORKOUT_PROGESS: BASE_URL + 'saveUserWorkoutProgress',
  GET_FOOD_ITEMS: BASE_URL + 'getFoodItems?item=',
  POST_ADD_REMINDER: BASE_URL + 'addWaterRemider',
  GET_REMINDERS: BASE_URL + 'getWaterRemider',
  POST_UPLOAD_AVATAR: BASE_URL + 'uploadAvataar', 
  POST_LOGOUT_USER: BASE_URL + 'logoutUser',
  GET_DELETE_ACCOUNT: BASE_URL + 'deleteAccount',
  GET_MY_PLANS: BASE_URL + 'myPlans',
  GET_MCQ: BASE_URL + 'getMcqs',
  
  GOOGLE_FIT_API: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
}

export default api