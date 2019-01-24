import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native';
import { connect } from 'react-redux';

import {toggleNumbers} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Number extends React.Component{

    render(){
        return (
            <View style={styles.container}>
                {this.props.game.numbers.map(number =>{
                    return(
                        <TouchableOpacity
                            activeOpacity={.91}
                            onPress={()=> this.props.toggleNumbers(number.key)}
                            key={number.key}
                            style={[styles.boxCon, this.props.game.correctBlocks.includes(parseInt(number.key)) ? styles.exStyle : {}]}
                        >
                            {number}
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

function mapStateToProps({game}) {
    return {
        game
    };
}

export default connect(mapStateToProps, {toggleNumbers})(Number);

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    boxCon:{
        width: SCREEN_WIDTH /4,
        height: SCREEN_HEIGHT /12,
        backgroundColor: "#2d2d2d",
        borderWidth: .5,
        borderColor: "#6faaa3"
    },
    exStyle:{
        backgroundColor: "#000000",
    },
});