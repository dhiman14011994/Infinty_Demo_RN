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
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  allDataCntnr: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
    // marginTop: 160,
  },
  bannerVw: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    height: 250, 
    width: '100%', 
    zIndex: -1,
  },
  tagVw: {
    backgroundColor: color.APP_LIGHT_PINK,
    borderRadius: 60,
    marginLeft: 15,
    marginBottom: 10,
  },
  topNavVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsVw: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  titleCntnr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  paddingView: {
    height: 80,
    width: 10,
  },
  commonVw: {
    flexDirection: 'row',
    marginTop: 10
  },
  htmlCntnr: {
    margin: 15,
    marginBottom: 0,
  },
  opqVw: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black'
  },
  likeTitleVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  userInfoVw: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dotVw: {
    height: 5,
    width: 5,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: color.VERY_LIGHT_GREY,
  },

  //Text styles
  titleTxt: {
    flex: 1,
    fontSize: 20,
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  headingTxt: {
    flex: 1,
    fontSize: 17,
    color: 'black',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  infoTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameTxt: {
    fontSize: 14,
    marginLeft: 10,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  timeTxt: {
    fontSize: 14,
    marginLeft: 10,
    color: color.VERY_LIGHT_GREY,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  subHeadTxt: {
    fontSize: 14,
    color: color.APP_LIGHT_PINK,
    fontFamily: font.NUNITO_REGULAR,
    padding: 15,
    paddingTop: 0,
  },
  tagTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },

  //Buttons Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  //Image Styles
  bannerImg: {
    height: 250,
    width: '100%',
  },
  kclImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  commonImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  userImg: {
    height: 22,
    width: 22,
    borderRadius: 22,
    marginLeft: 15,
    backgroundColor: color.APP_COMMON_GREY,
  },
  playImg: {
    height: 30,
    width: 45,
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute'
  },
})
