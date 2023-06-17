//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  txtVwCntnr: {
    margin: 15,
    marginBottom: 20,
  },
  imageVw: {
    flexDirection: 'row',
    margin: 15,
    marginTop: 20,
    alignItems: 'center'
  },
  feildVw: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: color.APP_PINK_COLOR
  },
  feildCntnr: {
    marginBottom: 20,
  },

  //Text Styles
  changeProfileTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  feildTitleTxt: {
    fontSize: 14,
    fontFamily: font.NUNITO_REGULAR,
    color: color.APP_LIGHT_COLOR
  },
  feildTxt: {
    flex: 1,
    fontSize: 18,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white'
  },

  //Buttom Styles
  prifileBtn: {
    height: 36,
    width: 155,
    marginLeft: 20,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
  },

  //Image Styles
  profileImg: {
    height: 54,
    width: 54,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  editImg: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },

})