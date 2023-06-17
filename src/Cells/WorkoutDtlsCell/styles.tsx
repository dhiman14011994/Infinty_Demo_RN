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
    marginTop: 10,
    marginBottom: 5,
   },
  exerciseVw: {
    margin: 15,
    marginTop: 10,
    marginBottom: 5,
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
    height: 25,
    width: 5,
  },
  marginVw: {
    height: 10,
  },

  //Text Styles
  workoutTxt: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    marginLeft: 15,
  },
  exeTxt: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginLeft: 10,
  },

  //Image Styles
  exeImg: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    borderRadius: 8,
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
  arrowImg: {
    height: 15,
    width: 15,
    marginRight: 15,
    resizeMode: 'contain'
  },
})