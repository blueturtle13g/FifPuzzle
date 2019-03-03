import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Record from './Record';
import Board from "./Board";
import Number from "./Number";
import {retrieveRecords} from "../utils";
import {updateProp} from "../actions";
import {LEVEL_EASY, LEVEL_HARD, LEVEL_MEDIUM} from "../actions/types";

class Game extends Component {
    componentDidMount() {
        retrieveRecords().then((records) => {
            let easy_records = [];
            let medium_records= [];
            let hard_records = [];
            if(records !== null){
                records.map(record=>{
                    switch (record.level){
                        case LEVEL_HARD:
                            hard_records.push(record);
                            break;
                        case LEVEL_MEDIUM:
                            medium_records.push(record);
                            break;
                        case LEVEL_EASY:
                            easy_records.push(record);
                            break;
                    }
                });
            }
            this.props.updateProp([
                {key: "easy_records", value: easy_records},
                {key: "medium_records", value: medium_records},
                {key: "hard_records", value: hard_records}
            ]);
        })
    }

    render() {
        const {modal_open, game_finished} = this.props.store;
        return (
            <View style={styles.container}>
                <Board/>
                {game_finished &&(
                    <View style={styles.trophyCon}>
                        <EvilIcons name={"trophy"} size={100}/>
                    </View>
                )}
                <Number/>
                {modal_open && <Record/>}
            </View>
        );
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(
    mapStateToProps, {updateProp}
)(Game);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingBottom: .5,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#6faaa3",
    },
    trophyCon:{
        marginBottom: -8
    }
});