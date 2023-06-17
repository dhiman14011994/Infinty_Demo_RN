//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  buttonWidth: 30,
  buttonHeight: 10,
  buttonRadius: 100,
  sliderWidth: 20,
  sliderHeight: 20,
  sliderRadius: 100,
  totalMargin: 40,
  margin: 20,
  marginTop: 30,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  mesurementTitleVw: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20, 
    marginTop: 20,
  },
  mesurementExtndVw: {
    marginTop: 30,
  },
  unitsVw: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  inputVw: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  //Button Style
  genderBtn: {
    height: 30,
    marginTop: 10,
    borderRadius: 40,
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //TextInput Styles
  commonInput: {
    flex: 1,
    height: 40,
    fontFamily: font.NUNITO_REGULAR,
    fontSize: 16,
    padingRight: 10,
    color: 'white'
  },

  //Text Styles
  genderTxt: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  dateTxt: {
    fontFamily: font.NUNITO_REGULAR,
    fontSize: 16,
    padingRight: 10,
  },
  navBtnTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    color: 'white'
  },
  unitsTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    color: 'white'
  },
  unitsSmallTxt: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: font.NUNITO_REGULAR,
    marginRight: 10,
    color: 'white'
  },
  inputTitleTxt: {
    fontSize: 18,
    marginTop: 5,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    color: 'white'
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