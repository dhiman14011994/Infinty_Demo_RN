
import { put } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert, Modal } from 'react-native';
import { MealPlan, UserMealPlan, MealPlanDetail, WeeksData, UserWeekDayMeal, FooItem, DaysData, Food, LoggedMeal, LoggedFood, MealLogged, GraphData, FoodDtls } from '../../Modals/MealModl';
import { saveMealPlans, saveUserMealPlans, saveSrchMealPlans, saveMealPlansDtls, saveUserMealPlansDay, saveFoods, saveRecomMealPlans, updateRecomendStatus, saveMealLog, saveLoggedMeal, saveFoodDtls, saveLoggedData, updateMealExpStat } from '../Actions/MealActions';
import { apiStart } from '../Actions/CommonActions';
import { RecWorkout, RecWorkoutDtls } from '../../Modals/WorkoutModl';
import { saveRecomWorkPlans, saveRecPlansDtls } from '../Actions/WorkoutsActions';


//Meal Plan Api 
export function* getMealPlansList(params: any, token: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_GET_DATA, params, header);
    const modlData = yield setMealPlanData(response.success)
    if (params.filters == undefined) {
      yield put(saveMealPlans(modlData));
    }
    else {
      yield put(saveSrchMealPlans(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Meal Plan Api 
export function* getRecMealPlansList(params: any, token: any, type: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    console.log('APPI >>>>>>> ', api.GET_RECOMMENDED_PLANS)

    const response = yield RequestManager.postRequest(api.GET_RECOMMENDED_PLANS, params, header);
    let empetyData = false;
    if (type == 1) {
      const modlData = yield setMealPlanData(response.success)
      empetyData = modlData.length > 0 ? true : false;
      yield put(saveRecomMealPlans(modlData));
    }
    else {
      const modlData = yield setWorkoutPlanData(response.success)
      empetyData = modlData.length > 0 ? true : false;
      yield put(saveRecomWorkPlans(modlData));
    }
    yield put(updateRecomendStatus(empetyData))

  } catch (e) {
    Alert.alert('', e.error)
    yield put(updateRecomendStatus(false))
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setMealPlanData(response: any) {
  return await new Promise(function (resolve, reject) {
    let storyArr: MealPlan[] = [] as MealPlan[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let story: MealPlan = {
        id: data.id,
        title: data.title,
        enabled: data.enabled,
        image: data.image,
        about: data.about,
        duration: data.duration,
        duration_type: data.duration_type,
        duration_description: data.duration_description,
        price: data.price,
      }
      storyArr.push(story);
    }
    resolve(storyArr)
  })
}

async function setWorkoutPlanData(response: any) {
  return await new Promise(function (resolve, reject) {
    let storyArr: RecWorkout[] = [] as RecWorkout[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let story: RecWorkout = {
        id: data.id,
        title: data.title,
        enabled: data.enabled,
        image: data.image,
        about: data.about,
        three_months_description: data.three_months_description,
        six_months_description: data.six_months_description,
        year_description: data.year_description,
        three_months_price: data.three_months_price,
        six_months_price: data.six_months_price,
        year_price: data.year_price,
        min_bmi: data.min_bmi,
        max_bmi: data.max_bmi,
      }
      storyArr.push(story);
    }
    resolve(storyArr)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//User Meal Plan Api 
export function* getUserMealPlansList(params: any, token: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_USER_MEAL_PLAN, params, header);
    const modlData = yield setUserMealPlanData(response.success)
    yield put(saveUserMealPlans(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    if (e.error == 'Your meal plan is expired!!') {
      yield put(updateMealExpStat(true));
    }
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setUserMealPlanData(response: any) {
  return await new Promise(function (resolve, reject) {
    let mealArr: WeeksData[] = [] as WeeksData[];
    for (let i = 0; i < response.weeksData.length; i++) {
      let data = response.weeksData[i]
      let weekData: WeeksData = {
        title: data.title,
        image: data.image,
        sub_title: data.sub_title,
        week_no: data.week_no,
      }
      mealArr.push(weekData);
    }
    let meal: UserMealPlan = {
      mainData: {
        mtitle: response.mainData.mtitle,
        current_week: response.mainData.current_week,
      },
      weeksData: mealArr,
    }
    resolve(meal)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//User Weekly Meal Plan Api 
export function* getUserWeeklyMealList(params: any, token: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_USER_MEAL_PLAN_DAY, params, header);
    const modlData = yield setUserWeeklyMealPlanData(response.success)
    yield put(saveUserMealPlansDay(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

async function setUserWeeklyMealPlanData(response: any) {
  return await new Promise(function (resolve, reject) {

    let daysData: DaysData[] = [];
    let breakFastArr: FooItem[] = [] as FooItem[];
    for (let i = 0; i < response.daysData.fooItems.breakfast.length; i++) {
      let item = response.daysData.fooItems.breakfast[i];
      let food: FooItem = {
        id: item.id,
        title: item.title,
        serving: item.serving,
        total_calories: item.total_calories,
        time: item.time,
        carbs: item.carbs,
        fibre: item.fibre,
        protien: item.protien,
        saturated_fat: item.saturated_fat,
        sugar: item.sugar,
        unsaturated_fat: item.unsaturated_fat,
      }
      breakFastArr.push(food)
    }
    daysData.push({ day: 'Breakfast', fooItems: breakFastArr })

    let lunchArr: FooItem[] = [] as FooItem[];
    for (let i = 0; i < response.daysData.fooItems.lunch.length; i++) {
      let item = response.daysData.fooItems.lunch[i];
      let food: FooItem = {
        id: item.id,
        title: item.title,
        serving: item.serving,
        total_calories: item.total_calories,
        time: item.time,
        carbs: item.carbs,
        fibre: item.fibre,
        protien: item.protien,
        saturated_fat: item.saturated_fat,
        sugar: item.sugar,
        unsaturated_fat: item.unsaturated_fat,
      }
      lunchArr.push(food)
    }
    daysData.push({ day: 'Lunch', fooItems: lunchArr })

    let snacksArr: FooItem[] = [] as FooItem[];
    for (let i = 0; i < response.daysData.fooItems.snacks.length; i++) {
      let item = response.daysData.fooItems.snacks[i];
      let food: FooItem = {
        id: item.id,
        title: item.title,
        serving: item.serving,
        total_calories: item.total_calories,
        time: item.time,
        carbs: item.carbs,
        fibre: item.fibre,
        protien: item.protien,
        saturated_fat: item.saturated_fat,
        sugar: item.sugar,
        unsaturated_fat: item.unsaturated_fat,
      }
      snacksArr.push(food)
    }
    daysData.push({ day: 'Snacks', fooItems: snacksArr })

    let dinnerArr: FooItem[] = [] as FooItem[];
    for (let i = 0; i < response.daysData.fooItems.dinner.length; i++) {
      let item = response.daysData.fooItems.dinner[i];
      let food: FooItem = {
        id: item.id,
        title: item.title,
        serving: item.serving,
        total_calories: item.total_calories,
        time: item.time,
        carbs: item.carbs,
        fibre: item.fibre,
        protien: item.protien,
        saturated_fat: item.saturated_fat,
        sugar: item.sugar,
        unsaturated_fat: item.unsaturated_fat,
      }
      dinnerArr.push(food)
    }
    daysData.push({ day: 'Dinner', fooItems: dinnerArr })


    let meal: UserWeekDayMeal = {
      mainData: {
        week: response.mainData.mtitle,
        current_day: response.mainData.current_week,
      },
      daysData: daysData,
    }
    resolve(meal)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//Meal Plan Detail Api 
export function* getMeailPlanDetails(params: any, token: any, type: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header);
    if (type == 1) {
      const modlData = yield setMealPlanDtlsData(response.success)
      yield put(saveMealPlansDtls(modlData));
    }
    else {
      const modlData = yield seWorkoutPlanDtlsData(response.success)
      yield put(saveRecPlansDtls(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setMealPlanDtlsData(response: any) {
  return await new Promise(function (resolve, reject) {
    let dtls: MealPlanDetail = {
      id: response.id,
      title: response.title,
      about: response.about,
      three_months_description: response.three_months_description,
      six_months_description: response.six_months_description,
      one_month_description: response.one_month_description,
      three_months_price: response.three_months_price,
      six_months_price: response.six_months_price,
      one_month_price: response.one_month_price,
      min_bmi: response.min_bmi,
      max_bmi: response.max_bmi,
      enabled: response.enabled,
      image: response.image,
      count: response.count,
    }
    resolve(dtls)
  })
}

//Creating stories modl array from raw data
async function seWorkoutPlanDtlsData(response: any) {
  return await new Promise(function (resolve, reject) {
    let dtls: RecWorkoutDtls = {
      id: response.id,
      title: response.title,
      about: response.about,
      three_months_description: response.three_months_description,
      six_months_description: response.six_months_description,
      one_month_description: response.one_month_description,
      three_months_price: response.three_months_price,
      six_months_price: response.six_months_price,
      one_month_price: response.one_month_price,
      min_bmi: response.min_bmi,
      max_bmi: response.max_bmi,
      enabled: response.enabled,
      image: response.image,
      video: response.video == null ? '' : response.video,
      count: response.count,
    }
    resolve(dtls)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//Foods Api 
export function* getFoodList(key: any, token: any) {
  try {
    const response = yield RequestManager.getRequest(api.GET_FOOD_ITEMS + key, token);
    const modlData = yield setFoodsData(response.success)
    yield put(saveFoods(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setFoodsData(response: any) {
  return await new Promise(function (resolve, reject) {
    let foodArr: Food[] = [] as Food[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let weekData: Food = {
        title: data.title,
        total_calories: data.total_calories,
        saturated_fat: data.saturated_fat,
        carbs: data.carbs,
        protien: data.protien,
        id: data.id,
        about: data.about,
        qty: 0,
      }
      foodArr.push(weekData);
    }
    resolve(foodArr)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//Meal Log Api 
export function* saveLogMeal(params: any, token: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    const response = yield RequestManager.postRequest(api.POST_MEAL_LOG_SAVE, params, header);
    yield put(saveMealLog(true));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//-------------------------------------------------------
//-------------------------------------------------------
//Meal Log Api 
export function* getLoggedMealData(endPoint: string, token: any) {
  try {
    const response = yield RequestManager.getRequest(api.GET_MEAL_LOG + endPoint, token);
    const modlData = yield setLogData(response.success)
    yield put(saveLoggedMeal(modlData));
  } catch (e) {
    if (e.error != 'No Item added to your today meal log!!') {
      Alert.alert('', e.error)
    }
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setLogData(response: any) {
  return await new Promise(function (resolve, reject) {
    let logArr: LoggedMeal[] = [] as LoggedMeal[];

    let breakArr: LoggedFood[] = [];
    let lunchArr: LoggedFood[] = [];
    let snacksArr: LoggedFood[] = [];
    let dinnerArr: LoggedFood[] = [];

    for (let i = 0; i < response.length; i++) {
      let data = response[i]
      let log: LoggedFood = {
        title: data.title,
        about: data.about,
        carbs: data.carbs,
        protien: data.protien,
        saturated_fat: data.saturated_fat,
        serving: data.serving,
        schedule_time: data.schedule_time,
        id: data.id,
        total_calories: data.total_calories,
      }
      switch (data.schedule_time) {
        case 0:
          breakArr.push(log);
          break;

        case 1:
          lunchArr.push(log);
          break;

        case 2:
          snacksArr.push(log);
          break;

        case 3:
          dinnerArr.push(log);
          break;

        default:
          break;
      }
    }
    logArr.push({ title: 'Breakfast', foods: breakArr });
    logArr.push({ title: 'Lunch', foods: lunchArr });
    logArr.push({ title: 'Snacks', foods: snacksArr });
    logArr.push({ title: 'Dinner', foods: dinnerArr });
    resolve(logArr)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//Foods Api 
export function* getFoodData(params: any, token: any) {
  try {

    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    const response = yield RequestManager.postRequest(api.POST_GET_DATA_BY_ID, params, header);
    const modlData = yield setFoodData(response.success)
    yield put(saveFoodDtls(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating stories modl array from raw data
async function setFoodData(response: any) {
  return await new Promise(function (resolve, reject) {
    let foodData: FoodDtls = {
      title: response.title,
      about: response.about,
      carbs: response.carbs,
      enabled: response.enabled,
      fibre: response.fibre,
      id: response.id,
      image: response.image,
      kcal: response.kcal,
      protien: response.protien,
      saturated_fat: response.saturated_fat,
      sugar: response.sugar,
      total_calories: response.total_calories,
      unsaturated_fat: response.unsaturated_fat,
      qty: 0,
    }
    resolve(foodData)
  })
}
//-------------------------------------------------------
//-------------------------------------------------------
//Meal Log Api 
export function* getLoggedFoodData(endPoint: string, token: any) {
  try {
    const response = yield RequestManager.getRequest(api.GET_MEAL_LOG_GRAPH + endPoint, token);
    const modlData = yield setMealLogData(response.success)
    yield put(saveLoggedData(modlData));
  } catch (e) {
    Alert.alert('', e.error)
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

async function setMealLogData(response: any) {
  return await new Promise(function (resolve, reject) {

    let planGraphData: GraphData[] = [];
    if (response.planGraphData == undefined) {
      planGraphData = [];
    }
    else {
      for (let i = 0; i < response.planGraphData.length; i++) {
        const element = response.planGraphData[i];
        let graphData: GraphData = {
          date: element.date,
          total_calories: element.total_calories,
          day: element.day,
        }
        planGraphData.push(graphData)
      }
    }

    let logGraphData: GraphData[] = [];
    if (response.logGraphData == undefined) {
      logGraphData = [];
    }
    else {
      for (let i = 0; i < response.logGraphData.length; i++) {
        const element = response.logGraphData[i];
        let graphData: GraphData = {
          date: element.date,
          total_calories: element.total_calories,
          day: element.day,
        }
        logGraphData.push(graphData)
      }
    }

    let logData: MealLogged = {
      planGraphData: planGraphData,
      logGraphData: logGraphData,
      suggested_total_calories: response.suggested_total_calories,
    }
    resolve(logData)
  })
}