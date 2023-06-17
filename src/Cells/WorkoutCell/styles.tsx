//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 30,
  totalMarginMax: 100,
  mainVw: {
    flex: 1,
    margin: 15,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'flex-start',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    overflow: 'hidden'
  },
  weekTxtVw: {
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: '#F2DA61',
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
    top: 90,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  titleCntnr: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  minsVw: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  opqVw: {
    height: 160,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: 'black',
  },

  //Text Styles
  titleTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
  },
  level: {
    fontSize: 12,
    color: '#ffffff80',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginLeft: 10,
  },
  weekTxt: {
    fontSize: 11,
    color: 'black',
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'center',
  },

  //Image Styles
  logoImg: {
    height: 120,
    // resizeMode: 'cover',
    // borderTopEndRadius: 8,
    // borderBottomEndRadius: 8,
    // position: 'absolute',
  },
  clockImg: {
    height: 15,
    width: 15,
    marginRight: 5,
    resizeMode: 'contain'
  },
})