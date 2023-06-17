/* eslint-disable eqeqeq */
import { put } from 'redux-saga/effects';
import api from '../../Constants/API';
import RequestManager from '../../APIManager';
import { commonKeys } from '../Constants/CommonKeys';
import { Alert } from 'react-native';
import {
  WorkoutCat,
  Workouts,
  ExerciseCatDtls,
  Excercise,
  UserWorkout,
  PlanData,
  CategoryData,
  Excercis,
} from '../../Modals/WorkoutModl';
import {
  saveExerciseCatList,
  saveExerciseList,
  saveSrchExerciseList,
  saveSrchExerciseCatList,
  saveExerciseCatDtls,
  saveCatExerciseDtls,
  saveWorkoutPlanData,
  workoutProgresssResp,
  updateWorkoutExpStat,
} from '../Actions/WorkoutsActions';
import { apiStart } from '../Actions/CommonActions';
import { Answer, MCQModl, McqQuestion, QuestionsModl } from '../../Modals/CommonModl';

//Exercise categories Api
export function* getExerciseCatList(params: any, token: any, isCat: boolean) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const response = yield RequestManager.postRequest(
      api.POST_GET_DATA,
      params,
      header,
    );

    if (isCat) {
      const modlData = yield setExerciseCatData(response.success);
      if (params.filters == undefined) {
        yield put(saveExerciseCatList(modlData));
      } else {
        yield put(saveSrchExerciseCatList(modlData));
      }
    } else {
      const modlData = yield setExerciseData(response.success);
      if (params.filters == undefined) {
        yield put(saveExerciseList(modlData));
      } else {
        yield put(saveSrchExerciseList(modlData));
      }
    }
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setExerciseCatData(response: any) {
  return await new Promise(function (resolve) {
    let WorkoutCatArr: WorkoutCat[] = [] as WorkoutCat[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let workout: WorkoutCat = {
        id: data.id,
        title: data.title,
        enabled: data.enabled,
        pace: data.pace == null ? '' : data.pace,
        equipment_req: data.equipment_req == null ? '' : data.equipment_req,
        image: data.image,
        duration: data.duration,
        tags: data.tags,
      };
      WorkoutCatArr.push(workout);
    }
    resolve(WorkoutCatArr);
  });
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Creating exercise modl array from raw data
async function setExerciseData(response: any) {
  return await new Promise(function (resolve) {
    let WorkoutCatArr: Workouts[] = [] as Workouts[];
    for (let i = 0; i < response.length; i++) {
      let data = response[i];
      let workout: Workouts = {
        id: data.id,
        title: data.title,
        enabled: data.enabled,
        pace: data.pace == null ? '' : data.pace,
        equipment_req: data.equipment_req == null ? '' : data.equipment_req,
        image: data.image,
        about: data.about,
        instructions: data.instructions,
        precautions: data.precautions,
        level: data.level,
        tags: data.tags,
        video:
          data.videos == null
            ? ''
            : data.videos.split('/')[data.videos.split('/').length - 1],
      };
      WorkoutCatArr.push(workout);
    }
    resolve(WorkoutCatArr);
  });
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Exercise/WOrkouts details Api
export function* getExeWorkDetails(params: any, token: any, isCat: boolean) {
  try {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const response = yield RequestManager.postRequest(
      api.POST_GET_DATA_BY_ID,
      params,
      header,
    );
    if (isCat) {
      const modlData = yield setExerciseCatDetails(response.success);
      yield put(saveExerciseCatDtls(modlData));
    } else {
      // const modlData = yield setExerciseData(response.success)
      // yield put(saveSrchExerciseList(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setExerciseCatDetails(response: any) {
  return await new Promise(function (resolve) {
    let workout: Workouts = {
      id: response.id,
      title: response.title,
      enabled: response.enabled,
      pace: response.pace == null ? '' : response.pace,
      equipment_req:
        response.equipment_req == null ? '' : response.equipment_req,
      image: response.image,
      about: response.about,
      instructions: response.instructions,
      precautions: response.precautions,
      level: response.level,
      tags: response.tags,
      video:
        response.videos == null
          ? ''
          : response.videos.split('/')[response.videos.split('/').length - 1],
    };
    resolve(workout);
  });
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Exercise/WOrkouts details Api
export function* getWorkDetails(params: any, token: any) {
  try {
    yield put(apiStart());
    const response = yield RequestManager.getRequest(
      api.GET_CATEGORY_EXERCISES + params.id,
      token,
    );
    const modlData = yield setWorkoutDetails(response.success);
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(saveCatExerciseDtls(modlData));
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setWorkoutDetails(response: any) {
  return await new Promise(function (resolve) {
    let exerciseArr: Excercise[] = [];
    for (let i = 0; i < response.excercises.length; i++) {
      const data = response.excercises[i];
      let exercise: Excercise = {
        title: data.title,
        id: data.id,
        repitition: data.repitition,
        image: data.image,
      };
      exerciseArr.push(exercise);
    }

    let workout: ExerciseCatDtls = {
      id: response.id,
      title: response.title,
      image: response.image,
      equipment_req: response.equipment_req,
      level: response.level,
      duration: response.duration,
      duration_type: response.duration_type,
      excercises: exerciseArr,
    };
    resolve(workout);
  });
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Exercise/WOrkouts details Api
export function* getUserWorkoutPlan(params: any, token: any) {
  let header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
  try {
    yield put(apiStart());
    const response = yield RequestManager.postRequest(
      api.GET_USER_WORKOUT_PLAN_DATA,
      params,
      header,
    );
    yield put({ type: commonKeys.API_SUCCESS });
    if (
      response.success.constructor === Array &&
      response.success.length == 0
    ) {
      yield put(updateWorkoutExpStat(true));
    } else {
      const modlData = yield setUserWorkout(response.success);
      yield put(saveWorkoutPlanData(modlData));
    }
  } catch (e) {
    Alert.alert('', e.error);
    if (e.error == 'Your workout plan is expired!!') {
      yield put(updateWorkoutExpStat(true));
    }
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}

//Creating exercise category modl array from raw data
async function setUserWorkout(response: any) {
  return await new Promise(function (resolve) {
    let plan: PlanData = {
      plan_title: response.planData.plan_title,
      week_title: response.planData.week_title,
      week_no: response.planData.week_no,
      current_day: response.planData.current_day,
      image: response.planData.image,
    };

    let categoryArr: CategoryData[] = [];
    for (let index = 0; index < response.categoryData.length; index++) {
      const element = response.categoryData[index];
      let excercises: Excercis[] = [];
      for (let j = 0; j < element.excercises.length; j++) {
        const data = element.excercises[j];
        let excercise: Excercis = {
          title: data.title,
          id: data.id,
          repitition: data.repitition,
          image: data.image,
          video:
            data.video == null
              ? ''
              : data.video.split('/')[data.video.split('/').length - 1],
          completed: data.completed,
          end_time: data.end_time,
          idle_time_duration: data.idle_time_duration,
        };
        excercises.push(excercise);
      }

      let catData: CategoryData = {
        duration: element.duration,
        duration_type: element.duration_type,
        category_id: element.category_id,
        category_title: element.category_title,
        total_session_time: element.total_session_time,
        excercises: excercises,
      };
      categoryArr.push(catData);
    }

    let workout: UserWorkout = {
      planData: plan,
      categoryData: categoryArr,
    };

    resolve(workout);
  });
}
//----------------------------------------------------------------
//----------------------------------------------------------------
//Save user workpout progress
export function* saveWorkoutProgress(params: any, token: any) {
  let header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
  try {
    yield put(apiStart());
    yield RequestManager.postRequest(
      api.POST_SAVE_WORKOUT_PROGESS,
      params,
      header,
    );
    yield put({ type: commonKeys.API_SUCCESS });
    yield put(workoutProgresssResp(true));
  } catch (e) {
    Alert.alert('', e.error);
    yield put({ type: commonKeys.API_FAILED, message: e.error });
  }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Fetching MCQ Data
export async function getMCQ(token: any) {
  return await new Promise(async function (resolve) {
    await RequestManager.getRequest(api.GET_MCQ, token)
      .then(async function (response: any) {
        let data = await mcqModl(response.success);
        resolve(data);
      })
      .catch(function (e: any) {
        Alert.alert(e.error);
      });
    resolve;
  });
}


//Plans Data
export async function mcqModl(response: any) {
  return await new Promise(function (resolve) {
    let quesArr: McqQuestion[] = [] as McqQuestion[];
    let mcqArr: MCQModl[] = [] as MCQModl[];
    for (let i = 0; i < response.questions.length; i++) {
      let data = response.questions[i];
      let answerArr: Answer[] = [] as Answer[];
      for (let j = 0; j < data.answers.length; j++) {
        const element = data.answers[j];
        let answer: Answer = {
          id: element.id,
          title: element.title,
          resource_url: element.resource_url,
          isSelected: false,
        }
        answerArr.push(answer);
      }
      let plan: MCQModl = {
        title: data.title,
        id: data.id,
        answers: answerArr,
      };
      mcqArr.push(plan);
    }


    for (let i = 0; i < response.mcqQuestion.length; i++) {
      const element = response.mcqQuestion[i];
      let answersArr: Answer[] = [];
      let childQuestion: MCQModl[] = [];
      for (let j = 0; j < element.answers.length; j++) {
        const data = element.answers[j];
        let answer: Answer = {
          id: data.id,
          title: data.title,
          resource_url: data.resource_url,
          isSelected: false,
        }
        answersArr.push(answer);
      }

      for (let j = 0; j < element.ChildQuestion.length; j++) {
        let data = element.ChildQuestion[j];
        let answerArr: Answer[] = [] as Answer[];
        for (let j = 0; j < data.answers.length; j++) {
          const mcq = data.answers[j];
          let answer: Answer = {
            id: mcq.id,
            title: mcq.title,
            resource_url: mcq.resource_url,
            isSelected: false,
          }
          answerArr.push(answer);
        }
        let plan: MCQModl = {
          title: data.title,
          id: data.id,
          answers: answerArr,
        };
        childQuestion.push(plan);
      }

      let mcqQuestion: McqQuestion = {
        id: element.id,
        title: element.title,
        answers: answersArr,
        ChildQuestion: childQuestion,
      }

      quesArr.push(mcqQuestion);
    }

    let ques: QuestionsModl = {
      questions: mcqArr,
      mcqQuestion: quesArr,
    }

    resolve(ques);
  });
}
