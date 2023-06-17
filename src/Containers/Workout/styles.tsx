//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 30,
  marginRight: 15,

  mainVw: {
    backgroundColor: color.APP_PINK_COLOR,   
  },
  myWorkoutVw: {
    height: 160,
    margin: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  scrollVw: {
    backgroundColor: color.APP_PINK_COLOR,   
  },
  dataVw: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,   
    overflow: 'hidden'
  },
  workoutTxtVw: {
    backgroundColor: color.APP_PINK_COLOR,
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  getNowVw: {
    backgroundColor: color.APP_PINK_COLOR,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCntnrVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  paddingView: {
    height: 80,
    width: 10,
  },
  getNowCntnr: {
    flex: 1,
    marginBottom: 20,
  },
  dummyVw: {
    height: 10,
    width: 50,
  },
  opqVw: {
    height: 160,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: 'black',
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

  //Buttons Styles
  getNowBtn: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 60,
  },

  //Text Styles
  titleTxt: {
    fontSize: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  getACoachTxt: {
    fontSize: 13,
    marginLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    flex: 1,
  },
  banerTxt: {
    fontSize: 22,
    marginLeft: 5,
    marginRight: 5,
    bottom: 5,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
    flex: 1,
    position: 'absolute',
  },

  //Image Styles
  bannerImg: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  coachImg: {
    height: 50,
    width: 50,
    bottom: 0,
    zIndex: 10,
    resizeMode: 'contain',
    position: 'absolute',
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  logoImg: {
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
});
