//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalGap: 178,

  mainVw: {
    margin: 15,
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  dataCntnr: {
    paddingLeft: 5,
  },
  contentVw: {
    flex: 1,
    flexDirection: 'row',
  },
  addBtnVw: {
    width: 78,
    alignItems: 'center',
    flexDirection: 'row',
  },

  //Button Styles
  addBtn: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Text Styles
  qtyCalTxt: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },
  titleTxt: {
    fontSize: 17,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  kcalTxt: {
    fontSize: 17,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  amountTxt: {
    fontSize: 14,
    marginTop: 5,
  },
  qtyTxt: {
    fontSize: 14,
    width: 18,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },

  //Images Styles
  foodImg: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
})