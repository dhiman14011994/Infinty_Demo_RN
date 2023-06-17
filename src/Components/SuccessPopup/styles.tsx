//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  size: 80,

  mainVw: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  loaderVw: {
    height: 80,
    width: 80,
  },

   //Text Styles
  titleTxt: {
    fontSize: 25,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center', 
  },
  messageTxt: {
    fontSize: 18,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center', 
  },

  //Images Styles 
  tickImg: {
    height: 135,
    width: 135,
    borderRadius: 50,
  },
})