//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: 'white'
  },
  messageCntnrVw: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    paddingBottom: 40,
  },
  navBarVw: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  //Buttons Styles
  navBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },

  //Text Styles
  messageTxt: {
    fontSize: 20,
    fontFamily: font.NUNITO_REGULAR,
    color: 'white',
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },

  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  btnLeftImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
})