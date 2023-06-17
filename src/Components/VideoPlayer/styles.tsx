//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },

  //Button Styles
  crossBtn: {
    height: 40,
    width: 80,
    paddingRight: 20,
    justifyContent: 'center',
  },

  //Images Styles 
  crossImg: {
    height: 15,
    width: 15,
    marginLeft: 20,
    resizeMode: 'contain'
  },
})