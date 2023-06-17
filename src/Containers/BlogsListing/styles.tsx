//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  swiperHeight: 200,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  wrapper: {},
  scrollVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  swiperContentVw: {
    height: 200,
  },
  swiperTxtVw: {
    position: 'absolute',
    bottom: 15,
  },
  indexVw: {
    height: 20,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
    bottom: 0,
  },
  swiperCntnr: {
    height: 200,
    marginBottom: 15,
  },
  activeIndex: {
    height: 8,
    width: 15,
    borderRadius: 20,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: color.APP_PINK_COLOR
  },
  inActiveIndex: {
    height: 8,
    width: 8,
    borderRadius: 15,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: '#e3e9f2'
  },
  titleCntnrVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  menuVw: {
    height: 40, 
    width: '100%',
    flexDirection: 'row',
  },
  selectedVw: {
    width: 30,
    backgroundColor: color.APP_PINK_COLOR,
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
  },
  tblVw: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  opqVw: {
    height: 200,
    position: 'absolute',
    backgroundColor: 'black'
  },

  //Menu Button
  menuBtn: { 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 15,
  },

  //Text styles
  menuTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
  },
  subTitleTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  titleTxt: {
    width: '45%',
    marginLeft: 15,
    padding: 5,
    fontSize: 14,
    color: 'white',
    backgroundColor: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  noBlogsTxt: {
    fontSize: 21,
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    alignSelf: 'center'
  },
  infoTxt: {
    // width: '60%',
    fontSize: 20,
    margin: 15,
    marginBottom: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },

  //Image Styles
  bannerImg: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -2,
  },
  arrowImg: {
    height: 15,
    width: 15
  }
})