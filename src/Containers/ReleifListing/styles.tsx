
import { Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  totalMargin: 50,
  marginRight: 15,
  height: 35,
  barHeight: 10,

  mainVw: {
    backgroundColor: color.APP_PINK_COLOR,
    flex: 1,
  },
  topMenuTbl: {
    flex: 1,
  },
  scrollVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  paddingView: {
    height: 0,
    width: 10,
  },

  //Buttons Styles

  //Text Styles
  titleTxt: {
    fontSize: 20,
    marginRight: 10,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  //Image Styles
  drImg: {
    height: '80%',
    width: '25%',
    backgroundColor: color.APP_PINK_COLOR,
    resizeMode: 'cover',
  },
})