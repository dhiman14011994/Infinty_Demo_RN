//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import font from '../../Resources/Fonts';
import color from '../../Constants/Colors';

export const styles = ScaleSheet.create({
  mainVw: {
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    
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
  roundVw: {
    height: 10, 
    width: '100%', 
    backgroundColor: color.APP_COMMON_BG_COLOR, 
    borderTopLeftRadius: 8, 
    borderTopEndRadius: 8
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
    fontSize: 16,
    width: '70%',
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
  titleDualTxt: {
    fontSize: 16,
    width: '52%',
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },

  //Images Styles
  btnLeftImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  multiBtnLeftImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  btnRightmg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  profileImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 40,
  },
})