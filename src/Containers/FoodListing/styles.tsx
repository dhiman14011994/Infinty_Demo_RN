//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  searchVw: {
    margin: 15,
    padding: 10,
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    paddingBottom: Platform.OS == 'ios' ? 10 : 0,
    alignItems: 'center',
    borderRadius: 80,
    flexDirection: 'row',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  srchCntnr: {
    backgroundColor: color.APP_COMMON_BG_COLOR,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cartCntnr: {    
    width: '100%',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  cartVw: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: color.APP_PINK_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topMenuTbl: {
    backgroundColor: color.APP_COMMON_BG_COLOR
  },

  //Input Styles
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },

  //Text Styles
  srchtxt: {
    fontSize: 18,
    color: 'white',
    backgroundColor: color.APP_COMMON_BG_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
    paddingLeft: 20,
    paddingRight: 20,
  },
  srchRedtxt: {
    color: color.APP_PINK_COLOR,
  },
  itemtxt: {
    fontSize: 13,
    fontFamily: font.NUNITO_REGULAR,
    color: 'white'
  },
  amountTxt: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white'
  },
  viewCartTxt: {
    fontSize: 18,
    marginRight: 5,
    fontFamily: font.NUNITO_BOLD,
    color: 'white'
  },

  //Image Styles
  searchImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },

})