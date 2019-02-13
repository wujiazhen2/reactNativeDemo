import React, {Component} from "react";
import {StyleSheet} from 'react-native';
import {Button, InputItem, List, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {BaseProps} from "../AppNavigator";
import {NavigationActions, StackActions} from "react-navigation";


interface Props extends BaseProps{

}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#3b3d40"
    }
});

export class LoginView extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <List style={styles.list}>
                <WhiteSpace/>
                <InputItem>用户名</InputItem>
                <InputItem type="password">密码</InputItem>
                <WhiteSpace/>
                <WingBlank size={"md"}><Button type="primary" onPress={this.loginHandler.bind(this)}>登录</Button></WingBlank>
            </List>
        );
    }
    loginHandler(){
        const  resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName:'CustomerView'})//要跳转到的页面名字
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }
}