import ReliefKeys from "../Constants/ReliefKeys";

import {HomeRemedies,HomeRemediesDtls,ReliefExercise,ReliefExerciseDtls} from '../../Modals/ReliefModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
    HomeRemedies: [] as HomeRemedies[],
    srchHomeRemedies: [] as HomeRemedies[],
    HomeRemediesDtls: undefined as any as HomeRemediesDtls,

    ReliefExercise: [] as ReliefExercise[],
    srchReliefExercise: [] as ReliefExercise[],
    ReliefExerciseDtls: undefined as any as ReliefExerciseDtls,
    progressResp: false,
    isLoaderVisible: false,
    isExpired: false,

}

export default function ReliefReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
      case loginKeys.LOGOUT:
        return {
            HomeRemedies: [],
            srchHomeRemedies: [],
            HomeRemediesDtls: undefined,
            ReliefExercise: [],
            srchReliefExercise: [],
            ReliefExerciseDtls: undefined,
            progressResp: false,
            isLoaderVisible: false,
            isExpired: false,


            
        };
      case ReliefKeys.SAVE_HOMEREMEDIES:
        return {
        ...state,
        HomeRemedies: action.payload
      };
      case ReliefKeys.SAVE_HOMEREMEDIES_SRCH:
      return {
        ...state,
        srchHomeRemedies: action.payload
      };
      case ReliefKeys.SAVE_HOMEREMEDIES_DTLS:
        return {
        ...state,
        HomeRemediesDtls: action.payload
      };
      case ReliefKeys.SAVE_RELIEFEXERCISE:
      return {
        ...state,
        ReliefExercise: action.payload
      };
      case ReliefKeys.SAVE_RELIEFEXERCISE_DTLS:
        return {
        ...state,
        ReliefExerciseDtls: action.payload
      };
      case ReliefKeys.SAVE_RELIEFEXERCISE_SRCH:
      return {
        ...state,
        ReliefExercise: action.payload
      };
      default:
      return state;
  }
}
