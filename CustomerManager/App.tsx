/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react'
import {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {AppContainer} from "./src/AppNavigator";



type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
               <AppContainer/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    }
});