//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
  },
  btnCntnr: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  paddingVw: {
    marginTop: 20,
    height: 1,
  },

  //Button Styles
  deviceBtn: {
    height: 50,
    margin: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  //Text Styles
  titleTxt: {
    fontSize: 18,
    marginLeft: 15,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    color: 'white',
    flex: 1,
  },

  //Image Styles
  checkImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  logoImg: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
});
