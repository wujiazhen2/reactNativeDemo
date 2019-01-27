import React, {Component} from "react";
import {StyleSheet} from 'react-native';
import {Button, InputItem, List, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {BaseProps} from "../AppNavigator";


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
        this.props.navigation.navigate("IndexView")
    }
}