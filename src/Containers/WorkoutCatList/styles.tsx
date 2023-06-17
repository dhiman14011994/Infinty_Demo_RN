//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,   
    backgroundColor: color.APP_LIGHT_PINK
  },
  errorVw: {
    flex: 1,
    // height: '100%',
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
    backgroundColor: color.APP_COMMON_BG_COLOR 
  },
  cntnrVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    overFlow: 'hidden',
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  searchVw: {
    margin: 15,
    padding: 15,
    height: 50,
    paddingRight: 0,
    overflow: 'hidden',
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    paddingBottom: Platform.OS == 'ios' ? 10 : 0,
    alignItems: 'center',
    borderRadius: 40,
    flexDirection: 'row',    
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  exerciseTbl: { 
    flex: 1,
  },

  //Button Styles
  filterBtn: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_PINK_COLOR
  },

  //Input Styles
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },

   //Text Styles
   noWorkoutTxt: {
    fontSize: 22,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    alignSelf: 'center',
  },

  //Image Styles
  searchImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
})