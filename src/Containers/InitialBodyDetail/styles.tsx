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
    backgroundColor: 'white'
  },
  navBarVw: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  mesurementTitleVw: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20, 
    marginTop: 50,
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
    margin: 20,
    marginBottom: 0,
    borderRadius: 40,
    paddingLeft: 10,
    padingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
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

  //TextInput Styles
  commonInput: {
    flex: 1,
    height: 40,
    fontFamily: font.NUNITO_SEMI_BOLD,
    fontSize: 14,
    padingRight: 10,
  },

  //Text Styles
  dateTxt: {
    fontFamily: font.NUNITO_SEMI_BOLD,
    fontSize: 14,
    padingRight: 10,
    color: 'black'
  },
  unitsTxt: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
  },
  unitsSmallTxt: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'black',
    marginRight: 10,
  },
  inputTitleTxt: {
    fontSize: 20,
    marginTop: 5,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
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
  btnLeftImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
})