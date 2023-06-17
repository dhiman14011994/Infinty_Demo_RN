import { Platform } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  btnHeight: 30,
  mainVw: {
    flex: 1,
    backgroundColor: 'white',
  },
  commonVw: {
    flex: 1,
    position: 'absolute',
  },
  sideVw: {
    width: 40,
    minHeight: 25,
  },
  dataVw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataCntnr: {
    flexDirection: 'row',
    marginTop: 30,
  },
  titleVw: {
    marginTop: 10,
    flexDirection: 'row',
  },
  marginVw: {
    height: 20,
  },
  progressCntnr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressVw1: {
    height: 10,
    width: 5,
  },
  progressVw2: {
    height: 35,
    width: 5,
  },
  exerciseTbl: {
    flex: 1,
    height: 400,
  },
  dataTbl: {
    height: '100%',
    width: '100%',
  },
  imgVw: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#C9C9D1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Button Styles
  nextBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  videoBtn: {
    height: 30,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff1A',
  },

  //Text Styles
  countTxt: {
    fontSize: 236,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  titleTxt: {
    flex: 1,
    fontSize: 22,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    color: 'white',
  },
  exeName: {
    flex: 1,
    fontSize: 17,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    color: 'white',
  },
  idealTimeTxt: {
    fontSize: 13,
    marginBottom: 5,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    color: 'white',
  },
  timeTxt: {
    fontSize: 22,
    marginLeft: 5,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
    color: 'white',
  },
  stopTxt: {
    fontSize: 21,
    marginTop: 20,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
    color: 'white',
  },
  countTimeTxt: {
    fontSize: 70,
    marginTop: 60,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
    color: 'white',
  },
  nextExeTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
    color: 'white',
    marginRight: 5,
  },

  //Image Styles
  crossImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  clockImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  stopImg: {
    height: 80,
    width: 80,
    marginTop: 40,
    resizeMode: 'contain',
  },
  nextImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  tickImg: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  arrowImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
