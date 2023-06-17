

import paymentKeys from '../Constants/PaymentKeys';
import { CardModl } from '../../Modals/Payment';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  cards: [] as CardModl[],
  cardSaved: false,
  planPurchased: false,
  cardRemove: false,
}

export default function paymentReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        cards: [],
        cardSaved: false,
        planPurchased: false,
        cardRemove: false,
      };

    case paymentKeys.SAVE_CARD_RESP:
      return {
        ...state,
        cards: action.payload
      };

    case paymentKeys.ADD_CARD_RESP:
      return {
        ...state,
        cardSaved: action.payload
      };

    case paymentKeys.REMOVE_CARD_RESP:
      return {
        ...state,
        cardRemove: action.payload
      };

    case paymentKeys.PURCHASE_PLAN_RESP:
      return {
        ...state,
        planPurchased: action.payload
      };

    default:
      return state;
  }
}
