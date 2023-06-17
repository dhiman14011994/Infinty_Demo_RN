//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../Constants/Colors';
import font from '../Resources/Fonts';

const styles = ScaleSheet.create({

  //Text Styles
  viewTitleTxt: {
    fontSize: 18,
    marginBottom: 50,
    marginLeft: 15,
    color: color.DARK_RED,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },

  //Shadow
  bottomShadow: {
    shadowColor: color.LIGHTER_GREY,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
   
  },
  shadow: {
    shadowColor: color.APP_GREY,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
  lightShadow: {
    shadowColor: color.VERY_LIGHT_GREY,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
})

export default styles;