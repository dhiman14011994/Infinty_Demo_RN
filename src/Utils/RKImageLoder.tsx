import React, { Component } from "react";
import { View, Image } from "react-native";
import FastImage from 'react-native-fast-image'

interface Prop {
  src: any,
  tempImg: any,
  style: any
}

export default class RKImageLoder extends Component<Prop, object> {

  state = {
    isLoaded: true,
  }

  render() {
    return (
      <View style={this.props.style}>
        {
          this.props.src == '' ?
            <FastImage
              style={[this.props.style, { position: 'absolute', width: '100%' }]}
              source={this.props.tempImg}
            /> :
            <View>
              {
                this.state.isLoaded ?
                  <FastImage
                    style={[this.props.style, { position: 'absolute', width: '100%' }]}
                    source={this.props.tempImg}
                  />
                  : null
              }
              <FastImage
                style={[this.props.style, { width: '100%' }]}
                source={{ uri: this.props.src }}
                onLoadEnd={() => this.setState({ isLoaded: false })}
                onError={() => this.setState({ isLoaded: false })}
              />
            </View>
        }
      </View>
    )
  }
} 