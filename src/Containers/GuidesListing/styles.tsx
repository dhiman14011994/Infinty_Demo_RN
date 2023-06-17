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
  scrollVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  swiperContentVw: {
    height: 200,
    justifyContent: 'flex-end'
  },
  swiperTxtVw: {
    marginBottom: 10,
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
    marginBottom: 25,
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
    marginTop: 10,
  },
  tblVw: {
    paddingTop: 5,
  },
  opqVw: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black'
  },
  
  //Text styles
  titleTxt: {
    width: '60%',
    marginLeft: 15,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },
  listTitleTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
    textAlign: 'left',
  },
  infoTxt: {
    width: '60%',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },

  //Image Styles
  bannerImg: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
})