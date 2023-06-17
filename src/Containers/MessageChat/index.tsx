import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationScreenProp } from 'react-navigation';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
//@ts-ignore
import user from './Assets/user.jpeg'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from "../../Components/Header";
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';
import color from '../../Constants/Colors';
import { styles } from './styles';
import Sound from 'react-native-sound';
//@ts-ignore
import { AudioRecorder, AudioUtils } from 'react-native-audio';
//@ts-ignore
import WaveForm from 'react-native-audiowaveform';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class MessageChat extends Component {
  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  camera: any = React.createRef()

  state = {
    data: [],
    text: '',
    id: 0,
    audioFile: '',
    recording: false,
    isRecording: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    isPlay: false,
    currentTime: 0.0,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
    hasPermission: undefined,
    showSelectedImage: false,
    isCamera: false,
    takingPic: false,
    photoData: {}


  }


  componentDidMount() {
    this.checkPermission();

    AudioRecorder.requestAuthorization().then((isAuthorised: any) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data: any) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data: any) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
        }
      };
    });


  }


  // Permission functions

  async checkPermission() {
    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA])
          .then((result) => {
            if (result['android.permission.WRITE_EXTERNAL_STORAGE']
              && result['android.permission.RECORD_AUDIO']
              && result['android.permission.CAMERA'] === 'granted') {
              console.log('You can use the storage');
              console.log('You can use the RECORD_AUDIO');
              console.log('You can use the camera');

            }
            else {
              console.log('permission denied');
            }
          })
          .catch((error) => {
            console.error(JSON.stringify(error))
          })
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your microphone to record audio voice',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }


  }

  renderDate = (date: any) => {
    return <Text style={styles.time}>{date}</Text>;
  };

  sendText = () => {
    var date = moment()
      .utcOffset('+05:30')
      .format('hh:mm a');
    let data = {
      id: this.state.id,
      type: 'out',
      message: this.state.text,
      image: '',
      audio: '',
      date: date,
      user: user,
    };
    //@ts-ignore
    this.state.data.push(data);
    this.setState({ text: '', id: this.state.id + 1 });
  };

  // Audio functions


  prepareRecordingPath(audioPath: any) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }


  sendAudio = async () => {
    if (this.state.isRecording == false) {


      if (this.state.recording) {
        console.warn('Already recording!');
        return;
      }

      if (!this.state.hasPermission) {
        console.warn('Can\'t record, no permission granted!');
        return;
      }

      if (this.state.stoppedRecording) {
        this.prepareRecordingPath(this.state.audioPath);
      }

      this.setState({ recording: true, });

      try {
        const filePath = await AudioRecorder.startRecording();
        Toast.show('Recording Start', Toast.SHORT)
        this.setState({ isRecording: !this.state.isRecording });
      } catch (error) {
        console.error(error);
      }

    } else {

      this.setState({ stoppedRecording: true, recording: false, });

      try {

        const filePath = await AudioRecorder.stopRecording();

        if (Platform.OS == 'android') {
          //@ts-ignore
          this.finishRecording(true, filePath);
        }
        this.setState({
          isRecording: !this.state.isRecording,
        });

        return filePath;
      } catch (error) {
        console.error(error);
        this.setState({
          isRecording: !this.state.isRecording,
        });
      }



    }

  };

  finishRecording = async (didSucceed: boolean, filePath: any, fileSize: any) => {
    try {


      Toast.show('Recording Stop and send', Toast.SHORT)
      var date = moment()
        .utcOffset('+05:30')
        .format('hh:mm a');
      const audioData = {
        id: this.state.id,
        type: 'out',
        message: '',
        image: '',
        audio: filePath,
        date: date,
        user: user,

      };
      //@ts-ignore
      this.state.data.push(audioData);
      this.setState({ finished: didSucceed, id: this.state.id + 1 });
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }
    catch (error) {
      console.error(JSON.stringify(error))
    }
  }



  recordSound = async (item: any) => {

    if (this.state.isPlay) {
      this.setState({ isPlay: false })
      await this.stop();
    }
    else {

      this.setState({ isPlay: true })


      setTimeout(() => {
        var sound = new Sound(item, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
          }
        });

        setTimeout(() => {

          sound.play((success) => {
            if (success) {
              this.setState({ isPlay: false })
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 100);
      }, 100);
    }
  };
  stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, });
  }


  // Image functions

  sendImage = async () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    }).then(images => {
      console.log(JSON.stringify(images));
      var date = moment()
        .utcOffset('+05:30')
        .format('hh:mm a');
      const data = {
        id: this.state.id,
        type: 'in',
        message: '',
        image: images.map((i) => {
          console.log('received image', i);
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
          };
        }),
        audio: '',
        date: date,
        user: user,
      };
      //@ts-ignore
      this.state.data.push(data);
      this.setState({ text: '', id: this.state.id + 1 });
    });

  };


  renderImage(data: any) {
    return (

      <Image
        style={[data.itemStyle, { width: 100, height: 100, resizeMode: 'cover', margin: 5 }]}
        source={data.i}
      />

    );
  }

  renderAsset(data: any) {

    return this.renderImage(data);
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {

      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({ takingPic: true });

      try {
        const data = await this.camera.takePictureAsync(options);

        var date = moment()
          .utcOffset('+05:30')
          .format('hh:mm a');

        const imageData = [];
        imageData.push({
          uri: data.uri,
          width: data.width,
          height: data.height,
          mime: 'image/jpeg',
        })



        const photoData: any = {
          id: this.state.id,
          type: 'in',
          message: '',
          image: imageData.map((i) => {
            console.log('received image', i);
            return {
              uri: i.uri,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
          audio: '',
          date: date,
          user: user,
        };
        //@ts-ignore
        this.state.data.push(photoData);
        this.setState({ text: '', id: this.state.id + 1, isCamera: false });

      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        this.setState({ takingPic: false });
      }
    }
  };
  renderProfile = (image: any) => {
    return <Image style={styles.profileImage} source={image} />
  }
  backPress = () => {
    //@ts-ignore
    this.props.navigation.goBack()
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        {this.state.isCamera == false ? <View style={styles.mainVw}>
          <NavigationHeader
            title={'Messages'}
            isMultiple={false}
            leftBtnActn={() => this.backPress()}
            btnImage={Images.LEFT_ARROW}
          />

          <View style={styles.scrollVw}>
            <FlatList
              style={styles.list}
              data={this.state.data}
              scrollEnabled={true}
              keyExtractor={(item: any) => {
                return item.id;
              }}
              onEndReachedThreshold={0.1}
              renderItem={(message: any) => {
                console.log(message);
                const item = message.item;
                let inMessage = item.type === 'in';
                let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                return (
                  <View style={[styles.item, { alignSelf: inMessage ? 'flex-start' : 'flex-end' }]}>
                    {/* {!inMessage && this.renderDate(item.date)} */}
                    {inMessage && this.renderProfile(item.user)}
                    <View style={[styles.balloon]}>
                      {item.message !== '' ? (
                        <View>
                          <View style={itemStyle}>
                            <Text style={{
                              color: 'white',
                              fontSize: 18
                            }}>{item.message}</Text>
                          </View>
                          {this.renderDate(item.date)}
                        </View>
                      ) : item.image !== '' ?
                          <View>
                            {item.image.map((i: any) => (

                              <View key={i.uri}>{this.renderAsset({ i, itemStyle })

                              }</View>
                            ))}

                            {inMessage && this.renderDate(item.date)}
                          </View>


                          : (<View>
                            <View style={[itemStyle, { flexDirection: "row", alignItems: 'center' }]}>

                              <WaveForm
                                source={{ uri: item.audio }}
                                waveFormStyle={styles.waveForm}
                                style={styles.waveStyle}
                                autoPlay={this.state.isPlay == true ? true : false}
                              >
                              </WaveForm>
                              <TouchableOpacity
                                style={styles.btnplay}
                                onPress={() => {
                                  this.recordSound(item.audio)
                                }}>

                                <Icon name={this.state.isPlay == false ? "play" : "stop"} size={23} color={color.LIGHT_WHITE} />

                              </TouchableOpacity>

                              <Text>{ }</Text>
                            </View>
                            {this.renderDate(item.date)}
                          </View>
                          )}
                    </View>
                    {/* {inMessage && this.renderDate(item.date)} */}
                  </View>
                );
              }}
            />
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.btnAdds}
                onPress={() =>
                  this.setState({ showSelectedImage: true })
                  // this.sendImage()

                }>

                <Icon name={"plus"} size={23} color={color.LIGHT_WHITE} />
              </TouchableOpacity>
              <View style={styles.inputContainer}>

                <TextInput
                  style={styles.inputs}
                  placeholder="Type your message here"
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                  onSubmitEditing={this.sendText}
                  placeholderTextColor={color.LIGHT_WHITE}
                />
                <TouchableOpacity
                  style={[styles.btnAdd]}

                  onPressIn={() => this.sendAudio()}
                  onPressOut={() => this.sendAudio()}
                >

                  <Icon name={"microphone"} size={25} color={color.LIGHT_WHITE} />
                </TouchableOpacity>
              </View>

            </View>
            <Modal
              animated={true}
              transparent={true}

              visible={this.state.showSelectedImage}>
              <View style={styles.reportModal}>
                <View style={styles.reportView} >
                  <Text style={styles.reportHeaderText}>{localize.SelectImage}</Text>
                  <Text style={styles.photo} onPress={() => this.setState({ showSelectedImage: false, isCamera: true })}>{localize.TakePhoto}</Text>
                  <Text style={styles.choosePhoto} onPress={() => { this.setState({ showSelectedImage: false }, () => this.sendImage()) }}>{localize.ChooseLibrary}</Text>
                  <Text style={styles.cencel} onPress={() => { this.setState({ showSelectedImage: false }) }}>{localize.Cancel}</Text>



                </View>

              </View>

            </Modal>
          </View>
        </View> : (
            <View style={{ flex: 1 }}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                captureAudio={false}
                style={{ flex: 1, justifyContent: 'space-between' }}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}>
                <TouchableOpacity activeOpacity={0.5} style={styles.btnAlignment} onPress={this.takePicture}>
                  <Icon name="camera" size={50} color="#fff"></Icon>
                </TouchableOpacity>


              </RNCamera>
            </View>
          )}
      </SafeAreaView>
    );
  }
}

