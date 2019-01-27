import React,{Component} from "react";
import {BaseProps} from "../AppNavigator";
import Item from "@ant-design/react-native/lib/list/ListItem";

interface Props extends BaseProps{
    id:number;
    name:string;
}

export class CustomerListItem extends Component<Props>{

    constructor(props:Props){
        super(props);
    }
    onPress(){
        this.props.navigation.navigate("CustomerInfoView",{
            id:this.props.id
        });
    }
    render(): React.ReactNode {
        return (<Item onPress={this.onPress.bind(this)}>{this.props.name}</Item>);
    }
}