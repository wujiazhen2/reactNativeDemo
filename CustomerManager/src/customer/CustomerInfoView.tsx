import React, {Component} from "react";
import {BaseProps} from "../AppNavigator";
import {Button, InputItem, List, TextareaItem, Toast} from "@ant-design/react-native";
import {ScrollView, StyleSheet, Text} from "react-native";
import Item from "@ant-design/react-native/lib/list/ListItem";
import {globalParams} from "../Context";
import {CustomerListItem} from "./CustomerListItem";

interface Props extends BaseProps {

}

class CustomerInfo {
    id: number;
    name: string;
    phone: string;
    address: string;
    description: string;

    constructor(id: number,
                name: string,
                phone: string,
                address: string,
                description: string,) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.description = description;
    }
}

interface State {
    id: number;
    editable: boolean;
    name: string;
    phone: string;
    address: string;
    description: string;
}

export class CustomerInfoView extends Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props);
        this.loadData();
    }

    loadData() {
        const id = this.props.navigation.state.params.id;
        this.state = {
            editable: id == -1,
            id: id,
            name: "",
            phone: "",
            description: "",
            address: "",
        }
        if (id != -1) {
            let resp = fetch(globalParams.server + "/customer/get/" + id).then(resp => {
                return resp.json();
            }).then(value => {
                this.setState({
                    name: value.name,
                    phone: value.phone,
                    description: value.description,
                    address: value.address,
                })
            });
        }

    }

    edit() {
        this.setState({
            editable: true
        });
    }

    save() {
        const id = this.state.id;
        let ct = new CustomerInfo(id, this.state.name, this.state.phone, this.state.address, this.state.description)
        if (this.state.id == -1) {
            delete ct.id
            fetch(globalParams.server + "/customer/save", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ct)
            }).then(resp => {
                return resp.text();
            }).then(value => {
                Toast.success('保存成功', 1);
                this.setState({
                    id: parseInt(value)
                })
            })
        } else {
            fetch(globalParams.server + "/customer/update", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ct)
            }).then(resp => {
                Toast.success('保存成功', 1);
            })
        }
        this.setState({
            editable: false
        });
    }

    render(): React.ReactNode {
        let butt;
        if (this.state.editable) {
            butt = <Button type={"primary"} style={style.button} onPress={this.save.bind(this)}>保存</Button>;
        } else {
            butt = <Button type={"primary"} style={style.button} onPress={this.edit.bind(this)}>编辑</Button>;
        }

        return (<ScrollView
            style={{flex: 1}}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <List>
                <Item>
                    <InputItem name={"name"} editable={this.state.editable} value={this.state.name} onChange={(val) => {
                        this.setState({name: val})
                    }}>姓名:</InputItem>
                    <InputItem name={"phone"} editable={this.state.editable} value={this.state.phone}
                               onChange={(val) => {
                                   this.setState({phone: val})
                               }}>电话:</InputItem>
                    <Item multipleLine={true}>
                        <Text style={style.text}>地址:</Text>
                        <TextareaItem editable={this.state.editable}  name={"address"} rows={4} placeholder="地址" value={this.state.address} last={true}
                                      onChangeText={(val) => {
                                          this.setState({address: val})
                                      }}/>
                    </Item>
                    <Item multipleLine={true}>
                        <Text style={style.text}>需求:</Text>
                        <TextareaItem editable={this.state.editable} name={"description"} rows={4} placeholder="需求" value={this.state.description}
                                      last={true}
                                      onChangeText={(val) => {
                                          this.setState({description: val})
                                      }}></TextareaItem>
                    </Item>
                </Item>
                {butt}
            </List>
        </ScrollView>);
    }
}

const style = StyleSheet.create({
    text: {
        backgroundColor: "#bebebe",
        paddingLeft: 1,
        textAlignVertical: 'center',
        fontSize: 17,
        color: "#090909"
    },
    button: {
        marginLeft: 30,
        marginRight: 20
    }
})