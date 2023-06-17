//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,

  mainVw: {
    flex: 1,
    margin: 15,
    marginBottom: 5,
  },

  //Text Styles
  titleTxt: {
    flex: 1,
    marginTop: 5,
    width: '100%',
    fontSize: 16,
    color: 'black',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    textAlign: 'left',
  },
  descTxt: {
    flex: 1,
    width: '100%',
    fontSize: 12,
    color: 'black',
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'left',
  },

  //Image Styles
  bannerImg: {
    marginTop: 5,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  }
})