
import mealKeys from '../Constants/MealsKeys';
import { MealPlan, MealPlanDetail, UserMealPlan, UserWeekDayMeal, Food, LoggedMeal, MealLogged } from '../../Modals/MealModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  mealPlans: [] as MealPlan[],
  recMealPlans: [] as MealPlan[],
  srchedMealPlans: [] as MealPlan[],
  userMealPlans: undefined as any as UserMealPlan,
  mealPlanDtls: undefined as any as MealPlanDetail,
  userWeekPlan: undefined as any as UserWeekDayMeal,
  foods: [] as Food[],
  addedFood: [] as Food[],
  foodDtls: undefined as any as Food,
  loggedMeal: [] as LoggedMeal[],
  mealLogged: undefined as any as MealLogged,
  isLoaderVisible: false,
  recomendFound: false,
  mealLogResp: false,
  isExpired: false,
}

export default function mealReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        mealPlans: [],
        recMealPlans: [],
        srchedMealPlans: [],
        userMealPlans: undefined,
        mealPlanDtls: undefined,
        userWeekPlan: undefined,
        foods: [],
        addedFood: [],
        foodDtls: undefined,
        loggedMeal: [],
        mealLogged: undefined,
        isLoaderVisible: false,
        recomendFound: false,
        mealLogResp: false,
        isExpired: false,
      };

    case mealKeys.SAVE_MEAL_PLANS:
      return {
        ...state,
        mealPlans: action.payload
      };

    case mealKeys.SAVE_RECOMENDED_MEAL_PLANS:
      return {
        ...state,
        recMealPlans: action.payload
      };

    case mealKeys.RECOMMEND_STATUS:
      return {
        ...state,
        recomendFound: action.payload
      };

    case mealKeys.SAVE_SRCH_MEAL_PLANS:
      return {
        ...state,
        srchedMealPlans: action.payload
      };

    case mealKeys.SAVE_USER_MEAL_PLANS:
      return {
        ...state,
        userMealPlans: action.payload
      };

    case mealKeys.SAVE_MEAL_PLANS_DTLS:
      return {
        ...state,
        mealPlanDtls: action.payload
      };

    case mealKeys.SAVE_USER_MEAL_PLANS_DAY:
      return {
        ...state,
        userWeekPlan: action.payload
      };

    case mealKeys.SAVE_FOODS:
      return {
        ...state,
        foods: action.payload
      };

    case mealKeys.SAVE_ADDED_FOODS:
      return {
        ...state,
        addedFood: action.payload
      };

    case mealKeys.MEAL_LOG_RESP:
      return {
        ...state,
        mealLogResp: action.payload
      };

    case mealKeys.SAVE_LOGGED_MEAL:
      return {
        ...state,
        loggedMeal: action.payload
      };

    case mealKeys.SAVE_FOOD_DTLS:
      return {
        ...state,
        foodDtls: action.payload
      };

    case mealKeys.SAVE_LOGGED_DATA:
      return {
        ...state,
        mealLogged: action.payload
      };

    case mealKeys.UPDATE_MEAL_EXPIRE_STATUS:
      return {
        ...state,
        isExpired: action.payload
      };

    default:
      return state;
  }
}
