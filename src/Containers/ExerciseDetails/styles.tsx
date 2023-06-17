//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 30,
  marginRight: 15,
  totalPadding: 30,
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  contentVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  tabCntnr: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    borderRadius: 8,
  },
  htmlCntnr: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  similarVw: {
    height: 300,
    marginBottom: 100
  },
  detailsVw: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  playimgVw: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 260,
    width: '100%',
    zIndex: 0,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingBottom: 10,
  },
   descTxtMargin: {
    marginTop: 15,
  },

  //Buttons Styles
  unSelectBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    height: 200,
    width: '100%',
  },
  selectedBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_PINK_COLOR,
    borderRadius: 8,
  },
  btnstyle: {
    height: 30,
    borderRadius: 15,
    backgroundColor: color.APP_HEADER_BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
  },
  titleCntnrVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    marginTop: 20,
  },

  //Text styles
  descTxt: {
    fontSize: 13,
    fontFamily: font.NUNITO_REGULAR,
    marginLeft: 15,
    marginRight: 15,
    color: '#8F92A1',
  },
  tabTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  titleTxt: {
    // flex: 1,
    fontSize: 20,
    margin: 16,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  detailTxt: {
    fontSize: 15,
    marginLeft: 16,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'left',
    marginBottom: 5
  },
  titleText: {
    fontSize: 18,
    marginLeft: 16,
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  painText: {
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_REGULAR,
  },

  //Image Styles
  bannerImg: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
  },
  playImg: {
    height: 60,
    width: 60,
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
})