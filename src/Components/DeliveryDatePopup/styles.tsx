
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
  dateVw: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 8,
    borderColor: color.DARK_RED,
  },
  timeVw: {
    margin: 5,
    borderColor: color.DARK_RED,
    borderRadius: 40,
  },
  tblVw: {
    margin: 15,
    maxHeight: 200,
  },

  //Text Styles
  greyTitleTxt: {
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    color: color.GREY,
  },
  monthTxt: {
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: font.FONT_MULI_BOLD,
  },
  dateTxt: {
    fontSize: 20,
    margin: 5,
    fontFamily: font.FONT_MULI_BOLD,
    textAlign: 'center',
  },
  timeTxt: {
    fontSize: 12,
    margin: 5,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'center',
  },
  weekTxt: {
    fontSize: 15,
    margin: 5,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'center',
    color: color.GREY,
  },
})