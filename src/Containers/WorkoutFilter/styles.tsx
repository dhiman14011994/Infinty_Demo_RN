//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  tagVw: {
    borderColor: color.DARK_RED,
    borderRadius: 60,
    marginTop: 10,
    marginRight: 10,
  },
  tagCntnr: {
    margin: 15,
    marginBottom: 0,
  },

  //Button Styles
  clearBtn: { 
    justifyContent: 'center',
    alignItems: 'center',
    height: 30, 
    borderRadius: 8, 
    margin: 20, 
    marginTop: 0,
  },

  //Text styles
  clearTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  titleTxt: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  tagTxt: {
    fontSize: 14,
    color: color.DARK_RED,  
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',    
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },
})