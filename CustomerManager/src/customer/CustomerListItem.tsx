import React, {Component} from "react";
import {BaseProps} from "../AppNavigator";
import Item from "@ant-design/react-native/lib/list/ListItem";
import CheckboxItem from "@ant-design/react-native/lib/checkbox/CheckboxItem";
import {NavigationActions, StackActions} from "react-navigation";

interface Props extends BaseProps {
    id: number;
    name: string;
    checkbox: boolean;
}

interface State {
    checkbox: boolean;
    checked: boolean;
}

export class CustomerListItem extends Component<Props, State> {
    id: number;
    constructor(props: Props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            checkbox: this.props.checkbox,
            checked: false
        }
    }

    checked(): boolean | undefined {
        return this.state.checked;
    }

    checkBox(display: boolean) {
        this.setState({
            checkbox: display
        })
    }

    onPress() {
        const  resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName:'CustomerInfoView',params:{
                        id: this.props.id
                    }})//要跳转到的页面名字
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    render(): React.ReactNode {
        if (this.state.checkbox) {
            return <CheckboxItem
            checked={this.state.checked}
            onChange={event => {
              this.setState({checked: event.target.checked});
            }}
            >{this.props.name}</CheckboxItem>
        } else {
            return (<Item onPress={this.onPress.bind(this)}>{this.props.name}</Item>)
        }
        ;
    }
}