import React, { Component } from 'react';
import { View, Image } from 'react-native';
//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import { MaterialIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';

interface Props {
  isLoaderVisible: boolean,
}

class Loader extends Component<Props, object> {

  state = {
    showLoader: false,
  }

  componentWillReceiveProps(props: any) {
    this.setState({showLoader: props.isLoaderVisible});    
  }

  render() {

    let showLoader = this.state.showLoader;
    return (
      <View style={{ height: this.state.showLoader ? '100%' : 0, width: this.state.showLoader ? '100%' : 0, justifyContent: "center", alignItems: "center", backgroundColor: 'transparent', position: 'absolute' }}>
        {
          showLoader ?
            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
              <View style={{ backgroundColor: 'transparent', position: 'absolute' }}>
                <MaterialIndicator size={styles.size} color='red' />
              </View>
            </View>
            : null
        }
      </View >
    )
  }
}

export const styles = ScaleSheet.create({
  size: 40,
  spinner: {
    height: 80,
    width: 80
  },
})

function mapStateToProps(state: any) {
  return {
    isLoaderVisible: state.loginReducer.userInfo.isLoaderVisible,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);