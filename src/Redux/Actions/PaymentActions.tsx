import paymentKeys from "../Constants/PaymentKeys";

export const getCards = (data: any) => ({
  type: paymentKeys.GET_CARDS,
  payload: data,
});

export const saveCardResp = (data: any) => ({
  type: paymentKeys.SAVE_CARD_RESP,
  payload: data,
});

export const addCard = (data: any) => ({
  type: paymentKeys.ADD_CARD,
  payload: data,
});

export const addCardResp = (data: any) => ({
  type: paymentKeys.ADD_CARD_RESP,
  payload: data,
});

export const removeCard = (data: any) => ({
  type: paymentKeys.REMOVE_CARD,
  payload: data,
});

export const removeCardResp = (data: any) => ({
  type: paymentKeys.REMOVE_CARD_RESP,
  payload: data,
});

export const purchasePlan = (data: any) => ({
  type: paymentKeys.PURCHASE_PLAN,
  payload: data,
});

export const purchasePlanResp = (data: any) => ({
  type: paymentKeys.PURCHASE_PLAN_RESP,
  payload: data,
});