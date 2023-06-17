import loginKeys from "../Constants/LoginKeys";
import { commonKeys } from "../Constants/CommonKeys";

export const apiStart = () => ({
  type: commonKeys.API_START,
  payload: {},
});

export const getTransaction = (data: any) => ({
  type: commonKeys.GET_TRANSACTIONS,
  payload: data,
});

export const saveTransaction = (data: any) => ({
  type: commonKeys.SAVE_TRANSACTIONS,
  payload: data,
});

export const getTermsData = (data: any) => ({
  type: commonKeys.GET_TERMS_DATA,
  payload: data,
});

export const saveHelp = (data: any) => ({
  type: commonKeys.SAVE_HELP,
  payload: data,
});

export const savePolicy = (data: any) => ({
  type: commonKeys.SVAE_POLICY,
  payload: data,
});

export const getTransactionDtls = (data: any) => ({
  type: commonKeys.GET_TRANSACTIONS_DTLS,
  payload: data,
});

export const saveTransactionDtls = (data: any) => ({
  type: commonKeys.SAVE_TRANSACTIONS_DTLS,
  payload: data,
});
