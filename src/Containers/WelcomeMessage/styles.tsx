//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import font from '../../Resources/Fonts';
import color from '../../Constants/Colors';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: 'white'
  },
  messageCntnrVw: {
    justifyContent: 'flex-end', 
    height: '100%', 
    width: '100%',
  },

  //Buttons Styles
  leftBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },

  //Text Styles
  messageTxt: {
    fontSize: 14,
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
  },
  welcomeTxt: {
    fontSize: 35,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: font.NUNITO_BOLD,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  

  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
})