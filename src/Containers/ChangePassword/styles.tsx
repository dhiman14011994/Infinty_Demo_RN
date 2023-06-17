//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  pwdInputVw: {
    height: 40,
    margin: 15,
    marginBottom: 0,
    borderRadius: 8,
    paddingLeft: 10,
    padingRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  paddingVw: {
    height: 50,
  },
  contentVw: { 
    flex: 1, 
    paddingTop: 20,
    backgroundColor: color.APP_COMMON_BG_COLOR 
  },
  
  //Text Styles
  validationTxt: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  
  //Images Styles
  bgImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  tickImg: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    marginRight: 10,
  },
})