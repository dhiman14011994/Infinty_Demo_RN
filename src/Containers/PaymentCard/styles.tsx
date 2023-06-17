//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,
  marginLeft: 10,
  marginRight: 10,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  cardVw: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInputCntnr: {
    marginTop: 40,
    padding: 20,
    paddingTop: 0,
    borderRadius: 8,
  },
  dataVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },

  //Textinput styles
  commonTxtInput: {
    height: 40,
    marginTop: 10,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'white',
    backgroundColor: color.APP_COMMON_INPUT_COLOR,
    fontFamily: font.NUNITO_REGULAR,
  },

  //Text Styles
  cardNoTxt: {
    fontSize: 16,
    marginBottom: 25,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  inputTitleTxt: {
    fontSize: 18,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  cardSubText: {
    fontSize: 10,
    marginBottom: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  cardSubDescText: {
    fontSize: 15,
    maxHeight: 40,
    marginBottom: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },

  //Image Styles
  cardImg: {
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'absolute',
  },
  cardIconImg: {
    height: 30,
    width: 40,
    marginTop: 25,
    marginBottom: 25,
    resizeMode: 'contain',
  },
})