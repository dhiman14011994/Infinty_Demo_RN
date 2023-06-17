//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    margin: 15,
    marginRight: 0,
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row'
  },
  seeAllVw: {
    flexDirection: 'row', 
    marginTop: 20, 
    alignItems: 'center'
  },
  textCntnrVw: { 
    width: '45%' 
  },

  //Text Styles
  titleTxt: {
    flex: 1,
    width: '100%',
    fontSize: 18,
    color: 'black',
    fontFamily: font.FONT_MULI_BOLD,
    textAlign: 'left',
    marginBottom: 5,
    paddingRight: 5,
  },
  descTxt: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    color: color.GREY,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'left',
    paddingRight: 5,
  },
  seeAllTxt: {
    fontSize: 16,
    fontFamily: font.FONT_MULI_SEMI_BOLD,  
    marginRight: 20,
  },

  //Image Styles
  logoImg: {
    height: '100%',
    width: '55%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  arrowImg: { 
    height: 15, 
    width: 15 
  },
})