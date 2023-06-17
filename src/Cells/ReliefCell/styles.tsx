//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  marginBottom: 15,
  marginBottomMin: 5,
  totalMargin: 30,

  mealVw: {
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    margin: 15,
    borderRadius: 8,
    width: 250,
  },

  //Text Styles
  mealdataTxt: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    margin: 10,
    marginBottom: 5,
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
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
})