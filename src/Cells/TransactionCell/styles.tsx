//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    margin: 15,
    marginBottom: 0,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    alignItems: 'center',
    padding: 10,
  },
  txtVw: {
    flex: 1,
  },

  //Text Styles
  titleTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
  orderIdTxt: {
    fontSize: 9,
    marginTop: 2,
    marginBottom: 5,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
  commonLeftTxt: {
    flex :1,
    fontSize: 9,
    marginTop: 2,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
  commonRightTxt: {
    flex :1,
    fontSize: 9,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'right',
    color: 'white',
  },

  //Image styles
  img: {
    height: 15,
    width: 15,
    marginLeft: 10,
    resizeMode: 'contain'
  }
})