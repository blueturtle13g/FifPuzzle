import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { connect } from "react-redux";
import {changeLevel} from "../actions";

const SCREEN_HEIGHT = Dimensions.get('window').height;
let durationInterval = null;

class TopAb extends React.Component{
    state={
        duration: "00:00:00"
    };

    componentDidMount() {
        durationInterval = setInterval(()=>{
            this.msToTime(Date.now() - this.props.game.time)
        }, 1000)
    }

    componentDidUpdate() {
        if(this.props.game.correctBlocks.length === this.props.game.level -1){
            clearInterval(durationInterval);
        }
    }


    msToTime = duration=> {
        let seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        this.setState({"duration": hours + ":" + minutes + ":" + seconds});
    };

    renderButton = (thisLevel)=>{
        const { level } = this.props.game;
        let radius = 12;

        if(thisLevel === 32) {
            radius = 15
        }else if(thisLevel === 44){
            radius = 18
        }
        return(
            <View
                style={styles.levelButton}
            >
                <TouchableOpacity
                    style={[styles.levelIndicator, {borderWidth: radius}, thisLevel === level ? styles.exStyle : {}]}
                    onPress={()=>{
                        this.props.changeLevel(thisLevel);
                        clearInterval(durationInterval);
                        this.setState({duration: "00:00:00"});
                        durationInterval = setInterval(()=>{
                            this.msToTime(Date.now() - this.props.game.time)
                        }, 1000)
                    }}
                />
            </View>
        )
    };

    render(){
        return (
            <View style={styles.ab}>
                <View style={styles.time}>
                    <Text style={styles.timeText}>
                        {this.state.duration}
                    </Text>
                </View>
                {this.renderButton(44, this.props)}
                {this.renderButton(32, this.props)}
                {this.renderButton(16, this.props)}
            </View>
        );
    }
}

mapStateToProps = ({game})=> {
    return {game}
};

export default connect(mapStateToProps, {changeLevel})(TopAb);

const styles = StyleSheet.create({
    ab:{
        top: 0,
        flexDirection: "row",
        position: "absolute",
        height: SCREEN_HEIGHT /12,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        backgroundColor: "#22272d",
    },
    levelButton:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "50%",
    },
    time:{
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    timeText:{
        color: "#d0ffa5",
        fontSize: 22
    },
    exStyle:{
        borderColor: "#e7ff7d",
    },
    levelIndicator:{
        borderColor: "#6faaa3",
        borderRadius: 100
    }
});