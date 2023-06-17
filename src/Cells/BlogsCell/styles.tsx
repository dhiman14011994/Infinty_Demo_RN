//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    width: 210,
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: color.APP_LIGHT_BG_COLOR
  },

  //Text Styles
  titleTxt: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  descTxt: {
    flex: 1,
    width: '100%',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 15,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },

  //Image Styles
  logoImg: {
    height: 130,
    width: 210,
    resizeMode: 'cover',
  }
})