//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  htmlVw: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },

   //Text Styles
   commonTxt: {
    fontSize: 14,
    color: 'white',
    backgroundColor: color.APP_COMMON_BG_COLOR,
    fontFamily: font.NUNITO_REGULAR,
  },
})