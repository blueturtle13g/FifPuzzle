import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import SplashScreen from 'react-native-splash-screen';
import reducers from './reducers';
import Game from "./components/Game";

export default class App extends Component {

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View style={styles.container}>
                    <Game/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
});