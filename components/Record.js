import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { msToTime } from '../utils';
import { updateProp, setNewRecord } from '../actions';
import {LEVEL_EASY, LEVEL_HARD, LEVEL_MEDIUM} from "../actions/types";

class Record extends Component {

    renderOldRecords = ()=>{
        const {
            records_level_shown,
            easy_records,
            medium_records,
            hard_records,
        } = this.props.store;
        let records = [];
        switch (records_level_shown){
            case LEVEL_HARD:
                records = hard_records;
                break;
            case LEVEL_MEDIUM:
                records = medium_records;
                break;
            case LEVEL_EASY:
                records = easy_records;
                break;
        }
        if(records.length > 0){
            records.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
            return(
                <ScrollView style={styles.oldRecordsCon}>
                    {records.map((record, i)=>{
                        if(record.level !== records_level_shown)return;
                        return(
                            <View
                                key={record.time}
                                style={[styles.oldRecordCon]}
                            >
                                <Text style={[styles.texts, styles.rank]}>{i+1}</Text>
                                <Text style={styles.texts}>{record.name}</Text>
                                <Text style={[styles.texts]}>{msToTime(record.time)}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            )
        }

        return(
            <View style={[styles.oldRecordsCon, {justifyContent: "center", alignItems: "center"}]}>
                <Text style={[styles.texts, {fontSize: 25}]}>No records in this level!</Text>
                <Entypo name={"emoji-happy"} size={100} color={"#fff"}/>
            </View>
        )
    };

    handleChangeText = value=>{
        if (value.length < 20) this.props.updateProp({key: "name", value});
        else ToastAndroid.showWithGravity(
            'No More Characters Are Allowed!',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
        );
    };

    renderNewRecord = (newRecord)=>{
        if(!!newRecord){
            return(
                <View style={styles.newRecordCon}>
                    <TextInput
                        autoFocus
                        value={this.props.store.name}
                        onChangeText={this.handleChangeText}
                        style={styles.textInput}
                        placeholder={"Your Name"}
                        onSubmitEditing={this.props.setNewRecord}
                    />
                    <Text style={styles.texts}>
                        Save Your New Record: {msToTime(newRecord)}
                    </Text>
                </View>
            )
        }
    };

    renderButton = (thisLevel)=>{
        const { records_level_shown } = this.props.store;
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
                    thisLevel === records_level_shown && styles.levelIndicatorActive
                ]}
                onPress={()=> this.props.updateProp({key: "records_level_shown", value: thisLevel})}
            />
        )
    };

    render() {
        const { new_record } = this.props.store;
        return (
            <View style={styles.container}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={()=>this.props.updateProp({key: "modal_open", value: false})}
                    >
                        <MaterialCommunityIcons name={"keyboard-backspace"} size={35} color={"#fff"}/>
                    </TouchableOpacity>
                    <View style={styles.dots}>
                        {this.renderButton(LEVEL_HARD)}
                        {this.renderButton(LEVEL_MEDIUM)}
                        {this.renderButton(LEVEL_EASY)}
                    </View>
                </View>

                {this.renderOldRecords()}
                {this.renderNewRecord(new_record)}

            </View>
        );
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(
    mapStateToProps, { updateProp, setNewRecord }
)(Record);

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        paddingHorizontal: 15,
        paddingTop: 50,
        backgroundColor: "#4a5a54",
        justifyContent: "center",
        alignItems: "center"
    },
    modalHeader:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2
    },
    closeModal:{
        borderColor: "#fff",
        marginLeft: 3
    },
    dots:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "33%",
        height: "100%"
    },
    oldRecordsCon:{
        flex: 8,
        width: "100%",
    },
    oldRecordCon:{
        flex: 1,
        minHeight: 35,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 2,
    },
    levelIndicatorActive:{
        borderColor: "#aaa",
    },
    levelIndicator:{
        borderColor: "#2b2b2b",
    },
    textInput:{
        borderWidth: 1,
        borderColor: "#aaa",
        width: 300,
        height: 40,
        padding: 3,
        fontSize: 18,
        color: "white"
    },
    texts:{
        fontSize: 17,
        textAlign: "center",
        color: "#fff"
    },
    newRecordCon:{
        marginTop: 15,
    },
    rank:{
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    }
});