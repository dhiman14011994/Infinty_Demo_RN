import ReliefKeys from '../Constants/ReliefKeys'

export const saveHomeRemediesData = (data: any) => ({
    type: ReliefKeys.SAVE_HOMEREMEDIES,
    payload: data,
  });

export const saveSrchHomeRemediesData = (data: any) => ({
    type: ReliefKeys.SAVE_HOMEREMEDIES_SRCH,
    payload: data,
});
export const saveHomeRemedies = (data: any) => ({
  type: ReliefKeys.SAVE_HOMEREMEDIES_DTLS,
  payload: data,
});

export const saveReliefExerciseData = (data: any) => ({
  type: ReliefKeys.SAVE_RELIEFEXERCISE,
  payload: data,
});

export const saveSrchReliefExerciseData = (data: any) => ({
  type: ReliefKeys.SAVE_RELIEFEXERCISE_SRCH,
  payload: data,
});

export const saveReliefExercise = (data: any) => ({
  type: ReliefKeys.SAVE_RELIEFEXERCISE_DTLS,
  payload: data,
});

export const getHomeRemediesDtls =(data: any) =>({
  type: ReliefKeys.GET_HOMEREMEDIES_DTLS,
  payload: data
});