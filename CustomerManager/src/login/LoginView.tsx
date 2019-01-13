import React, {Component, ReactDOM} from "react";
import {StyleSheet} from 'react-native';
import {Button, Flex, InputItem, List, WhiteSpace, WingBlank} from "antd-mobile-rn";
import { NavigationScreenProp} from "react-navigation";


interface Props {
    navigation:NavigationScreenProp<any>
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
                <WingBlank size={"md"}><Button type="primary" onClick={this.loginHandler.bind(this)}>登录</Button></WingBlank>
            </List>
        );
    }
    loginHandler(){
        this.props.navigation.navigate({
            routeName:"Index"
        })
    }
}