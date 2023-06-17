//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalGap: 105,

  mainVw: {
    padding: 15,
    flexDirection: 'row',
  },
  dataCntnr: {
    marginLeft: 5,
  },
  contentVw: {
    flex: 1,
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
  titleTxt: {
    flex: 1,
    fontSize: 17,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
  },
  dateTxt: {
    flex: 1,
    fontSize: 14,
    color: color.APP_LIGHT_COLOR,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
  },
  timeTxt: {
    flex: 1,
    fontSize: 14,
    color: color.APP_LIGHT_COLOR,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'right',
  },

  //Images Styles
  foodImg: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
})