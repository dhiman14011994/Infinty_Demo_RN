//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    width: 160,
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  //Text Styles
  descTxt: {
    flex: 1,
    marginTop: 5,
    width: '100%',
    fontSize: 14,
    color: 'black',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    textAlign: 'left',
  },

  //Image Styles
  logoImg: {
    height: 100,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  }
})