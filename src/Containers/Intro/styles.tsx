//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import font from '../../Resources/Fonts';
import color from '../../Constants/Colors';

export const styles = ScaleSheet.create({

  height: 50,
  marginTop: 40,
  //Views
  container: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  swiperVw: {
    height: 530
  },
  swiper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  nextPrevVw: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextPrevBtn: {
    marginTop: 10,
    marginBottom: 40,
    padding: 60,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 40,
    alignSelf: 'center',
    backgroundColor: color.APP_COMMON_BTN_COLOR,
  },
  skipBtn: {
    marginTop: 10,
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'flex-end',
  },
  indexVw: {
    height: '100%',
    width: '34%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeIndex: {
    height: 5,
    width: 15,
    borderRadius: 20,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: 'white'
  },
  inActiveIndex: {
    height: 5,
    width: 5,
    borderRadius: 15,
    borderWidth: 3,
    marginLeft: 2.5,
    marginRight: 2.5,
    borderColor: '#e3e9f2'
  },
  navBtnVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  menuIconVw: {
    height: 40,
    width: 40,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: 'center',
  },
  menuIconExtndVw: {
    marginLeft: 0,
    marginRight: 20
  },
  linearGradient: {
    position: 'absolute',
    height: 90,
    width: '100%',
  },

  //Text
  descTxt: {
    fontSize: 18,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
  },
  btnTxt: {
    fontSize: 18,    
    fontFamily: font.NUNITO_BOLD,
    color: 'white',
    textAlign: 'center',
  },
  skipTxt: {
    fontSize: 12,    
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
    textAlign: 'center',
  },

  //Images
  introImg: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
  },
  menuIconImg: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  logoImg: { 
    height: 50, 
    width: 90,
    marginTop: 15,
    marginLeft: 15,
    resizeMode: 'contain' ,
  },
});