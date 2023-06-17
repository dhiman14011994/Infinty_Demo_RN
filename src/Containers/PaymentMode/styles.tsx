//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,
  marginLeft: 10,
  marginRight: 10,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  cardVw: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 5,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8
  },
  blankVw: {
    height: 20,
    width: 10,
    resizeMode: 'contain',
  },

  //Button Styles
  paymentBtn: { 
    height: 40, 
    marginTop: 20, 
    borderRadius: 8,  
    marginHorizontal: 15, 
    paddingHorizontal: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f8f8ff',  
  },

  //Text Styles
  paymentTxt: {
    fontSize: 16,
    color: color.APP_GREY,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  cardTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  noCardTxt: {
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },

  //Image Styles
  cardImg: {
    height: 20,
    width: 35,
    resizeMode: 'contain',
  },
  dotImg: {
    height: 20,
    width: 10,
    resizeMode: 'contain',
  },
  paymentImg: {
    height: 20, 
    width: 20, 
    marginRight: 10,
    resizeMode: 'contain' 
  },
})