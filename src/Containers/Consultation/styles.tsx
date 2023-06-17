//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,
  marginLeft: 10,
  marginRight: 10,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },
  dataVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  cardVw: {
    flex: 1,
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 5,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
  },

  //Button Styles

  //Text Styles
  titleTxt: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  timeTxt: {
    fontSize: 17,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  priceTxt: {
    fontSize: 17,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'right',
  },

  //Image Styles
})