//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({

  totalMargin: 30,
  totalBtnMargin: 90,
  left: 20,


  mainVw: {
    margin: 15,
    marginBottom: 20,
    // padding: 10,
    paddingTop: 0,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  newTxtVw: {
    flex: 1,
    top: 10,
    position: 'absolute',
    borderRadius: 60,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    backgroundColor: color.DARK_RED,
  },
  dateTitleCntnr: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
  },
  dateCntnr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthVw: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 45,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    backgroundColor: color.DARK_RED,
  },
  dateVw: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 45,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: color.LIGHT_WHITE,
  },
  titleCntnr: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  imageVw: {
    height: 30,
    width: 80,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countVw: {
    height: 30, 
    width: 30,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    borderRadius: 40,
  },
  opaqueVw: {
    height: 28, 
    width: 28, 
    borderRadius: 40,
    backgroundColor: 'black', 
    position: 'absolute'
  },
  imageJoinCntnr: {
    margin: 15, 
    marginTop: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },

  //Button Styles
  joinBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.GREY,
    height: 30,
    width: 80,
    borderRadius: 8,
  },
  moreBtn: {
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.DARK_RED,

  },

  //Text Styles
  menuTxt: {
    fontSize: 14,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'center',
    color: color.DARK_RED,
  },
  titleTxt: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontFamily: font.FONT_MULI_MEDIUM,
    textAlign: 'left',
  },
  countTxt: {
    fontSize: 12,
    color: 'white',
    fontFamily: font.FONT_MULI_MEDIUM,
    textAlign: 'center',
  },
  nameTxt: {
    flex: 1,
    fontSize: 13,
    color: color.DARK_RED,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'left',
  },
  timeTxt: {
    width: 60,
    fontSize: 13,
    color: color.DARK_RED,
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'right',
  },
  byTxt: {
    color: color.GREY,
  },
  descTxt: {
    flex: 1,
    width: '100%',
    fontSize: 14,
    color: 'black',
    fontFamily: font.FONT_MULI_REGULAR,
    textAlign: 'left',
  },
  newTxt: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    fontFamily: font.FONT_MULI_SEMI_BOLD,
    textAlign: 'center',
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },
  dateTxt: {
    fontSize: 13,
    fontFamily: font.FONT_MULI_MEDIUM,
    textAlign: 'center',
  },
  monthTxt: {
    fontSize: 13,
    color: 'white',
    fontFamily: font.FONT_MULI_MEDIUM,
    textAlign: 'center',
  },

  //Image Styles
  logoImg: {
    height: 130,
    width: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute'
  },
})