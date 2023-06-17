//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({

  buttonWidth: 30,
  buttonHeight: 10,
  buttonRadius: 100,
  sliderWidth: 20,
  sliderHeight: 20,
  sliderRadius: 100,
  totalMargin: 40,
  marginTop: 30,
  totalPadding: 10,
  margin: 15,
  barHeight: 180,
  radius: 55,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
    zIndex: 1,
  },
  allDataVw: {
    flex: 1,
    marginTop: 20,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  unitsVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unitExtndVw: {
    marginLeft: 15,
    marginRight: 15,
    alignSelf: 'flex-start'
  },
  progressVw: { 
    // flexDirection: 'row', 
    marginHorizontal: 15, 
    flex: 1, 
    marginTop: 20 ,
    alignItems:'center'
  },
  measureVw: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    marginBottom: 20,
  },
  paddingVw: {
    height: 10,
  },
  menuVw: {
    paddingHorizontal: 15,
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectionVw: {
    width: 40,
    marginTop: 5,
    borderRadius: 2,
  },
  borderVw: {
    height: 30,
    marginVertical: 10,
    backgroundColor: 'white'
  },
  weekSelectionBtn: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row' 
  },

  //Buttons Styles
  menuBtn: {
    alignItems: 'center',
    marginRight: 15,
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  measuerBtn: {
    flex: 1,
    borderRadius: 8,
    marginRight: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAEAEA',
  },
  commonBtn: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  //Text Styles
  menuBtnTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
  },
  listTxt: {
    paddingBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
  },
  unitsTxt: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
  },
  dataTxt: {
    fontSize: 24,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: font.NUNITO_BOLD,
    color: 'white',

  },
  dateTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
  macroTxt: {
    flex: 0,
    fontSize: 25,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
  commonTxt: {
    flex: 1,
    fontSize: 20,
    marginTop: 1,
    marginRight: 5,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    color: 'white',
  },
  measurementTxt: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    color: color.DARK_RED,
  },
  barLabelTxt: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
  },

  //Images Styles
  arrowImg: {
    height: 15,
    width: 15,
    marginLeft: 10,
    resizeMode: 'contain'
  },
  fitImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
})