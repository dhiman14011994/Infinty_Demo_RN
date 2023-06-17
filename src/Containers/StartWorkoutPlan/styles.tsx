//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  marginTop: 5,
  marginBottom: 10,

  mainVw: {
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
    width: '100%',
  },
  titleCntnr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0,
    paddingRight: 0,
  },
  gapVw: {
    height: 15,
  },
  kcalVw: {
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'flex-start'
  },
  paddingView: {
    height: 80,
    width: 10,
  },
  htmlCntnr: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  tagVw: {
    backgroundColor: color.APP_PINK_COLOR,
    borderRadius: 60,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  commonVw: {
    flexDirection: 'row',
    marginTop: 10
  },
  sepratorVw: {
    height: '80%',
    margin: 5,
    backgroundColor: color.APP_GREY
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
    backgroundColor: 'black',
  },
  monthVw: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },

  //Button Styles
  unSelectBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    fontSize: 22,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  tagTxt: {
    fontSize: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  startPlanTxt: {
    flex: 1,
    fontSize: 14,
    paddingRight: 5,
    paddingLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  headingTxt: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginTop: 5,
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
  benifitsTxt: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  popularPlanTxt: {
    flex: 1,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    color: color.DARK_RED,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    alignSelf: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  totalTxt: {
    flex: 1,
    fontSize: 22,
    marginTop: 22,
    color: color.DARK_RED,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
    paddingLeft: 15,
  },
  moneyTxt: {
    flex: 1,
    fontSize: 22,
    marginTop: 22,
    color: color.DARK_RED,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'right',
    paddingRight: 15,
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
  descTxt: {
    flex: 1,
    fontSize: 13,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
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
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_LIGHT,
    marginLeft: 10,
    textAlign: 'right',
  },
  nutriInfoTxt: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    height: 20,
    color: color.APP_GREY,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  headerTitleTxt: {
    width: '70%',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
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
  kclImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  tickImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
})