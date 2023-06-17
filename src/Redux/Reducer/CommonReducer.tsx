
import { commonKeys } from '../Constants/CommonKeys';
import { MCQModl, TransactionModl, TransactionDtlsModl } from '../../Modals/CommonModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  mcq: [] as MCQModl[],
  transactions: [] as TransactionModl[],
  transaction: undefined as any as TransactionDtlsModl,
  help: '',
  policy: '',
  aboutAnthony: '',
}

export default function commonReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        mcq: [],
        transactions: [],
        transaction: undefined,
        help: '',
        policy: '',
        aboutAnthony: '',
      };

    case commonKeys.SAVE_MCQ:
      return {
        ...state,
        mcq: action.payload
      };

    case commonKeys.SAVE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };

    case commonKeys.SAVE_TRANSACTIONS_DTLS:
      return {
        ...state,
        transaction: action.payload
      };

    case commonKeys.SAVE_HELP:
      return {
        ...state,
        help: action.payload
      };

    case commonKeys.SVAE_POLICY:
      console.log('action.payload', action.payload)
      return {
        ...state,
        policy: action.payload
      };

    default:
      return state;
  }
}
