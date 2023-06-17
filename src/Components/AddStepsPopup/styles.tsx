//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { ColorPropType } from 'react-native';

export const styles = ScaleSheet.create({

  buttonWidth: 30,
  buttonHeight: 10,
  buttonRadius: 100,
  sliderWidth: 20,
  sliderHeight: 20,
  sliderRadius: 100,

  mainVw: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opaqueVw: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    position: 'absolute'
  },
  popVw: {
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
    width: '80%',
    backgroundColor: 'white',
  },
  servingsCntnr: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitsVw: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Buttons Styles
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  crossBtn: {
    height: 40,
    width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },

  //Text Styles
  unitsTxt: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: font.FONT_MULI_REGULAR,
    color: color.HEADER_TITLE_COLOR,
  },
  dateTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: font.FONT_MULI_REGULAR,
    color: color.HEADER_TITLE_COLOR,
    marginLeft: 5,
    marginRight: 5,
  },
  addWeightTxt: {
    flex: 1,
    fontSize: 16,
    marginLeft: 40,
    textAlign: 'center',
    color: color.DARK_RED,
    fontFamily: font.FONT_MULI_SEMI_BOLD
  },
  servingsQytTxt: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: font.FONT_MULI_REGULAR
  },
  weightTxt: {
    fontSize: 26,
    textAlign: 'center',
    color: color.DARK_RED,
    fontFamily: font.FONT_MULI_BOLD,
  },

  //Image Styles
  commonImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  addSubImg: {
    height: 18,
    width: 18,
    margin: 10,
    resizeMode: 'contain'
  },
})