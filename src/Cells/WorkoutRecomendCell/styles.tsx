//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 60,
  marginRight: 15,

  mainVw: {
    height: 160,
    margin: 15,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  workoutTxtVw: {
    backgroundColor: color.APP_PINK_COLOR,
    top: 20,
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
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
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    margin: 10,
    marginTop: 0,
    marginLeft: 15,
  },
  workoutTxt: {
    fontSize: 10,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
  },

  //Image Styles
  logoImg: {
    height: 160,
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'absolute',
  },
  clockImg: { 
    height: 15, 
    width: 15, 
    marginRight: 5,
    resizeMode: 'contain' 
  },
})