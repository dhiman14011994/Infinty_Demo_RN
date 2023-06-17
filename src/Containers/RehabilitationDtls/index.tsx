import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity, BackHandler, Dimensions, Alert, FlatList } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import Images from '../../Utils/ImageGenerator';
import { NavigationScreenProp } from 'react-navigation';
import RKImageLoder from '../../Utils/RKImageLoder';
import WorkoutCell from '../../Cells/WorkoutCell';
import { Workouts } from '../../Modals/WorkoutModl';
import { connect } from 'react-redux';
import { getExerciseCatDtls } from '../../Redux/Actions/WorkoutsActions';
//@ts-ignore
import HTML from 'react-native-render-html';
//@ts-ignore
import Tags from "react-native-tags";

export interface Props {
    navigation: NavigationScreenProp<any, any>;
    token: string;
    getDetails: any;
    exercise: Workouts;
}

class RehabilitationDtls extends Component<Props, object> {

    static navigationOptions = () => {
        return {
            headerShown: false
        }
    }

    state = {
        imageData: [
            { image: Images.simlearWork },
            { image: Images.simlearWork1 }

        ],
        isPlay: true,
    }

    componentDidMount() {
        this.getDetails();
    }

    //Fetching story detail
    getDetails() {
        const params = {
            table: 'excercises',
            model: 'Excercise',
            id: this.props.navigation.state.params.id,
        };
        this.props.getDetails({
            params: params,
            token: this.props.token,
            isCat: true,
        });
    }

    private renderWorkouts = (data: any) => {
        console.log('<<<data>>>', data.item.image)
        return (
            <WorkoutCell isHome={true} data={data} onPress={() => this.props.navigation.navigate('WorkoutDetails', { id: data.item.id })} />
        )
    }

    render(): JSX.Element {
        let dtls: Workouts = this.props.exercise;
        return (
            <SafeAreaView style={styles.mainVw}>
                {
                    dtls == undefined ? null :
                        <View style={{ flex: 1 }}>
                            <NavigationHeader
                                title={'Neck Exercises'}
                                isMultiple={false}
                                leftBtnActn={() => this.props.navigation.goBack()}
                                btnImage={Images.BACK}
                            />
                            {/* <View style={{ justifyContent: 'center' }}>
                                <YouTube
                                    videoId="gey73xiS8F4" // The YouTube video ID
                                    play={!this.state.isPlay} // control playback of video with true/false
                                    loop // control whether the video should loop when ended
                                    apiKey="AIzaSyDhLHzZM6nm6a5-2t7i8POsFkq4_52V9uw"
                                    style={styles.youtubeVw}
                                    //@ts-ignore
                                    onChangeState={(e: any) => this.setState({ isPlay: e })}
                                />
                            </View> */}
                            <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false} >
                                <Text style={styles.titleTxt}>{dtls.title}</Text>
                                {/* <View style={styles.btnView}>
                                    <TouchableOpacity style={styles.btnstyle}>
                                        <Text style={styles.painText}>{'Neck pain'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnstyle}>
                                        <Text style={styles.painText}>{'Stretches'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnstyle}>
                                        <Text style={styles.painText}>{'No equipment'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Tags
                                    initialTags={dtls.tags}
                                    inputContainerStyle={{ height: 0 }}
                                    inputStyle={{ height: 0 }}
                                    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }: any) => (
                                        // <TouchableOpacity style={styles.tagVw} key={`${tag}-${index}`} onPress={onPress}>
                                        //   <Text style={styles.tagTxt}>{tag}</Text>
                                        // </TouchableOpacity>
                                        <View style={styles.tagVw}>
                                            <Text style={styles.tagTxt}>{tag}</Text>
                                        </View>
                                    )}
                                /> */}
                                <Text style={styles.titleText} >{'Description'}</Text>
                                <View style={styles.htmlCntnr}>
                                    <HTML
                                        ignoredStyles={['font-size', 'font-family', 'width']}
                                        baseFontStyle={styles.descTxt}
                                        html={dtls.instructions.replace('bolder', '700')}
                                    />
                                </View>
                                {/* <Text style={styles.detailTxt}>{'Simple stretches for neck pain. Remember to be very careful with neck stretching exercises, and make sure you have a proper diagnosis from your doctor. Rotation, side bending, flexion, and extension stretching will help loosen your neck muscles. Also stretching your levator scapulae and trapezius muscles will help with some tension headaches.'}</Text> */}
                                <View style={styles.similarVw}>
                                    <TouchableOpacity style={styles.titleCntnrVw} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Workout')}>
                                        <Text style={styles.titleTxt}>{'Similar Workouts'}</Text>
                                        <Image source={Images.RIGHT_ARROW} style={styles.arrowImg} />
                                    </TouchableOpacity>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        style={styles.topMenuTbl}
                                        data={this.state.imageData}
                                        keyExtractor={(item: any, index: any) => index.toString()}
                                        renderItem={this.renderWorkouts}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                }
            </SafeAreaView>
        )
    }
}


function mapStateToProps(state: any) {
    return {
        token: state.loginReducer.userInfo.loginData.token,
        exercise: state.loginReducer.workoutData.workoutCatDtls,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getDetails: (data: any) => dispatch(getExerciseCatDtls(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RehabilitationDtls); 