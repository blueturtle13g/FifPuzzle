import React from 'react';
import {Text, View, StyleSheet, AsyncStorage} from "react-native";

export const msToTime = s=> {
    // Pad to 2 or 3 digits, default is 2
    let pad = (n, z = 2) => ('00' + n).slice(-z);
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
};

export const retrieveRecords = async ()=>{
    try {
        const retrievedItem =  await AsyncStorage.getItem('records');
        return JSON.parse(retrievedItem);
    } catch (error) {
    }
};

export const shuffle = array =>{
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

export const genNumbers = level=>{
    let numbers = [];
    for(let i = 1; i < level; i++){
        numbers.push(
            <View
                key={i}
                style={styles.noCon}
            >
                <Text style={styles.text}>{i}</Text>
            </View>
        );
    }
    numbers.push(<View style ={styles.absentCon} key={0}/>);
    numbers = shuffle(numbers);
    return numbers;
};

const styles = StyleSheet.create({
    noCon:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    absentCon:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6faaa3"
    },
    text:{
        fontSize: 23,
        color: "white",
        fontStyle: "italic",
        fontWeight: "600",
    }
});