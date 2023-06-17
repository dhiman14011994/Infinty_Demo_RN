
import { Dimensions } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 30,
  totalMargin: 50,
  marginRight: 15,
  height: 35,
  barHeight: 10,

  mainVw: {
    backgroundColor: color.APP_PINK_COLOR,
    flex: 1,
  },
  topMenuTbl: {
    flex: 1,
  },
  scrollVw: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  titleCntnrVw: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  paddingView: {
    height: 0,
    width: 10,
  },
  bannerVw: {
    marginBottom: 15,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: '#F69FB2',
  },
  nameVw: {
    marginTop: 15,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: '#BA1F2A',
    flex: 1,
    overflow: 'hidden',
  },
  triangleCornerLayer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    width: 40,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 100,
    borderTopWidth: 100,
    borderRightColor: '#F69FB2',
    borderTopColor: color.APP_PINK_COLOR,
    zIndex: -1,
  },

  //Buttons Styles

  //Text Styles
  nameTxt: {
    fontSize: 20,
    flex: 1,
    marginRight: 10,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  titleTxt: {
    fontSize: 20,
    marginRight: 10,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  descTxt: {
    fontSize: 18,
    marginRight: 10,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  //Image Styles
  arrowImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  drImg: {
    height: '80%',
    width: '25%',
    backgroundColor: color.APP_PINK_COLOR,
    resizeMode: 'cover',
  },
  bannerImg: {
    width: '100%', 
  },
})