
import { Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  totalMargin: 50,
  marginRight: 15,
  height: 35,
  barHeight: 10,

  mainVw: {
    backgroundColor: color.APP_PINK_COLOR,
    flex: 1,
  },
  topMenuTbl: {
    flex: 1,
  },
  switchVw: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center'
  },
  scrollVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  titleCntnrVw: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  titleDateCntnrVw: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  calTargetVw: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  paddingView: {
    height: 0,
    width: 10,
  },
  marginView: {
    height: 10,
    width: 0,
  },
  getNowCntnr: {
    flex: 1,
    height: 200,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  shadowVw: {
    width: '100%',
    backgroundColor: 'white',
    height: 2,
  },
  bottomVw: {
    height: 15,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 20,
  },
  greyLineVw: {
    width: 50,
    marginRight: 10,
    backgroundColor: `rgba(51, 51, 51, ${0.6})`
  },
  pointsVw: {
    marginHorizontal: 20,
    flexDirection: 'row'
  },
  calVwCntnr: {
    marginTop: 20,
    marginBottom: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  calVw: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: color.APP_PINK_COLOR
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
  graphVw: { 
    margin: 15, 
    marginBottom: 0,
    padding: 10, 
    backgroundColor: color.APP_LIGHT_BG_COLOR, 
    borderRadius: 8 
  },
  macroCntnr: {
    flexDirection: 'row', 
    marginTop: 5,
    paddingTop: 15,
    borderColor: color.APP_COMMON_BG_COLOR
  },
  borderVw: {
    width: '100%',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },

  //Buttons Styles
  topActiveBtn: {
    height: 35,
    width: '50%',
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: color.DARK_RED,
    borderRadius: 8,
    marginLeft: 15,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topInActiveBtn: {
    backgroundColor: color.VERY_LIGHT_GREY,
  },
  getNowBtn: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 60,
  },
  weekDayBtn: {
    marginTop: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  //Text Styles
  mealtxt: {
    fontSize: 12,
    marginRight: 10,
    fontFamily: font.NUNITO_REGULAR,
  },
  todaytxt: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    alignSelf: 'center',
  },
  caloriTxt: {
    marginTop: 10,
    fontSize: 16,
    alignSelf: 'flex-start',
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  setGoalTxt: {
    fontSize: 20,
    marginHorizontal: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
  },
  macroTitleTxt: {
    fontSize: 14,
    color: color.APP_LIGHTER_GREY,
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  consumedVal: {
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  targetVal: {
    fontSize: 18,
    color: '#FFFFFFE6',
    fontFamily: font.NUNITO_LIGHT,
  },
  macroValueTxt: {
    fontSize: 18,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  ourPersonalTxt: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },
  pointsTitleTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  pointsDescTxt: {
    fontSize: 10,
    marginBottom: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },
  titleTxt: {
    fontSize: 20,
    marginRight: 10,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  getACoachTxt: {
    width: '60%',
    fontSize: 17,
    marginLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  nowTxt: {
    fontSize: 46,
    marginLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_BLACK,
    textAlign: 'left',
  },
  kclTxt: {
    flex: 1,
    fontSize: 20,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'right',
  },
  noDataTxt: {
    fontSize: 22,
    color: color.DARK_RED,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  weekDayTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  weekSelectedTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
  },
  topMenuTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  calTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
  },
  calTitleTxt: {
    fontSize: 13,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },

  //Image Styles
  bannerImg: {
    height: 200,
    width: Dimensions.get('screen').width,
    borderRadius: 8,
    position: 'absolute',
    resizeMode: 'cover',
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  tickImg: {
    height: 12,
    width: 12,
    marginTop: 5,
    marginRight: 10,
    resizeMode: 'contain'
  },
  downImg: {
    height: 10,
    width: 14,
    left: 10,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: -9
  },
  upImg: {
    height: 10,
    width: 14,
    right: 10,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -9
  },
})