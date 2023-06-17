
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Platform } from 'react-native';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 50,
  dataVw: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  addressVw: {
    marginTop: 0,
    padding: 10,
    borderColor: color.DARK_RED,
  },
  tblVw: {
    marginBottom: 15,
    maxHeight: 200,
  },
  tempVw: { 
    height: 25, 
    width: 25, 
    marginRight: 10,
    backgroundColor: 'red' 
  },
  inputTxtVw: {
    margin: 15,
  },

  //Input Styles
  InputTxt: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: font.FONT_MULI_SEMI_BOLD,
  },

  //Text Styles
  greyTitleTxt: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    color: color.GREY,
  },
  blackTitleTxt: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: font.FONT_MULI_SEMI_BOLD,
  },
  redTitleTxt: {
    margin: 10,
    fontSize: 18,
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    color: color.DARK_RED,
  },
  monthTxt: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: font.FONT_MULI_BOLD,
  },
  addressCatTxt: {
    fontSize: 12,
    fontFamily: font.FONT_MULI_REGULAR,
  },
})