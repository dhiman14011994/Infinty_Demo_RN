//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mealVw: {
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    margin: 15,
    borderRadius: 8,
    width: 250,
  },
  dietTxtVw: {
    flex: 1,
    position: 'absolute',
    padding: 15,
    paddingVertical: 5,
    backgroundColor: color.APP_PINK_COLOR,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    bottom: 10,
  },

  //Text Styles
  mealdataTxt: {
    flex: 1,
    width: 250,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    margin: 10,
    marginBottom: 5,
  },
  dietTxt: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  descTxt: {
    flex: 1,
    fontSize: 12,
    color: color.VERY_LIGHT_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    margin: 10,
    marginTop: 0,
  },

  //Images Styles
  mealImg: {
    height: 150,
    width: 250,
    resizeMode: 'cover',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
})