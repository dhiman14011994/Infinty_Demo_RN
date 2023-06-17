//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  otpVw: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //TextInput Styles
  otpTxtInput: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    borderRadius: 40,
    fontFamily: font.NUNITO_BOLD,
  },
})