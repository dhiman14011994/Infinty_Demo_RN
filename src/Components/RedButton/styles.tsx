//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  //Button Styles
  loginBtn: { 
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, 
    borderRadius: 40, 
    backgroundColor: color.APP_COMMON_BTN_COLOR, 
    margin: 15, 
    marginTop: 40,
  }, 
  noMarginVw: {
    marginTop: 15,
    marginBottom: 0,
  },

  //Text Styles
  loginBtntTxt: {
    fontSize: 18,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
})