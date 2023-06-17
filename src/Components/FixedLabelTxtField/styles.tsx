//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { Platform } from 'react-native';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  input: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    margin: 20,
    marginBottom: 15,
    marginTop: 0,
    backgroundColor: color.APP_COMMON_INPUT_COLOR,
    borderRadius: 50,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },

  //TextInput Styles
  commonTxt: {
    fontSize: 12,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  errorTxt: {
    marginTop: 5,
    paddingLeft: 5,
    fontSize: 13,
    fontFamily: font.NUNITO_REGULAR,
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    color: color.DARK_RED,
  },

  //Image Styles
  leftImg: {
    height: 13,
    width: 13,
    marginRight: 10,
    resizeMode: 'contain',
  },
  rightImg: {
    height: 13,
    width: 13,
    marginLeft: 10,
    resizeMode: 'contain'
  },
});