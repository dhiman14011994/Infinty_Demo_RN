//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  size: 80,

  mainVw: {
    height: '100%',
    backgroundColor: color.APP_HEADER_BG_COLOR,
  },
  plansCntnr: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  planVw: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    overflow: 'hidden',
  },
  planTitleVw: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loaderVw: {
    height: 80,
    width: 80,
  },
  paddingVw: {
    height: 20,
  },
  btnVw: {
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },

  //Button Styles

  //Text Styles
  planTitlext: {
    width: '65%',
    fontSize: 22,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 5,
    color: 'white'
  },
  selctedPlanTxt: {
    width: '55%',
    fontSize: 22,
    fontFamily: font.NUNITO_BOLD,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 5,
    color: 'white',
  },
  selectedAmtTxt: {
    width: '45%',
    fontSize: 22,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'right',
    paddingLeft: 5,
    paddingRight: 15,
    color: 'white',
  },
  amountTxt: {
    width: '35%',
    fontSize: 22,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'right',
    paddingLeft: 5,
    paddingRight: 15,
    color: 'white'
  },
  descTxt: {
    fontSize: 13,
    marginVertical: 15,
    paddingHorizontal: 15,
    color: color.APP_LIGHT_COLOR,
    fontFamily: font.NUNITO_REGULAR,
  },
  exploreTxt: {
    fontSize: 20,
    paddingHorizontal: 15,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
})