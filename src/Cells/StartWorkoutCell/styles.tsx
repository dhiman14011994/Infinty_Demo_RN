//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,

  mainVw: {
    flex: 1,
    margin: 15,
    marginBottom: 5,
  },
  dataCntnr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  exerciseVw: {
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtProgressCntnr: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressVw1: {
    height: 10,
    width: 5,
  },
  progressVw2: {
    flex: 1,
    width: 5,
  },
  marginVw: {
    height: 20,
  },
  tbl: {
  },
  titleVw: {
    flexDirection: 'row',
    marginRight: 15,
  },

  //Text Styles
  workoutTxt: {
    fontSize: 21,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    marginLeft: 15,
  },
  exeTxt: {
    fontSize: 16,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 5,
  },
  endTimeTxt: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    color: color.DARK_RED
  },

  //Image Styles
  exeImg: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  imgVw: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#C9C9D1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tickImg: {
    height: 10,
    width: 10,
    resizeMode: 'contain'
  },
  redTickImg: {
    height: 25,
    width: 25,
    marginLeft: 10,
    resizeMode: 'contain'
  },
})