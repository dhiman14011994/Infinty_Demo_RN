//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mealVw: {
    backgroundColor: color.MOSTYLY_WHITE,
    margin: 15,
    borderRadius: 8,
    width: 250,
  },
  mealFullVw: {
    backgroundColor: color.MOSTYLY_WHITE,
    margin: 15,
    borderRadius: 8,
  },
  dietTxtVw: {
    flex: 1,
    position: 'absolute',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: color.DARK_RED,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    bottom: 10,
  },

  //Text Styles
  mealdataTxt: {
    flex: 1,
    width: 250,
    fontSize: 16,
    color: 'black',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    textAlign: 'left',
    margin: 10,
    marginBottom: 5,
  },
  dietTxt: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: font.FONT_MULI_BOLD,
    textAlign: 'left',
  },
  descTxt: {
    flex: 1,
    width: 250,
    fontSize: 14,
    color: color.GREY,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'left',
    margin: 10,
    marginTop: 0,
  },
  dietText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'center',
  },

  //Images Styles
  mealImg: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
})