import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import TopAb from "./components/TopAb";
import Number from "./components/Number";

const SCREEN_HEIGHT = Dimensions.get('window').height;

class App extends Component {

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <StatusBar hidden/>
                <View style={styles.container}>
                    <TopAb/>
                    <Number/>
                </View>
            </Provider>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container:{
        height: SCREEN_HEIGHT,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#6faaa3",
    }
});