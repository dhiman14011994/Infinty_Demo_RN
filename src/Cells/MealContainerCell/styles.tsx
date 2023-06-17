//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalPadding: 100,

  mainVw: {
    flex: 1,
    minHeight: 60,
    margin: 10,
    padding: 10,
    marginHorizontal: 0,
    borderRadius: 8,
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  headerVw: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleVw: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  qtyCntnr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '45%',
    marginBottom: 5,
  },
  tblVw: {
    marginTop: 10,
  },
  contentVw: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    marginBottom: 10,
  },

  //Buttons Styles
  optnsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },

  //Text Styles
  contentTitleTxt: {
    fontSize: 15,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  contentDataTxt: {
    fontSize: 15,
    color: color.APP_LIGHT_COLOR,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  titleTxt: {
    fontSize: 15,
    color: color.APP_DARK_GREY,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  titleTxt1: {
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  mealTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  qtyTxt: {
    fontSize: 16,
    marginLeft: 10,
    color: color.APP_LIGHT_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  kclTxt: {
    textAlign: 'right',
  },

  //Image Styles
  logoImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  optnsImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    borderRadius: 8,
  },
})