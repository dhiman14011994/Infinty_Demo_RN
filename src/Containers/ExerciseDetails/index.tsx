import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity, BackHandler, Dimensions, Alert, FlatList, Modal } from 'react-native';
import NavigationHeader from '../../Components/Header';
import { styles } from './styles';
import Images from '../../Utils/ImageGenerator';
import { NavigationScreenProp } from 'react-navigation';
import RKImageLoder from '../../Utils/RKImageLoder';
import WorkoutCell from '../../Cells/WorkoutCell';
import color from '../../Constants/Colors';
import { Workouts } from '../../Modals/WorkoutModl';
import { connect } from 'react-redux';
import { getExerciseCatDtls } from '../../Redux/Actions/WorkoutsActions';
//@ts-ignore
import HTML from 'react-native-render-html';
//@ts-ignore
import Tags from "react-native-tags";
import VideoPlayer from '../../Components/VideoPlayer';

export interface Props {
    navigation: NavigationScreenProp<any, any>;
    token: string;
    getDetails: any;
    exercise: Workouts;
}

class ExerciseDetails extends Component<Props, object> {

    static navigationOptions = () => {
        return {
            headerShown: false
        }
    }

    state = {
        selectedIndex: 0,
        showPlayer: false,
        width: Dimensions.get('screen').width,
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

    playVideo() {
        if (this.props.exercise !== undefined && this.props.exercise.video !== '') {
            this.setState({ showPlayer: true });
        }
    }

    render(): JSX.Element {
        let dtls: Workouts = this.props.exercise;
        let width = (this.state.width - styles.totalPadding) / 3;
        let instructions = '';
        let about = '';
        let precautions = '';

        if (dtls !== undefined) {
            instructions = dtls.instructions.split('bolder').join('700');
            about = dtls.about.split('bolder').join('700');
            precautions = dtls.precautions.split('bolder').join('700');
        }

        return (
            <SafeAreaView style={styles.mainVw}>
                <NavigationHeader
                    title={'Neck Exercises'}
                    isMultiple={false}
                    leftBtnActn={() => this.props.navigation.goBack()}
                    btnImage={Images.BACK}
                />
                {dtls === undefined ? null : (
                    <Modal animated={true} visible={this.state.showPlayer}>
                        <VideoPlayer
                            videoId={dtls.video}
                            onCross={() => this.setState({ showPlayer: false })}
                        />
                    </Modal>
                )}
                {dtls === undefined ? null : (
                    <RKImageLoder
                        style={styles.bannerImg}
                        src={dtls.image}
                        tempImg={require('../../Assets/dummy.png')}
                    />
                )}
                <View style={[styles.opqVw, { opacity: 0.2 }]} />
                {dtls === undefined || dtls.video === '' ? null : (
                    <View style={styles.playimgVw}>
                        <Image
                            source={require('../../Assets/play.png')}
                            style={styles.playImg}
                        />
                    </View>
                )}
                {
                    dtls == undefined ? null :
                        <View style={{ flex: 1 }}>
                            <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false} >
                                <TouchableOpacity
                                    style={[styles.playBtn, { position: 'relative' }]}
                                    onPress={() => this.playVideo()} />
                                <View style={styles.contentVw}>
                                    <Text style={styles.titleTxt}>{dtls.title}</Text>
                                    <View style={styles.btnView}>
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
                                    />
                                    <View style={styles.tabCntnr}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ selectedIndex: 0 })}
                                            activeOpacity={0.8}
                                            style={[
                                                this.state.selectedIndex === 0
                                                    ? styles.selectedBtn
                                                    : styles.unSelectBtn,
                                                { width: width },
                                            ]}>
                                            <Text style={styles.tabTxt}>{'Instructions'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ selectedIndex: 1 })}
                                            activeOpacity={0.8}
                                            style={[
                                                this.state.selectedIndex === 1
                                                    ? styles.selectedBtn
                                                    : styles.unSelectBtn,
                                                { width: width },
                                            ]}>
                                            <Text style={styles.tabTxt}>{'About'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ selectedIndex: 2 })}
                                            activeOpacity={0.8}
                                            style={[
                                                this.state.selectedIndex === 2
                                                    ? styles.selectedBtn
                                                    : styles.unSelectBtn,
                                                { width: width },
                                            ]}>
                                            <Text style={styles.tabTxt}>{'Precautions'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.htmlCntnr}>
                                        {this.state.selectedIndex === 0 ? (
                                            <HTML
                                                ignoredStyles={['font-size', 'font-family', 'width']}
                                                baseFontStyle={styles.descTxt}
                                                html={instructions.replace('bolder', '700')}
                                            />
                                        ) : this.state.selectedIndex === 1 ? (
                                            <HTML
                                                ignoredStyles={['font-size', 'font-family', 'width']}
                                                baseFontStyle={styles.descTxt}
                                                html={about.replace('bolder', '700')}
                                            />
                                        ) : this.state.selectedIndex === 2 ? (
                                            <HTML
                                                ignoredStyles={['font-size', 'font-family', 'width']}
                                                baseFontStyle={styles.descTxt}
                                                html={precautions.replace('bolder', '700')}
                                            />
                                        ) : null}
                                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDetails); 