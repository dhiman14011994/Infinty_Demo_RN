//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  margin: 40,
  mainVw: {
    height: 40,
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 14,
    alignItems: 'center',
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    backgroundColor: color.APP_LIGHT_BG_COLOR
  },

  //Text Styles
  titleTxt: {
    flex: 1,
    fontSize: 11,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },

  //Image Styles
  logoImg: {
    height: 23,
    width: 23,
    marginRight: 3,
    resizeMode: 'contain',
  }
})