//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,

  mealVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR,
    margin: 15,
    borderRadius: 8,
  },
  mealFullVw: {
    flex :1,    
    backgroundColor: color.APP_COMMON_BG_COLOR,
    margin: 15,
    marginBottom: 5,
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 150,
  },
  opqVw: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: 'black'
  },
  tagVw: {
    marginTop: 10,
    paddingVertical: 2,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: color.APP_LIGHT_PINK,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  //Text Styles
  mealdataTxt: {
    fontSize: 22,
    color: color.APP_LIGHT_PINK,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
    margin: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  startNowTxt: {
    fontSize: 22,
    color: 'white',
    backgroundColor: color.APP_LIGHT_PINK,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  descTxt: {
    flex: 1,
    width: 250,
    fontSize: 14,
    color: color.APP_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    margin: 10,
    marginTop: 0,
  },
  dietText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  tagTxt: {
    alignSelf: 'flex-start',
    fontSize: 13,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },


  //Images Styles
  mealImg: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
  },
})