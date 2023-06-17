//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  tblVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  }
})