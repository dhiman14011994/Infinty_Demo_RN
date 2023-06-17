//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  bigFont: 40,
  smallFont: 24,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  cntnrVw:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },

  //Button Styles
  commonBtn: { 
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, 
    borderRadius: 8, 
    backgroundColor: color.APP_PINK_COLOR, 
    margin: 15,
    marginTop: 40, 
    paddingLeft: 60,
    paddingRight: 60,
  }, 

  //Text Styles
  bodyFatTxt: {
    fontSize: 17,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  caloriesTxt: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },
  resultTxt: {
    fontSize: 40,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    color: color.APP_LIGHT_PINK,
    fontFamily: font.NUNITO_BOLD,
  },
  btnTxt: {
    fontSize: 14,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
})