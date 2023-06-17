//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  size: 80,

  mainVw: {
    height: '100%',
    backgroundColor: color.APP_HEADER_BG_COLOR,    
  },
  btnVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  txtCntnr: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  loaderVw: {
    height: 80,
    width: 80,
  },

   //Text Styles
   noMsgTxt: {
    fontSize: 18,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center', 
  },
  titleTxt: {
    fontSize: 21,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center', 
  },

  //Images Styles 
  noMessageImg: {
    height: 127,
    width: 127,
    borderRadius: 50,
  },
})