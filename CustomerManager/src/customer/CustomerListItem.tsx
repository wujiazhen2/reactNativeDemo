import React,{Component} from "react";
import {BaseProps} from "../AppNavigator";
import Item from "@ant-design/react-native/lib/list/ListItem";
import CheckboxItem from "@ant-design/react-native/lib/checkbox/CheckboxItem";

interface Props extends BaseProps{
    id:number;
    name:string;
    checkbox:boolean;
}
interface State {
    checkbox:boolean;
}
export class CustomerListItem extends Component<Props,State>{
    id:number;
    constructor(props:Props){
        super(props);
        this.id=this.props.id;
        this.state={
            checkbox:this.props.checkbox
        }
    }
    checkBox(display:boolean){
        this.setState({
            checkbox:display
        })
    }
    onPress(){
        this.props.navigation.navigate("CustomerInfoView",{
            id:this.props.id
        });
    }
    render(): React.ReactNode {
        if(this.state.checkbox){
            return <CheckboxItem >{this.props.name}</CheckboxItem>
        }else {
            return (<Item onPress={this.onPress.bind(this)}>{this.props.name}</Item>)
        };
    }
}