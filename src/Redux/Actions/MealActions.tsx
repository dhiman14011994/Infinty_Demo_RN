import mealKeys from "../Constants/MealsKeys";

export const getMealPlans = (data: any) => ({
  type: mealKeys.GET_MEAL_PLANS,
  payload: data,
});

export const saveMealPlans = (data: any) => ({
  type: mealKeys.SAVE_MEAL_PLANS,
  payload: data,
});

export const getRecomMealPlans = (data: any) => ({
  type: mealKeys.GET_RECOMMENDED_MEAL_PLANS,
  payload: data,
});

export const updateRecomendStatus = (data: any) => ({
  type: mealKeys.RECOMMEND_STATUS,
  payload: data,
});


export const saveRecomMealPlans = (data: any) => ({
  type: mealKeys.SAVE_RECOMENDED_MEAL_PLANS,
  payload: data,
});

export const saveSrchMealPlans = (data: any) => ({
  type: mealKeys.SAVE_SRCH_MEAL_PLANS,
  payload: data,
});

export const getUserMealPlans = (data: any) => ({
  type: mealKeys.GET_USER_MEAL_PLANS,
  payload: data,
});

export const saveUserMealPlans = (data: any) => ({
  type: mealKeys.SAVE_USER_MEAL_PLANS,
  payload: data,
});

export const getUserMealPlansDay = (data: any) => ({
  type: mealKeys.GET_USER_MEAL_PLANS_DAY,
  payload: data,
});

export const saveUserMealPlansDay = (data: any) => ({
  type: mealKeys.SAVE_USER_MEAL_PLANS_DAY,
  payload: data,
});

export const getMealPlansDtls = (data: any) => ({
  type: mealKeys.GET_MEAL_PLAN_DTLS,
  payload: data,
});

export const saveMealPlansDtls = (data: any) => ({
  type: mealKeys.SAVE_MEAL_PLANS_DTLS,
  payload: data,
});

export const getFoods = (data: any) => ({
  type: mealKeys.GET_FOODS,
  payload: data,
});

export const getAddedFoods = (data: any) => ({
  type: mealKeys.GET_ADDED_FOODS,
  payload: data,
});

export const saveFoods = (data: any) => ({
  type: mealKeys.SAVE_FOODS,
  payload: data,
});

export const saveAddedFoods = (data: any) => ({
  type: mealKeys.SAVE_ADDED_FOODS,
  payload: data,
});

export const addMealLog = (data: any) => ({
  type: mealKeys.ADD_MEAL_LOG,
  payload: data,
});

export const saveMealLog = (data: any) => ({
  type: mealKeys.MEAL_LOG_RESP,
  payload: data,
});

export const getLoggedMeal = (data: any) => ({
  type: mealKeys.GET_LOGGED_MEAL,
  payload: data,
});

export const saveLoggedMeal = (data: any) => ({
  type: mealKeys.SAVE_LOGGED_MEAL,
  payload: data,
});

export const getFoodDtls = (data: any) => ({
  type: mealKeys.GET_FOOD_DTLS,
  payload: data,
});

export const saveFoodDtls = (data: any) => ({
  type: mealKeys.SAVE_FOOD_DTLS,
  payload: data,
});

export const getLoggedData = (data: any) => ({
  type: mealKeys.GET_LOGGED_DATA,
  payload: data,
});

export const saveLoggedData = (data: any) => ({
  type: mealKeys.SAVE_LOGGED_DATA,
  payload: data,
});

export const updateMealExpStat= (data: any) => ({
  type: mealKeys.UPDATE_MEAL_EXPIRE_STATUS,
  payload: data,
});
