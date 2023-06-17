//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  cellVw: {
    padding: 10,
    margin: 20,
    marginBottom: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    borderRadius: 8,
  },

  //Text Styles
  settingTxt: {
    fontSize: 13,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left', 
    color: 'white',
    flex: 1,
  },

  //Images Styles
  settingImg: {
    height: 20,
    width: 20,
    marginRight: 15,
    resizeMode: 'contain'
  },
  arrowImg: {
    marginRight: 0,
    marginLeft: 10,
  },
})