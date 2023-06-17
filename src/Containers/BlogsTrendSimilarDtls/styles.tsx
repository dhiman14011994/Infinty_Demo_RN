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
    backgroundColor: 'white'
  },
  allDataCntnr: {
    borderRadius: 20,
    backgroundColor: 'white',
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
  paddingView: {
    height: 80,
    width: 10,
  },
  commonVw: {
    flexDirection: 'row',
    marginTop: 10
  },
  htmlCntnr: {
    marginLeft: 15,
    marginRight: 15,
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
    backgroundColor: color.DARK_RED,
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

  //Buttons Styles
  favBtn: {
    padding: 10,
  },

  //Text styles
  tagTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },
  subHeadTxt: {
    fontSize: 14,
    color: color.DARK_RED,
    fontFamily: font.NUNITO_SEMI_BOLD,
    padding: 15,
    paddingTop: 0,
  },
  titleTxt: {
    flex: 1,
    fontSize: 20,
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    color: 'black',
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
    color: 'black',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  subTitleTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
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
})
