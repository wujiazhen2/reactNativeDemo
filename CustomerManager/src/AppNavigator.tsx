
import React from 'react';
import {LoginView} from "./login/LoginView";
import {createAppContainer, createStackNavigator, NavigationScreenProp} from "react-navigation";
import {IndexView} from "./index/IndexView";
import {CustomerView} from "./customer/CustomerView";
import {CustomerInfoView} from "./customer/CustomerInfoView";

export interface BaseProps {
    navigation:NavigationScreenProp<any>
}

const AppNavigator =  createStackNavigator({
    LoginView: {
        screen: LoginView,
        navigationOptions: {
            title: "登录"
        }
    },
    IndexView: {
        screen: IndexView,
        navigationOptions: {
            title: "客户管理系统"
        }
    },
    CustomerView:{
        screen:CustomerView,
        navigationOptions: {
            title: "客户管理"
        }
    },
    CustomerInfoView:{
        screen:CustomerInfoView,
        navigationOptions: {
            title: "客户信息"
        }
    }
}, {
    initialRouteName: 'LoginView',
})

export const AppContainer = createAppContainer(AppNavigator);