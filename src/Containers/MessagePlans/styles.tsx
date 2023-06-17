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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_LIGHT_BG_COLOR,
    overflow: 'hidden',
  },
  planTitleVw: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_LIGHTER_BG_COLOR,
  },
  loaderVw: {
    height: 80,
    width: 80,
  },
  planBorderVw: {
    width: 90,
    height: 2,
    borderRadius: 2,
  },
  paddingVw: {
    height: 20,

  },

  //Button Styles
  exploreBtn: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.APP_PINK_COLOR,
  },
  viewPlanBtn: {
    height: 40,
    width: '100%',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Text Styles
  viewPlanTxt: {
    fontSize: 15,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textDecorationLine: 'underline'
  },
  planTitlext: {
    fontSize: 20,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
  descTxt: {
    width: '100%',
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 15,
    color: color.APP_LIGHT_TXT_COLOR,
    fontFamily: font.NUNITO_REGULAR,
  },
  amountDescTxt: {
    fontSize: 22,
    marginVertical: 15,
    paddingHorizontal: 15,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
  },
  amountTxt: {
    fontSize: 35,
    paddingHorizontal: 15,
    color: 'white',
    fontFamily: font.NUNITO_BOLD,
  },
  exploreTxt: {
    fontSize: 20,
    paddingHorizontal: 15,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'center',
  },
})