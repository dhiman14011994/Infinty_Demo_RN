//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  size: 80,

  mainVw: {
    height: '100%',
    backgroundColor: 'white',
    
  },
  txtCntnr: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderVw: {
    height: 80,
    width: 80,
  },

   //Text Styles
  titleTxt: {
    fontSize: 25,
    marginTop: 20,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center', 
  },

  //Images Styles 
  tickImg: {
    height: 127,
    width: 127,
    borderRadius: 50,
  },
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
})