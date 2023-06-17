//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

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
  mealTimeVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: color.VERY_LIGHT_GREY,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  servingsCntnr: {
    marginTop: 15,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },


  //Button Styles
  crossBtn: {
    height: 40,
    width: 40,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  mealTimeBtn: { 
    padding: 10, 
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 50,
  },

  //Text Styles
  addToMealTxt: {
    flex: 1,
    fontSize: 14,
    marginLeft: 40,
    textAlign: 'center',
    fontFamily: font.FONT_MULI_REGULAR
  },
  servingsTxt: {
    fontSize: 14,
    marginRight: 20,
    textAlign: 'center',
    fontFamily: font.FONT_MULI_SEMI_BOLD
  },
  servingsQytTxt: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: font.FONT_MULI_REGULAR
  },
  kaclQtyTxt: {
    marginBottom: 10,
    fontSize: 26,
    width: '100%',
    textAlign: 'center',
    color: color.DARK_RED,
    fontFamily: font.FONT_MULI_BOLD,
  },
  mealTimeTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
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