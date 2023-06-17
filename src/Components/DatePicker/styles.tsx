//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Platform } from 'react-native';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {

  },
  doneBtnVw: {
    height: 40,
    borderColor: 'white',
    alignItems: 'flex-end',
    backgroundColor: color.APP_PINK_COLOR,
  },

  //Buttons Styles
  doneBtn: {
    height: 40, 
    width: 90,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  //Text Styles
  genderTxt: {
    fontSize: 16,
    fontFamily: font.NUNITO_BOLD,
    color: 'white',
  },
  pickerTxt: {
    fontSize: 16,
    fontFamily: font.NUNITO_BOLD,
    color: 'white',
  },
})