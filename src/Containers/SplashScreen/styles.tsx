//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import font from '../../Resources/Fonts';
import color from '../../Constants/Colors';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: 'white'
  },
  bgVw: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 100,
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
  commonBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderRadius: 40,
    marginTop: 10,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  //Text Styles
  btnTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
  },


  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  logo: {
    height: '100%',
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})