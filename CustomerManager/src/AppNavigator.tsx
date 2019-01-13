
import React from 'react';
import {LoginView} from "./login/LoginView";
import {createAppContainer, createStackNavigator} from "react-navigation";
import {IndexView} from "./index/IndexView";


const AppNavigator =  createStackNavigator({
    Login: {
        screen: LoginView
    },
    Index: {
        screen: IndexView
    }

}, {
    initialRouteName: 'Login',
})

export const AppContainer = createAppContainer(AppNavigator);