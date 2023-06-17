//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  borderVw: {
    marginHorizontal: 15, 
    backgroundColor: color.APP_COMMON_GREY
  },
  imgNameCntnr: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  nameStepsCntnr: {
    flex: 1,
    marginLeft: 15
  },
  optnCntnr: {
    // flex: 1,
    height: '100%',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  marginVw: {
    height: 90
  },

  //Buttons Styles
  editBtn: { 
    flex: 1, 
    height: 30, 
    backgroundColor: 'white', 
    marginTop: 20, 
    borderRadius: 20, 
    justifyContent: 'center',
  },
   settingBtn: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  //Text Styles
  nameTxt: {
    fontSize: 22,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
    marginBottom: 5,
  },
  emailTxt: {
    fontSize: 17,
    marginTop: 1,
    fontFamily: font.NUNITO_REGULAR,
    color: color.APP_LIGHT_COLOR,
    textAlign: 'left',
  },
  editTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  settingTxt: {
    flex: 1,
    fontSize: 16,
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  logoutTxt: {
    flex: 1,
    fontSize: 18,
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },

  //Image Styles
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  settingImg: {
    height: 25,
    width: 25,
    marginRight: 5,
    resizeMode: 'contain',
  },
})