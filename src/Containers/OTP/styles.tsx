//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  contentVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  otpInputCntnrVw: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  //Button Styles
  resendBtn: {
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    justifyContent: 'center',
  },

  //Text Styles
  timerTxt: {
    fontSize: 14,
    marginLeft: 15,
    marginRight: 15,
    color: color.VERY_DARK_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  resendTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },

  //Images Styles
  logoImg: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
})