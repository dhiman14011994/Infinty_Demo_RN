//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_PINK_COLOR,
  },
  noDataVw: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.APP_COMMON_BG_COLOR
  },
  cellVw: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    marginBottom: 0,
    backgroundColor: color.APP_LIGHT_BG_COLOR,
  },
  titleVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateVw: {
    flexDirection: 'row',
  },
  planTbl: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
  },

  //Text Styles
  planTitleTxt: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    color: 'white',
  },
  noPlanTxt: {
    fontSize: 22,
    fontFamily: font.NUNITO_REGULAR,
    alignSelf: 'center',
    color: color.APP_LIGHT_COLOR,
  },
  dateTxt: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    color: color.APP_LIGHT_COLOR,
  },
});
