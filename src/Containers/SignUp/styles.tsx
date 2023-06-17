//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({
  marginTop: 10,

  loginVw: {
    width: '100%',
    marginTop: 0,
  },
  loginTxtVw: {
    flexDirection: 'row',
    marginTop: 100,
    marginBottom: 40,
    alignItems: 'center',
  },
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  termsVw: {
    flexDirection: 'row',
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  borderVw: {
    height: 1,
    width: '100%',
    backgroundColor: color.APP_PINK_COLOR,
    marginTop: 20,
    marginBottom: 20
  },
  mobileVwCntnr: {
    height: 44,
    margin: 20,
    marginTop: 0,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 44,
    backgroundColor: color.APP_COMMON_INPUT_COLOR,
    flexDirection: 'row',
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  socialLoginVw: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countryPickerVw: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  countryPickerCntnr: {
    height: Platform.OS === 'ios' ? 50 : 45,
    marginTop: Platform.OS === 'ios' ? 0 : 25,
    marginRight: 10,
    borderColor: color.VERY_LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  socialVw: { 
    borderTopLeftRadius: 10, 
    borderTopEndRadius: 10, 
    backgroundColor: 'white',
  },
  socialBgVw: {
    height: '100%', 
    width: '100%', 
    borderTopLeftRadius: 10, 
    borderTopEndRadius: 10, 
    backgroundColor: color.APP_GREY,
    position: 'absolute'
  },
  orVw: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  //Button Styles
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
  checkBoxBtn: {
    height: 30,
    width: 20,
    alignItems: 'flex-start',
  },
  termsBtn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  googleBtn: {
    height: 44,
    borderRadius: 44,
    margin: 20,
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.APP_COMMON_INPUT_COLOR
  },
  socialBtn: {
    height: 44,
    borderRadius: 44,
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.APP_COMMON_INPUT_COLOR
  },
  fbBtn: {
    marginRight: 0,
  },
  singupBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: color.DARK_RED,
    margin: 20,
    marginTop: 40,
  },
  cancelBtn: {
    padding: 10, 
    alignSelf: 'flex-end'
  },

  //TextInput Styles
  mobileInput: {
    flex: 1,
    height: 44,
    fontFamily: font.NUNITO_SEMI_BOLD,
    fontSize: 12,
    color: 'white',
    paddingLeft: 15,
    padingRight: 15,
  },

  //Text Styles
  loginTxt: {
    fontSize: 14,
    width: '60%',
    color: 'white',
    textAlign: 'center',
    fontFamily: font.NUNITO_BOLD,
  },
  ccText: {
    fontSize: 12,
    paddingLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  haveAnCoounttxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    marginLeft: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  signupTxt: {
    fontFamily: font.NUNITO_BOLD,
    marginLeft: 5,
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
  },
  otherTxt: {
    ontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    marginLeft: 5,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
  },
  readTxt: {
    fontSize: 12,
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
    textDecorationLine: 'underline',
  },
  orSignInTxt: {
    fontSize: 12,
    padding: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    backgroundColor: color.APP_COMMON_BG_COLOR
  },


  //Images Styles 
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
  checkBoxImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  phone: {
    height: 13,
    width: 13,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain'
  },
  cancelImg: {
    height: 15,
     width: 15, 
     resizeMode: 'contain'
    },
})