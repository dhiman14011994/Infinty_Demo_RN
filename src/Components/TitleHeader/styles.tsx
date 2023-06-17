//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import font from '../../Resources/Fonts';
import color from '../../Constants/Colors';

export const styles = ScaleSheet.create({
  mainVw: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },
  mainVw1: {
    width: '100%',
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },
  profileImgVw: {
    height: 30,
    width: 30,
    borderColor: color.DARK_RED,
    borderRadius: 40,
  },
  shadowVw: {
    width: '100%',
    backgroundColor: 'white',
    height: 2,
  },
  bottomVw: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 0,
  },

  //Buttons Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  rightBtn: {
    height: 40,
    width: '12%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  leftDualBtn: {
    height: 40,
    width: '24%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },

  //Text Styles
  titleTxt: {
    flex: 1,
    margin: 20,
    marginTop: 5,
    marginBottom: 0,
    fontSize: 23,
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
  title1Txt: {
    margin: 20,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 30,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },

  //Images Styles
  btnLeftImg: {
    height: 15,
    width: 15,
    marginTop: 10,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  btnRightmg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  profileImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 40,
  },
  bgImg: {
    height: 30,
    marginTop: 10,
    width: '100%',
    resizeMode: 'cover',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
})