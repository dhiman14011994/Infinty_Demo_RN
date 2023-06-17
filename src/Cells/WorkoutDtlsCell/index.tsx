import React, { Component } from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any,
  onPress: any,
  onSelect: any,
  isSelected: boolean,
}

export default class WorkoutDtlsCell extends Component<Props, object> {

  arrowDown = require('../../Assets/arrow_down.png');
  arrowUp = require('../../Assets/arrow_up.png');

  renderCell = (data: any) => {
    return (
      <View style={styles.exerciseVw}>
        <RKImageLoder style={styles.exeImg} src={data.item.image} tempImg={Images.PLACEHOLDER} />
        <Text style={styles.exeTxt}>{'x' + data.item.repitition + ' ' + data.item.title}</Text>
      </View>
    )
  }

  render() {
    console.log('sasffdf', this.props.data)
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.props.onSelect()} style={styles.dataCntnr} activeOpacity={0.8}>
          <Text style={styles.workoutTxt}>{'Exercises'}</Text>
          {/* <Image style={styles.arrowImg} source={this.props.isSelected ? this.arrowUp : this.arrowDown } /> */}
        </TouchableOpacity>
        {/* {
          this.props.isSelected ? */}
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.data.item}
                style={styles.tbl}
                keyExtractor={(item: any, index: any) => index.toString()}
                renderItem={this.renderCell}
              />
              <View style={styles.marginVw} />
            </View>
            {/* : null
        } */}
      </View>
    )
  }
}