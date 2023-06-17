

import workoutKeys from '../Constants/WorkoutKeys';
import { WorkoutCat, Workouts, RecWorkout, RecWorkoutDtls, ExerciseCatDtls, UserWorkout } from '../../Modals/WorkoutModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  workoutCat: [] as WorkoutCat[],
  srchWorkoutCat: [] as WorkoutCat[],
  workouts: [] as Workouts[],
  srchWorkouts: [] as Workouts[],
  recWorkouts: [] as RecWorkout[],
  workoutCatDtls: undefined as any as Workouts,
  userWorkout: undefined as any as UserWorkout,
  recWorkoutDtls: undefined as any as RecWorkoutDtls,
  workoutDtls: undefined as any as ExerciseCatDtls,
  progressResp: false,
  isLoaderVisible: false,
  isExpired: false,
}

export default function workoutReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        workoutCat: [],
        srchWorkoutCat: [],
        workouts: [],
        srchWorkouts: [],
        recWorkouts: [],
        workoutCatDtls: undefined,
        userWorkout: undefined,
        recWorkoutDtls: undefined,
        workoutDtls: undefined,
        progressResp: false,
        isLoaderVisible: false,
        isExpired: false,
      };

    case workoutKeys.SAVE_EXERCISES_CAT:
      return {
        ...state,
        workoutCat: action.payload
      };

    case workoutKeys.SAVE_EXERCISES_CAT_SRCH:
      return {
        ...state,
        srchWorkoutCat: action.payload
      };

    case workoutKeys.SAVE_EXERCISES_CAT_DTLS:
      return {
        ...state,
        workoutCatDtls: action.payload
      };

    case workoutKeys.SAVE_WORKOUTS:
      return {
        ...state,
        workouts: action.payload
      };

    case workoutKeys.SAVE_WORKOUTS_SRCH:
      return {
        ...state,
        srchWorkouts: action.payload
      };

    case workoutKeys.SAVE_REC_WORKOUT_PLAN:
      return {
        ...state,
        recWorkouts: action.payload
      };

    case workoutKeys.SAVE_REC_PLANS_DTLS:
      return {
        ...state,
        recWorkoutDtls: action.payload
      };

    case workoutKeys.SAVE_CAT_WORKOUTS_DTLS:
      return {
        ...state,
        workoutDtls: action.payload
      };

    case workoutKeys.SAVE_USER_PLAN_DATA:
      return {
        ...state,
        userWorkout: action.payload
      };

    case workoutKeys.SAVE_WORKOUT_PROGRESS_RESP:
      return {
        ...state,
        progressResp: action.payload
      };

    case workoutKeys.UPDATE_WORKOUT_EXPIRE_STATUS:
      return {
        ...state,
        isExpired: action.payload
      };

    default:
      return state;
  }
}
