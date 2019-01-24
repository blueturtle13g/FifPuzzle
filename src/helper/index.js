import React from 'react';
import {Text, View, StyleSheet} from "react-native";

const shuffle = array =>{
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

export const genNumbers = (level)=>{
    let numbers = [];
    for(let i = 1; i < level; i++){
        numbers.push(
            <View
                key={i}
                style={styles.noCon}
            >
                <Text style={styles.text}>
                    {i}
                </Text>
            </View>
        );
    }
    numbers.push(<View style={styles.absentCon} key={0}/>);
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
        backgroundColor: "#6faaa3"
    },
    text:{
        fontSize: 23,
        color: "white",
        fontStyle: "italic",
        fontWeight: "600",
    }
});