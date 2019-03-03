import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native';
import { connect } from 'react-redux';

import {toggleNumbers} from '../actions';

const w = Dimensions.get('window');

class Number extends React.Component{

    render(){
        const { numbers, correctBlocks, game_finished } = this.props.store;
        return (
            <View style={styles.container}>
                {numbers.map(number =>{
                    return(
                        <TouchableOpacity
                            activeOpacity={.91}
                            onPress={()=>{
                                if(!game_finished) this.props.toggleNumbers(number.key)
                            }}
                            key={number.key}
                            style={[styles.boxCon, correctBlocks.includes(parseInt(number.key)) ? styles.exStyle : {}]}
                        >
                            {number}
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(mapStateToProps, {toggleNumbers})(Number);

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    boxCon:{
        width: w.width /4,
        height: w.height /12,
        backgroundColor: "#3b3b3b",
        borderWidth: .5,
        borderColor: "#6faaa3"
    },
    exStyle:{
        backgroundColor: "#000000",
    },
});