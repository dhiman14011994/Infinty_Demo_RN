//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
  },
  scrollVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR
  },

  //Buttons Styles
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: color.DARK_RED,
    margin: 20,
    marginTop: 40,
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    margin: 20,
    marginTop: 0,
  },

  //Text Styles
  deletetTxt: {
    fontSize: 15,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },

  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  logoutImg: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain',
  },
});
