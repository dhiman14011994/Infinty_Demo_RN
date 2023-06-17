import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { styles } from './styles';
import color from '../../Constants/Colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import RedButton from '../RedButton';
//@ts-ignore
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';

interface Props {
  onCross: any,
}

export default class AddressPopup extends Component<Props, object> {

  state = {
    index: -1,
    address: '',
    city: '',
    country: '',
    zip: '',
    isAddress: false,
  }


  //Creating exercises here
  private renderTime = (data: any) => {
    let isCurrent = data.index == this.state.index;
    return (
      <TouchableOpacity style={[styles.addressVw, { backgroundColor: isCurrent ? '#fbdfe2' : 'white' }]} onPress={() => this.setState({ index: data.index })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.tempVw} />
          <View>
            <Text style={styles.addressCatTxt}>{'Home'}</Text>
            <Text style={styles.timeTxt}>{'711-2880 Nulla St. Mankato Mississippi'}</Text>
          </View>
        </View>
        <View style={{ height: 1, width: '100%', backgroundColor: color.LIGHTER_GREY, position: 'absolute', bottom: 0, alignSelf: 'center' }} />
      </TouchableOpacity>
    )
  }

  //Current location code
  private getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location: any) => {
        console.log(location);
        this.getAddress(location.latitude, location.longitude)
      })
      .catch((error: any) => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

  getAddress(lat: any, lon: any) {
    Geocoder.init("AIzaSyAYs5C1yyuhTqPrUftQLi15cOlUAOc16d4");

    Geocoder.from(lat, lon)
      .then((json: any) => {
        for (let i = 0; i < json.results[0].address_components.length; i++) {
          let data = json.results[0].address_components[i];
          if (data.types.some((type: any) => type === 'sublocality')) {
            this.setState({ address: this.state.address + (this.state.address == '' ? '' : ', ') + data.long_name })
          }
          else if (data.types.some((type: any) => type === 'administrative_area_level_1')) {
            this.setState({ city: data.long_name })
          }
          else if (data.types.some((type: any) => type === 'country')) {
            this.setState({ country: data.long_name })
          }
          else if (data.types.some((type: any) => type === 'postal_code')) {
            this.setState({ zip: data.long_name })
          }
        }
        this.setState({ isAddress: true })
      })
      .catch((error: any) => console.warn(error));
  }

  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <Image source={require('../../Assets/blurBg.png')} style={{ opacity: 0.8, position: 'absolute' }} />
        <SafeAreaView style={styles.dataVw}>
          {
            this.state.isAddress ?
              <View style={{ backgroundColor: 'white', paddingBottom: 15 }}>
                <Text style={styles.greyTitleTxt}>{'Add Address'}</Text>
                <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                <View style={styles.inputTxtVw}>
                  <TextInput style={styles.InputTxt} value={this.state.address} />
                  <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                </View>
                <View style={styles.inputTxtVw}>
                  <TextInput style={styles.InputTxt} value={this.state.country} />
                  <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={[styles.inputTxtVw, { flex: 1, }]}>
                    <TextInput style={styles.InputTxt} value={this.state.city} />
                    <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                  </View>
                  <View style={[styles.inputTxtVw, { flex: 1, }]}>
                    <TextInput style={styles.InputTxt} value={this.state.zip} />
                    <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                  </View>
                </View>
                <RedButton lowMargin={true} onPress={() => { }} title={'Confirm'} />
              </View>
              :
              <View style={{ backgroundColor: 'white', paddingBottom: 15 }}>
                <Text style={styles.greyTitleTxt}>{'Select an Address'}</Text>
                <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.getCurrentLocation()}>
                  <View style={{ height: 15, width: 15, marginLeft: 15, backgroundColor: 'red' }} />
                  <Text style={styles.redTitleTxt}>{'Current Location'}</Text>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ height: 15, width: 15, marginLeft: 15, backgroundColor: 'red' }} />
                  <Text style={styles.redTitleTxt}>{'Add Address'}</Text>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                <Text style={styles.blackTitleTxt}>{'Saved Addresses'}</Text>
                <FlatList
                  data={[1, 1, 1, 1, 1, 1]}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={this.renderTime}
                  style={styles.tblVw}
                />
                <View style={{ height: 1, backgroundColor: color.LIGHTER_GREY }} />
                <RedButton lowMargin={true} onPress={() => { }} title={'Confirm'} />
              </View>
          }
        </SafeAreaView>
      </View>
    )
  }
}