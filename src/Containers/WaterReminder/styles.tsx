//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },
  reminerCntnr: {
    paddingVertical: 20,
    marginBottom: 0,
    borderColor: color.APP_COMMON_GREY
  },
  paddingVw: {
    height: 40,
  },
  scrollVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  bannerVw: {
    padding: 15,
    paddingTop: 30,
    paddingBottom: 40,
    flexDirection: 'row',
  },
  commonTbl: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 20,
  },

  //Button Styles
  commonBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    minWidth: 80,
    marginRight: 15,
    borderRadius: 40,
    borderColor: color.VERY_LIGHT_GREY,
  },

  //Text styles
  titleTxt: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    color: '#C9C9C9',
  },
  btnTxt: {
    fontSize: 14,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    color: 'white'
  },
  bannerTxt: {
    fontSize: 22,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
    color: '#1179E0'
  },

  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  iconImg: {
    height: 90,
    width: 90,
    marginRight: 10,
    resizeMode: 'contain',
  }
})