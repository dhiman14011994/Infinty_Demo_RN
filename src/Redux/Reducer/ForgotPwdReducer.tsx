
import passwordsKeys from '../Constants/PasswordsKeys';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  apiStatus: false,
  token: '',
  verifyStatus: false,
  changePwdStatus: false,
}

export default function forgotPwdReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        apiStatus: false,
        token: '',
        verifyStatus: false,
        changePwdStatus: false,
      };

    case passwordsKeys.FORGOT_PWD_RESP:
      return {
        ...state,
        apiStatus: action.payload.status,
        token: action.payload.token,
      };

    case passwordsKeys.VERIFY_FORGOT_OTP_RESP:
      return {
        ...state,
        verifyStatus: action.payload,
      };

    case passwordsKeys.STATUS_CHANGE_PWD:
      return {
        ...state,
        changePwdStatus: action.payload
      };

    default:
      return state;
  }
}
