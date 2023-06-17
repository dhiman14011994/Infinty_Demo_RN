//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  barHeight: 12,
  barWidth: 120,
  swiperHeight: 200,
  totalMargin: 30,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  scrollVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  topMenuTbl: {
    width: '100%',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  bgView: {
    paddingTop: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  progressVw: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  bannerVw: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
  },
  stepsCntnrVw: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  stepsProgressVw: {
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  caloriesVw: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepsTxtVw: {
    justifyContent: 'flex-start',
  },
  recWorkoutTbl: {
    marginBottom: 10,
  },
  calTxtVw: {
    height: 50,
    justifyContent: 'space-between',
  },
  borderVw: {
    height: 60,
    width: 1,
    backgroundColor: color.APP_DARK_GREY,
    marginLeft: 5,
    marginRight: 10,
  },
  dividerVw: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: color.APP_DARK_GREY,
  },
  titleCntnrVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  paddingView: {
    height: 50,
    width: 10,
  },
  myWorkoutVw: {
    height: 160,
    width: '100%',
    margin: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  opqVw: {
    height: 160,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: 'black',
  },
  workoutTxtVw: {
    backgroundColor: color.DARK_RED,
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 10,
    marginTop: 15,
    marginBottom: 5,
  },

  //Text Styles
  titleTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
    textAlign: 'left',
  },
  bannertxt: {
    fontSize: 20,
    margin: 10,
    fontFamily: font.NUNITO_BOLD,
    color: 'white',
    textAlign: 'left',
  },
  activityTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },
  activityDataTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
  },
  targetTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'right',
  },
  workoutTxt: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
  },
  startNowTxt: {
    fontSize: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
  },

  //Image Styles
  activityImg: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  bannerImg: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  },
  logoImg: {
    flex: 1,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'absolute',
  },
  nextImg: {
    height: 20,
    width: 20,
    marginLeft: 5,
    resizeMode: 'contain',
  },
})