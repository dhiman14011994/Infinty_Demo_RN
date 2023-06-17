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
    marginTop: 160,
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
    marginBottom: 0,
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
  likeTitleVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  userInfoVw: {
    flex: 1,
    // flexDirection: 'row', 

    marginVertical: 15,
  },

  //Buttons Styles
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
  uploadButton: {
    height: 40,
    margin: 10,
    marginTop: 20,
    backgroundColor: color.APP_HEADER_BG_COLOR,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inviteButton: {
    margin: 10,
    height: 40,
    borderWidth: 1,
    borderColor: color.APP_HEADER_BG_COLOR,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
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
  infoTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
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
  nameTxt: {
    fontSize: 14,
    marginLeft: 10,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  stepTxt: {
    fontSize: 14,
    margin: 10,
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  detailTxt: {
    fontSize: 14,
    marginLeft: 10,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'left',
    marginBottom: 5
  },
  titleText: {
    fontSize: 14,
    margin: 10,
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  uploadText: {
    fontSize: 18,
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_SEMI_BOLD,
  },

  //Image Styles
  bannerImg: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
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
  userImg: {
    height: 22,
    width: 22,
    borderRadius: 22,
    marginLeft: 15,
    backgroundColor: color.APP_COMMON_GREY,
  },
})
