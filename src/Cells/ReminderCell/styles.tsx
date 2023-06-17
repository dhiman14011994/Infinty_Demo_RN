//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  txtVw: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
  },

  //Text Styles
  titleTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    color: 'white',
  },
  descTxt: {
    fontSize: 10,
    marginTop: 5,
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'left',
    color: 'white',
  },
  timeTxt: {
    fontSize: 10,
    color: 'white',
    fontFamily: font.NUNITO_LIGHT,
    textAlign: 'right',
  },

  //Image styles
  img: {
    height: 36,
    width: 36,
    resizeMode: 'contain'
  }
})