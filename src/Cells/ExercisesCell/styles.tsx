//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 45,
  mainVw: {
    margin: 15,
    marginRight: 0,
    marginTop: 0,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  opqVw: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',    
    position: 'absolute',
    backgroundColor: 'black'
  },
  tagVw: {
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: '#F2DA61',
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },

  //Text Styles
  newTxt: {
    flex: 1,
    padding: 10,
    fontSize: 12,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    backgroundColor: color.APP_LIGHT_BG_COLOR
  },
  tagTxt: {
    fontSize: 11,
    color: 'black',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
  },

  //Image Styles
  logoImg: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
  }
})