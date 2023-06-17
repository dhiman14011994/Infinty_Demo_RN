//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,

  mainVw: {
    margin: 15,
    marginBottom: 0,
    padding: 15,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    flexDirection: 'row',
  },
  timeCntnr: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  opqVw: {
    height: 140,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: 'black'
  },
  titleDataVw: {
    flex: 1,
    marginLeft: 10,
  },

  //Text Styles
  titleTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  subTitleTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'left',
  },
  timeTxt: {
    fontSize: 10,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },

  //Image Styles
  logoImg: {
    height: 61,
    width: 75,
    resizeMode: 'cover',
    borderRadius: 8,
  },
})