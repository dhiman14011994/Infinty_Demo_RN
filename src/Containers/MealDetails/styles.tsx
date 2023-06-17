//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  marginTop: 5,
  marginBottom: 15,

  mainVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  allDataCntnr: {
    borderRadius: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR,
    marginTop: 160,
  },
  topNavVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  titleCw: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingView: {
    height: 150,
    width: 10,
  },
  kcalVw: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  progressVwCntnr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  nutritionInfoVw: {
    minHeight: 50,
    borderTopColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
  },
  commonVw: {
    flexDirection: 'row',
    marginTop: 15,
  },
  addToMealCntnr: {
    flex: 1,
    height: 50,
    marginTop: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 50,
  },
  addToMealVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120
  },
  sepratorVw: {
    height: '80%',
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: color.VERY_LIGHT_GREY
  },
  htmlCntnr: {
    margin: 15,
    marginTop: 5,
    marginBottom: 0,
  },
  
  //Text styles
  titleTxt: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  addToMealTxt: {
    flex: 1,
    fontSize: 14,
    paddingRight: 5,
    paddingLeft: 5,
    color: 'black',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  headingTxt: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  macroTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
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
    paddingLeft: 15,
    paddingRight: 15,
  },
  kclTxt: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
    height: 20,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  nutriInfoTxt: {
    flex: 1,
    fontSize: 14,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginBottom: 40,
  },
  commonTxt: {
    flex: 1,
    fontSize: 12,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    marginTop: 10,
  },
  nutritionTitleTxt: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  nutritionValueTxt: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'right',
  },

  //Buttons Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  favBtn: {
    padding: 10,
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
  addToMealImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  dishImg: {
    marginTop: 20,
    height: 150,
    width: '100%',
  },
  commonImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  backImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
})
