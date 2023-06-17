//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  shareVw: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center'
  },

  //Button Styles
  shareBtn: {
    height: 40,
    width: '80%',
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    backgroundColor: color.APP_PINK_COLOR,
    borderRadius: 100
  },

  //Text Styles
  yourCodeTxt: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  giftTxt: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    color: color.APP_COMMON_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  codeText: {
    fontSize: 18,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white',
    textAlign: 'center',
  },

  //Images Styles
  bgImg: {
    marginTop: 30,
    height: 300,
    width: '100%',
    resizeMode: 'contain',
  },
  shareImg: {
    height: 16,
    width: 16,
    marginLeft: 10,
    resizeMode: 'contain',
  }
})