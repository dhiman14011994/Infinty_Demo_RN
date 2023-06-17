//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR
  },
  cntnrVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  commonVw: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marginVw: {
    height: 20,
  },
  sepVw: {
    height: 1,
    margin: 15,
    backgroundColor: color.APP_GREY
  },

  //Text styles
  planTxt: {
    flex: 1,
    width: '70%',
    fontSize: 16,
    marginRight: 10,
    fontFamily: font.NUNITO_SEMI_BOLD,
    color: 'white'
  },
  amountTxt: {
    flex: 1,
    width: '30%',
    fontSize: 16,
    color: color.APP_PINK_COLOR,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'right',
  },
  commonLeftTxt: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    color: color.LIGHT_WHITE
  },
  commonRightTxt: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'right',
    color: 'white'
  },
})