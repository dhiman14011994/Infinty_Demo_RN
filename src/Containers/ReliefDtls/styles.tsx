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
    borderRadius: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  topNavVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsVw: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
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
    marginVertical: 0,
  },
  titleCntnrVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 25,
  },
  tagVw: {
    backgroundColor: color.APP_LIGHT_PINK,
    borderRadius: 60,
    marginLeft: 15,
    marginBottom: 10,
  },
  opqVw: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black'
  },
  opqVw1: {
    position: 'absolute',
    height: 180,
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black'
  },
  likeTitleVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },

  //Buttons Styles
  playBtn: {
    height: 180,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  openBtn: {
    margin: 15,
    marginTop: 20,
    marginBottom: 0,
    padding: 5,
  },
  favBtn: {
    padding: 10,
  },

  //Text styles
  tagTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },
  subHeadTxt: {
    fontSize: 14,
    color: color.APP_LIGHT_PINK,
    fontFamily: font.NUNITO_REGULAR,
    padding: 15,
    paddingTop: 0,
  },
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
  descTxt: {
    flex: 1,
    fontSize: 18,
    margin: 15,
    marginBottom: 0,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  infoTxt: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  openTxt: {
    fontSize: 14,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },

  //Image Styles
  bannerImg: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
  },
  playerImg: {
    height: 180,
    width: '100%',
    zIndex: -1,
  },
  playImg: {
    height: 30, 
    width: 45, 
    position: 'absolute', 
    resizeMode: 'contain', 
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
  arrowImg: {
    height: 15,
    width: 15
  },
  favImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
})
