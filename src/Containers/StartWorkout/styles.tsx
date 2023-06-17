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
  topNavVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsVw: {
    height: '100%',
    width: '100%',
  },
  allDataCntnr: {
    borderRadius: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR,
    marginTop: 140,
  },
  tbl: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  sepVw: {
    marginTop: 10,
    backgroundColor: '#0000001A',
  },
  weekTopVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  weekEndVw: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },

  //Button Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDayBtn: {
    marginTop: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  //Text styles
  weekSelectedTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
  },
  weekDayTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  sessionTxt: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  dateTxt: {
    flex: 1,
    fontSize: 10,
    color: 'black',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  headerTxt: {
    width: '70%',
    fontSize: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    marginRight: '15%',
  },
  weekTxt: {
    fontSize: 15,
    width: 100,
    marginTop: 110,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    backgroundColor: color.DARK_RED,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },

  //Image Styles
  bannerImg: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
})