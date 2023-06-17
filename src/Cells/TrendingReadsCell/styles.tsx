//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    width: 210,
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  newTxtVw: {
    flex: 1,
    top: 10,
    position: 'absolute',
    borderRadius: 60,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    backgroundColor: color.DARK_RED,
  },

  //Text Styles
  titleTxt: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    color: 'black',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    textAlign: 'left',
  },
  descTxt: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    color: 'black',
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'left',
  },
  newTxt: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    textAlign: 'center',
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,    
  },

  //Image Styles
  logoImg: {
    height: 130,
    width: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  }
})