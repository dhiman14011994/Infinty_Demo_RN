//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
  },
  searchVw: {
    margin: 15,
    padding: 10,
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    paddingBottom: Platform.OS == 'ios' ? 10 : 0,
    alignItems: 'center',
    borderRadius: 80,
    flexDirection: 'row',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  srchCntnr: {
    backgroundColor: color.APP_COMMON_BG_COLOR,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  exerciseTbl: { 
    paddingBottom: 60,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },

  //Input Styles
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },

  //Image Styles
  searchImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
})