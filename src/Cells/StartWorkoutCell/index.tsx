/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import RKImageLoder from '../../Utils/RKImageLoder';
import RedButton from '../../Components/RedButton';
import color from '../../Constants/Colors';
import { CategoryData, Excercis } from '../../Modals/WorkoutModl';
import image from '../../Constants/Images';
import { secondsToMinute } from '../../Utils/TimeFunction';
import Images from '../../Utils/ImageGenerator';

interface Props {
  data: any;
  onPress: any;
  showBtn: boolean;
}

export default class StartWorkoutCell extends Component<Props, object> {
  state = {
    expended: true,
  };

  componentDidMount() {
    this.checkIfCompleted(this.props.data.item);
  }

  renderCell = (data: any) => {
    let item: Excercis = data.item;
    var time = secondsToMinute(item.end_time);
    return (
      <View style={styles.exerciseVw}>
        <RKImageLoder
          style={styles.exeImg}
          src={item.image}
          tempImg={image.EXERCISE_PLACE_HOLDER}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            style={styles.exeTxt}>{`x ${item.repitition} ${item.title}`}</Text>
          {time === '0.0' ? null : (
            <Text style={styles.endTimeTxt}>{`${time}`}</Text>
          )}
        </View>
        <View style={styles.txtProgressCntnr}>
          <View
            style={[
              styles.imgVw,
              {
                backgroundColor:
                  item.completed === 1 ? color.DARK_RED : '#C9C9D1',
              },
            ]}>
            <Image
              style={styles.tickImg}
              source={Images.WHITE_TICK}
            />
          </View>
          <View
            style={[
              styles.progressVw2,
              {
                backgroundColor:
                  item.completed === 1 ? color.DARK_RED : '#C9C9D1',
              },
            ]}
          />
        </View>
      </View>
    );
  };

  checkIfAllCompleted(exercise: Excercis[]) {
    for (let index = 0; index < exercise.length; index++) {
      const element = exercise[index];
      if (element.completed === 0) {
        return false;
      }
    }
    return true;
  }

  checkIfCompleted(data: any) {
    let exercise = data.excercises;
    let flag = false;
    for (let index = 0; index < exercise.length; index++) {
      const element = exercise[index];
      if (element.completed === 0) {
        flag = true;
      }
    }
    this.setState({ expended: flag });
  }

  totalTime(exercise: Excercis[]) {
    let time = 0;
    for (let index = 0; index < exercise.length; index++) {
      const element: Excercis = exercise[index];
      time = time + element.end_time;
    }

    return time;
  }

  render() {
    let data: CategoryData = this.props.data.item;
    var time = secondsToMinute(this.totalTime(data.excercises));
    return (
      <View>
        <TouchableOpacity
          style={styles.dataCntnr}
          activeOpacity={1}
          onPress={() =>
            this.setState({
              expended: this.checkIfAllCompleted(data.excercises)
                ? !this.state.expended
                : true,
            })
          }>
          <Text style={styles.workoutTxt}>{data.category_title}</Text>

          <View style={styles.titleVw}>
            <Text style={styles.endTimeTxt}>{`${time}`}</Text>
            {this.checkIfAllCompleted(data.excercises) ? (
              <Image
                style={styles.redTickImg}
                source={Images.RED_TICK}
              />
            ) : null}
          </View>

        </TouchableOpacity>
        {!this.state.expended ? null : (
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.excercises}
              style={styles.tbl}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={this.renderCell}
            />
            {this.checkIfAllCompleted(data.excercises) ||
              this.props.showBtn ? null : (
                <RedButton
                  lowMargin={true}
                  title={'Start Session'}
                  isDisable={data.excercises.length === 0 ? true : false}
                  onPress={() =>
                    data.excercises.length === 0 ? {} : this.props.onPress()
                  }
                />
              )}
            <View style={styles.marginVw} />
          </View>
        )}
      </View>
    );
  }
}
