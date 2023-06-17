import passwordKeys from "../Constants/PasswordsKeys";

export const forgotPassword = (data: any) => ({
  type: passwordKeys.FORGOT_PASSWORD,
  payload: data,
});

export const saveFOrgotPwdResp = (data: any) => ({
  type: passwordKeys.FORGOT_PWD_RESP,
  payload: data,
});

export const verifyforgotOtp = (data: any) => ({
  type: passwordKeys.VERIFY_FORGOT_OTP,
  payload: data,
});

export const saveVerifyforgotOtp = (data: any) => ({
  type: passwordKeys.VERIFY_FORGOT_OTP_RESP,
  payload: data,
});

export const changePwd = (data: any) => ({
  type: passwordKeys.CHANGE_PASSWORD,
  payload: data,
});

export const statusChangePwd = (data: any) => ({
  type: passwordKeys.STATUS_CHANGE_PWD,
  payload: data,
});