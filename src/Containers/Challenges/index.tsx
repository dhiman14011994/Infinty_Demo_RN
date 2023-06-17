import React, { Component } from 'react';
import { Image, FlatList, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, BackHandler, ImageStore, Alert } from 'react-native';
import NavigationHeader from "../../Components/Header";
import { styles } from './styles';
import Images from '../../Utils/ImageGenerator';
import { localize } from '../../Resources/Strings';
import color from '../../Constants/Colors';
import WorkOutChallenge from '../../Cells/WorkOutChallenge';
import { NavigationScreenProp } from 'react-navigation';
export interface Props {
    navigation: NavigationScreenProp<any, any>,
}

class Challenges extends Component<Props, object> {

    static navigationOptions = () => {
        return {
            headerShown: false
        }
    }
    state = {
        isSelected: true,
        data: [{
            image: Images.pushUps,
            times: '30 Days',
            details: '50 Pushups for 30 Days',
            Participate: 'Participate Now',
            dateTime: 'Tomorrow | 17 June, Thursday'
        },
        {
            image: Images.Morning_WALK,
            times: "1 week",
            details: "+1 Mile Everyday For a week",
            Participate: "Participate Now",
            dateTime: 'Next Week | 28 June, Sunday'
        }],
        MyChallenge: [{
            image: Images.pushUps,
            times: '30 Days',
            details: '50 Pushups for 30 Days',
            Participate: 'Upload Video',
            dateTime: 'Tomorrow | 17 June, Thursday'
        }]

    }

    private renderView = (data: any) => {
        return (
            <WorkOutChallenge lastIndex={false} data={data} onPress={(data: any) => this.props.navigation.navigate('ChallengesDetails', { id: 1 })} />
        )
    }
    private upComingView = (data: any) => {

        this.props.navigation.navigate('ChallengesDetails', { image: data.image, id: 1 })
    }
    private challengesView = (data: any) => {
        this.props.navigation.navigate('ChallengesDetails', { image: data.image, id: 2 })
    }


    render() {
        return (
            <SafeAreaView style={styles.mainVw}>
                <NavigationHeader
                    title={localize.Challenges}
                    isMultiple={false}
                    leftBtnActn={() => this.props.navigation.goBack()}
                    btnImage={Images.LEFT_ARROW}
                />
                <ScrollView style={styles.scrollVw} showsVerticalScrollIndicator={false}>
                    <View style={styles.topVw}>
                        <TouchableOpacity onPress={() => this.setState({ isSelected: true })} activeOpacity={0.8}>
                            <Text style={[styles.textVw, { color: this.state.isSelected == true ? color.LIGHT_WHITE : '#CACFD2' }]}>{localize.Upcoming}</Text>
                            {this.state.isSelected == true ? <View style={styles.lineVw} /> : <View style={styles.emptyVw} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ isSelected: false })} style={styles.MyChallenge} activeOpacity={0.8}>
                            <Text style={[styles.textVw, { color: this.state.isSelected == false ? color.LIGHT_WHITE : '#CACFD2' }]}>{localize.My_Challenges}</Text>
                            {this.state.isSelected == false ? <View style={styles.lineVw} /> : <View style={styles.emptyVw} />}

                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={styles.topMenuTbl}
                        data={this.state.isSelected == true ? this.state.data : this.state.MyChallenge}
                        keyExtractor={(item: any, index: any) => index.toString()}
                        renderItem={this.renderView} />
                </ScrollView>

            </SafeAreaView>
        )
    }
}
export default Challenges;