//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 40,
  height: 35,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
  },
  noReminderVw: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  tblVw: {
    paddingTop: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  switchVw: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center'
  },

  //Buttons Styles

  //Text Styles
  topMenuTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  noReminderTxt: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 80,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },

  //Image
  noReminderImg: {
    height: 140,
    width: 96,
    resizeMode: 'contain',
  },
});
