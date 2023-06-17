//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';

export const styles = ScaleSheet.create({
  totalMargin: 30,
  totalMarginMax: 100,
  mainVw: {
    flex: 1,
    margin: 15,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'flex-start',
    //backgroundColor: color.APP_LIGHT_BG_COLOR,
    overflow: 'hidden'
  },
  weekTxtVw: {
    borderTopStartRadius: 16,
    borderBottomStartRadius: 16,
    backgroundColor: '#E12A37',
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
    top: 40,
    right:0,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width:80,

  },
  titleCntnr: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor:'#000000',
    position: 'absolute',
    bottom: -19,
  },
  buttonCntnr:{
      width:150,
      height:20,
      backgroundColor:'#E12A37',
      alignItems:'center',
      justifyContent:'center',
      marginLeft:12,
      marginTop:10,
      marginBottom:10,
      borderRadius:10
  },
  minsVw: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  opqVw: {
    height: 160,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: 'black',
  },

  //Text Styles
  titleTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: font.NUNITO_SEMI_BOLD,
    textAlign: 'left',
    marginLeft: 8,
    marginRight: 8,
  },
  level: {
    fontSize: 10,
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'left',
    marginLeft: 8,
  },
  weekTxt: {
    fontSize: 12,
    color: color.LIGHT_WHITE,
    fontFamily: font.NUNITO_REGULAR,
    textAlign: 'center',
  },

  //Image Styles
  logoImg: {
    height: 120,
    resizeMode: 'cover',
    // borderTopEndRadius: 8,
    // borderBottomEndRadius: 8,
    // position: 'absolute',
  },
  clockImg: {
    height: 15,
    width: 15,
    marginRight: 5,
    resizeMode: 'contain'
  },
  topText:{
      color:color.LIGHT_WHITE,
      marginBottom:10
  }
})