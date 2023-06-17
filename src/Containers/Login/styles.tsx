//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  scrollVw: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  loginVw: {
    width: '100%',
    marginTop: 0,
    paddingBottom: 0,
  },
  loginTxtVw: {
    flexDirection: 'row',
    marginTop: 100,
    marginBottom: 40,
    alignItems: 'center',
  },
  socialLoginVw: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  orVw: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  //Button Styles
  forgotPwdBtn: {
    height: 20,
    width: 180,
  },
  signupBtn: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  signUpBtns: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 55,
  },
  googleBtn: {
    height: 44,
    borderRadius: 44,
    margin: 20,
    marginTop: 15,
    marginBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.APP_COMMON_INPUT_COLOR
  },
  fbBtn: {
    marginRight: 0,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: color.DARK_RED,
    margin: 20,
    marginTop: 40,
  },

  //Text Styles
  orSignInTxt: {
    fontSize: 12,
    padding: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  forgotPwdTxt: {
    fontSize: 12,
    color: 'white',
    marginLeft: 20,
    fontFamily: font.NUNITO_REGULAR,
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
  },
  loginTxt: {
    fontSize: 14,
    width: '60%',
    color: 'white',
    textAlign: 'center',
    fontFamily: font.NUNITO_BOLD,
  },
  signupTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    marginLeft: 5,
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
  },
  haveAnCoounttxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    marginLeft: 5,
    marginTop: 15,
    alignSelf: 'center'
  },

  //Images Styles 
  bgImage: {
    height: 450,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  redIconImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  socialImg: {
    height: 22,
    width: '20%',
    resizeMode: 'contain',
  },
})