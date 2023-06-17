//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
  },
  headerVw: {
    height: 40,
    width: '100%',
    justifyContent: 'center'
  },

  //Button Styles
  crossBtn: {
    height: 40,
    width: 80,
    paddingRight: 20,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  //Images Styles 
  crossImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
})