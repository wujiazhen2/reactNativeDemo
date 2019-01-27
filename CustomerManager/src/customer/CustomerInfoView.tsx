import React, {Component} from "react";
import {BaseProps} from "../AppNavigator";
import {Button, Flex, InputItem, List, TextareaItem} from "@ant-design/react-native";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Item from "@ant-design/react-native/lib/list/ListItem";

interface Props extends BaseProps {

}

class CustomerInfo {
    id: number;
    name: string;
    phone: string;
    address: string;
    desc: string;

    constructor(id: number,
                name: string,
                phone: string,
                address: string,
                desc: string,) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.desc = desc;
    }
}

interface State {
    editable: boolean;
    name:string;
    phone:string;
    address:string;
    desc:string;
}

export class CustomerInfoView extends Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props);
        this.loadData();
    }

    loadData(): void {
        const id = this.props.navigation.state.params.id;
        const ct = new CustomerInfo(id, "wujiazhen", "123123456798000000000", "广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州广州", "需求")
        this.state={
            editable: false,
            name:ct.name,
            phone:ct.phone,
            desc:ct.desc,
            address:ct.address,
        }
    }

    edit() {
        this.setState({
            editable: true
        });
    }
    save() {
        this.setState({
            editable: false
        });
    }
    render(): React.ReactNode {
        let butt;
        if(this.state.editable){
            butt=<Button type={"primary"} style={style.button} onPress={this.save.bind(this)}>保存</Button>;
        }else {
            butt=<Button type={"primary"} style={style.button}  onPress={this.edit.bind(this)}>编辑</Button>;
        }

        return ( <ScrollView
            style={{ flex: 1 }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <List>
                <Item>
                    <InputItem name={"name"} editable={this.state.editable} value={this.state.name}  onChange={(val)=>{this.setState({name:val})}}>姓名:</InputItem>
                    <InputItem name={"phone"} editable={this.state.editable} value={this.state.phone} onChange={(val)=>{this.setState({phone:val})}}>电话:</InputItem>
                    <Item multipleLine={true}>
                        <Text style={style.text}>地址:</Text>
                        <TextareaItem name={"address"} rows={4} placeholder="地址" value={this.state.address} last={true} onChangeText={(val)=>{this.setState({address:val})}}  />
                    </Item>
                    <Item multipleLine={true}>
                        <Text style={style.text} >需求:</Text>
                        <TextareaItem name={"desc"} rows={4} placeholder="需求" value={this.state.desc} last={true} onChangeText={(val)=>{this.setState({desc:val})}} ></TextareaItem>
                    </Item>
                </Item>
                {butt}
            </List>
        </ScrollView> );
    }
}

const style = StyleSheet.create({
    text: {
        backgroundColor:"#bebebe",
        paddingLeft: 1,
        textAlignVertical: 'center',
        fontSize: 17,
        color: "#090909"
    },
    button:{
        marginLeft:30,
        marginRight:20
    }
})