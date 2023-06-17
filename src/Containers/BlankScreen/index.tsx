import React, { Component } from 'react';
import { View, BackHandler, SafeAreaView } from 'react-native';

export interface Props {
}

export default class BlankScreen extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}} />
    )
  }
}