import { guidesKeys } from "../Constants/GuidesKeys";

export const getGuideList = (data: any) => ({
  type: guidesKeys.GET_GUIDES_LIST,
  payload: data,
});

export const saveGuideList = (data: any) => ({
  type: guidesKeys.SAVE_GUIDES_LIST,
  payload: data,
});

export const getGuidesBanner = (data: any) => ({
  type: guidesKeys.GET_GUIDE_BANNER,
  payload: data,
});

export const saveGuidesBanner = (data: any) => ({
  type: guidesKeys.SAVE_GUIDE_BANNER,
  payload: data,
});

export const getSimilarGuideList = (data: any) => ({
  type: guidesKeys.GET_SIMILAR_GUIDE,
  payload: data,
});

export const saveSimilarGuideList = (data: any) => ({
  type: guidesKeys.SAVE_SIMILAR_GUIDE,
  payload: data,
});

export const getGuideDtls = (data: any) => ({
  type: guidesKeys.GET_GUIDE_DTLS,
  payload: data,
});

export const saveGuideDtls = (data: any) => ({
  type: guidesKeys.SAVE_GUIDE_DTLS,
  payload: data,
});

export const saveSimilarGuideDtls = (data: any) => ({
  type: guidesKeys.SAVE_GUIDE_DTLS,
  payload: data,
});

