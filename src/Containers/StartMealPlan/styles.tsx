//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  marginTop: 5,
  marginBottom: 10,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  allDataCntnr: {
    borderRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
    marginTop: 160,
  },
  topNavVw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsVw: {
    flex: 1,
    width: '100%',
  },
  paddingView: {
    height: 80,
    width: 10,
  },
  htmlCntnr: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  kcalVw: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'flex-start'
  },
  commonVw: {
    flexDirection: 'row',
    marginTop: 10
  },
  durationCntnr: {
    flex: 1,
    margin: 15,
    marginTop: 0,
  },
  opqVw: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black',
  },

  //Button Styles
  durationBtn: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    paddingBottom: 0,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },

  //Text styles
  titleTxt: {
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
    fontSize: 22,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  headingTxt: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  infoTxt: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  descTxt: {
    flex: 1,
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  timeTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    marginLeft: 10,
  },
  amountTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_LIGHT,
    marginLeft: 10,
    textAlign: 'right',
  },
  kclTxt: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 5,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  headerTitleTxt: {
    width: '70%',
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontFamily: font.NUNITO_REGULAR
  },

  //Buttons Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startMealRedBtn: {
    padding: 10,
    backgroundColor: color.DARK_RED,
    borderRadius: 8,
  },

  //Image Styles
  bannerImg: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
  },
  favImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  addImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  kclImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  backImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  dishImg: {
    marginTop: 20,
    height: 150,
    width: '100%',
  },
  tickImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
})