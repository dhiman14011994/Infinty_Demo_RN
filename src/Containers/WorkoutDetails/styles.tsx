//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  marginTop: 5,
  marginBottom: 10,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  topNavVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsVw: {
    flex :1,
    marginTop: 110,
    width: '100%',
  },
  allDataCntnr: {
    borderRadius: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR,
    marginTop: 20,
  },
  tbl: {
    flex: 1,
    marginTop: 10,
  },
  infoVw: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,  
  },
  tagVw: {
    backgroundColor: color.APP_LIGHT_PINK,
    borderRadius: 60,
    marginLeft: 15,
    marginVertical: 10,
  },

  //Button Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Text styles
  tagTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    padding: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },
  titleTxt: {
    flex: 1,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
  },
  infoTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  sessionTxt: {
    flex: 1,
    fontSize: 14,
    marginTop: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  headerTxt: {
    width: '70%',
    fontSize: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    marginRight: '15%',
  },

  //Image Styles
  bannerImg: {
    position: 'absolute',
    height: 250,
    width: '100%',
    zIndex: -1,
  },
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain' 
  },
  infoImg: { 
    height: 18, 
    width: 18, 
    resizeMode: 'contain' 
  },
})