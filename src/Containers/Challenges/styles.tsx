//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
export const styles = ScaleSheet.create({

  barHeight: 12,
  barWidth: 120,
  swiperHeight: 200,
  totalMargin: 30,

  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  scrollVw: {
    flex: 1,
    // borderTopLeftRadius: 10,
    // borderTopEndRadius: 10,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },
  topVw: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
    backgroundColor: '#414141'

  },
  textVw: {
    fontSize: 18,
    fontFamily: font.NUNITO_SEMI_BOLD,
    marginLeft: 10,
  },
  lineVw: {
    height: 3,
    backgroundColor: color.DARK_RED,
    width: 45,
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 5,

  },
  emptyVw: {
    height: 3,
    backgroundColor: 'transparent',
    width: 45,
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  MyChallenge: {
    marginLeft: 10
  }
})