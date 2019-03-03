import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { connect } from "react-redux";
import {
    changeLevel,
    updateProp,
    shake
} from "../actions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    msToTime
} from "../utils";
import {LEVEL_EASY, LEVEL_HARD, LEVEL_MEDIUM} from "../actions/types";
const w = Dimensions.get('window');
let durationInterval = null;

class Board extends React.Component{
    state={
        duration: "00:00:00"
    };

    componentDidMount() {
        this.handleDuration();
    }

    handleDuration = ()=>{
        durationInterval = setInterval(()=>{
            if(this.props.store.game_finished){
                clearInterval(durationInterval);
                return;
            }
            this.setState({duration: msToTime(Date.now() - this.props.store.time)})
        }, 1000);
    };

    renderButton = (thisLevel)=>{
        const { level } = this.props.store;
        let dotWidth = 12;

        if(thisLevel === LEVEL_MEDIUM) {
            dotWidth = 15
        }else if(thisLevel === LEVEL_HARD){
            dotWidth = 18
        }
        return(
            <TouchableOpacity
                style={[
                    styles.levelIndicator,
                    {borderWidth: dotWidth, borderRadius: dotWidth*2},
                    thisLevel === level && styles.levelIndicatorActive
                ]}
                onPress={()=>{
                    this.props.changeLevel(thisLevel);
                    clearInterval(durationInterval);
                    this.setState({duration: "00:00:00"});
                    this.handleDuration();
                }}
            />
        )
    };

    render(){
        const { modal_open, can_shake } = this.props.store;
        return (
            <View style={styles.ab}>
                <Text style={styles.timeText}>
                    {this.state.duration}
                </Text>
                <TouchableOpacity
                    style={styles.iconC}
                    onPress={()=>this.props.updateProp({key: "modal_open", value: !modal_open})}
                >
                    <Ionicons name={"ios-timer"} size={38} color={"#d4d1cf"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconC}
                    onPress={()=>{
                        if(!!can_shake) this.props.shake()
                    }}
                >
                    <AntDesign name={"dingding-o"} size={32} color={"#d4d1cf"}/>
                    <View style={styles.shake_badge}>
                        <Text style={styles.shake_text}>{can_shake}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.dots}>
                    {this.renderButton(LEVEL_HARD)}
                    {this.renderButton(LEVEL_MEDIUM)}
                    {this.renderButton(LEVEL_EASY)}
                </View>
            </View>
        );
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(mapStateToProps, {
    changeLevel,
    updateProp,
    shake
})(Board);

const styles = StyleSheet.create({
    ab:{
        top: 0,
        flexDirection: "row",
        position: "absolute",
        height: w.height /12,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#22272d",
    },
    timeText:{
        color: "#d0ffa5",
        fontSize: 22,
        width: "33%",
        textAlign: "center"
    },
    iconC:{
        width: "16%",
        justifyContent: "center",
        alignItems: "center"
    },
    dots:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "33%",
        height: "100%"
    },
    levelIndicatorActive:{
        borderColor: "#e7ff7d",
    },
    levelIndicator:{
        borderColor: "#6faaa3",
    },
    shake_badge:{
        position: "absolute",
        top: 0,
        right: 0,
        height: 18,
        width: 18,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        backgroundColor: "#66f086",
    },
    shake_text:{
        color: "#2b2b2b",
    }
});