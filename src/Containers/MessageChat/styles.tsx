//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Resources/Fonts';
import { Dimensions } from 'react-native';
const windowWidth = ((Dimensions.get('window').width) * 80);
export const styles = ScaleSheet.create({
  container: {
    flex: 1,
  },
  scrollVw: {
    flex: 1,
    backgroundColor: color.APP_COMMON_BG_COLOR,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    paddingBottom: 50
  },
  mainVw: {
    flex: 1,
    backgroundColor: color.APP_HEADER_BG_COLOR
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: color.APP_COMMON_BG_COLOR,
    position: 'absolute',
    bottom: 20
  },
  btnSend: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',

  },
  btnAdds: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderColor: color.LIGHT_WHITE,
    borderWidth: 3,
    //backgroundColor:color.LIGHT_WHITE

  },
  btnplay: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
    //borderColor:color.HEADER_TITLE_COLOR,

    backgroundColor: color.APP_HEADER_BG_COLOR

  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',

  },
  iconSend1: {
    width: 40,
    height: 40,
    alignSelf: 'center',

  },
  inputContainer: {

    backgroundColor: '#414141',
    borderRadius: 30,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
    marginRight: 10,

  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    color: color.LIGHT_WHITE,
    fontSize: 15,
    flex: 1,
  },
  balloon: {

  },
  itemIn: {
    alignSelf: 'flex-start',
    backgroundColor: '#BA1F2A',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,

  },
  itemOut: {
    //alignSelf: 'flex-end',

    backgroundColor: '#414141',
    //  justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'




  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#808080',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5

  },
  timeIn: {
    // alignSelf: 'flex_start',
    fontSize: 12,
    color: '#808080',

  },
  item: {
    marginVertical: 14,
    // //width:300,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    // // justifyContent: 'center',
    // borderRadius: 10,
    // backgroundColor:'yellow'



  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    // alignSelf: 'flex-end',

  },
  reportModal: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportView: {
    width: '80%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 20,

  },
  reportHeaderText: {
    color: "#000000",
    fontSize: 20,
    marginTop: '4%',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  choosePhoto: {
    color: "#000000",
    fontSize: 15,
    marginTop: '8%',
    marginLeft: '8%',

  },
  photo: {
    color: "#000000",
    fontSize: 15,
    marginTop: '10%',
    marginLeft: '8%'
  },
  cencel: {
    color: "#000000",
    fontSize: 15,
    position: 'absolute',
    bottom: '10%',
    right: '10%',
  },
  reportViewAudio: {
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0
  },
  waveForm: {
    waveColor: 'white',
    scrubColor: 'blue'
  },
  waveStyle: {
    height: 40,
    width: 200,
    margin: 5,
    backgroundColor: "transparent"
  },
  btnAlignment:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  }
})