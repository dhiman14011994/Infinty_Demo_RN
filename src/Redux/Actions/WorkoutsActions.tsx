import workoutsKeys from "../Constants/WorkoutKeys";

export const saveExerciseCatList = (data: any) => ({
  type: workoutsKeys.SAVE_EXERCISES_CAT,
  payload: data,
});

export const saveExerciseCatDtls = (data: any) => ({
  type: workoutsKeys.SAVE_EXERCISES_CAT_DTLS,
  payload: data,
});

export const saveSrchExerciseCatList = (data: any) => ({
  type: workoutsKeys.SAVE_EXERCISES_CAT_SRCH,
  payload: data,
});

export const saveExerciseList = (data: any) => ({
  type: workoutsKeys.SAVE_WORKOUTS,
  payload: data,
});

export const saveSrchExerciseList = (data: any) => ({
  type: workoutsKeys.SAVE_WORKOUTS_SRCH,
  payload: data,
});

export const saveRecomWorkPlans = (data: any) => ({
  type: workoutsKeys.SAVE_REC_WORKOUT_PLAN,
  payload: data,
});

export const saveRecPlansDtls = (data: any) => ({
  type: workoutsKeys.SAVE_REC_PLANS_DTLS,
  payload: data,
});

export const saveCatExerciseDtls = (data: any) => ({
  type: workoutsKeys.SAVE_CAT_WORKOUTS_DTLS,
  payload: data,
});

export const saveWorkoutPlanData = (data: any) => ({
  type: workoutsKeys.SAVE_USER_PLAN_DATA,
  payload: data,
});

export const saveWorkoutProgress = (data: any) => ({
  type: workoutsKeys.SAVE_WORKOUT_PROGRESS,
  payload: data,
});

export const getExerciseCatDtls = (data: any) => ({
  type: workoutsKeys.GET_EXERCISES_CAT_DTLS,
  payload: data,
});

export const getCatExerciseDtls = (data: any) => ({
  type: workoutsKeys.GET_CAT_WORKOUTS_DTLS,
  payload: data,
});

export const getWorkoutPlanData = (data: any) => ({
  type: workoutsKeys.GET_USER_PLAN_DATA,
  payload: data,
});


export const workoutProgresssResp = (data: any) => ({
  type: workoutsKeys.SAVE_WORKOUT_PROGRESS_RESP,
  payload: data,
});

export const updateWorkoutExpStat= (data: any) => ({
  type: workoutsKeys.UPDATE_WORKOUT_EXPIRE_STATUS,
  payload: data,
});