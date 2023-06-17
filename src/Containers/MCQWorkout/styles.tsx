//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
  },
  navBarVw: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mcqCntnrVw: {
    flex: 1,
    width: '100%',
    marginBottom: 80,
  },

  //Buttons Styles
  optBtn: {
    minHeight: 40,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white'
  },
  navBtn: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },

  //Text Styles
  optTxt: {
    fontSize: 15,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
    color: 'white',
  },
  titleTxt: {
    fontSize: 24,
    margin: 30,
    marginTop: 0,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
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
  btnLeftImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
})