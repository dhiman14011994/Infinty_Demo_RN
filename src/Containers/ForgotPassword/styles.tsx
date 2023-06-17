//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  mobileVwCntnr: {
    height: 44,
    margin: 15,
    paddingLeft: 10,
    borderRadius: 44,
    backgroundColor: color.APP_COMMON_INPUT_COLOR,
    flexDirection: 'row',    
  },
  contentVw: { 
    flex: 1, 
    backgroundColor: color.APP_COMMON_BG_COLOR 
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
  enterOtpTxt: {
    fontSize: 14,
    margin: 15,
    marginTop: 30,
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  orSignInTxt: {
    fontSize: 12,
    padding: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  ccText: {
    fontSize: 12,
    paddingLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  
  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  phone: {
    height: 13,
    width: 13,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain'
  },
})