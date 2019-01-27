import React, {Component} from "react";
import {Button, Icon, List, ListView, SearchBar} from '@ant-design/react-native';
import {View,Dimensions} from "react-native";
import {BaseProps} from "../AppNavigator";
import {CustomerListItem} from "./CustomerListItem";
import ActionButton from 'react-native-action-button';

interface Props extends BaseProps {

}

export class CustomerView extends Component<Props> {
    offsetY:number;
    constructor(props: Props) {
        super(props);
        let {height,width} =  Dimensions.get('window');
        this.offsetY=height-500

    }

    onFetch(page: number, startFetch: any, abortFetch: any) {
        try {
            let pageLimit = 30;
            let rowData = [{name: "wujiazhen", phone: "123456", desc: "xxxx"}, {
                name: "wujiazhen",
                phone: "123456",
                desc: "xxxx"
            }]
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch();
        }
    };

    renderItem(item: any, index: number, separators: {
        highlight: () => void;
        unhighlight: () => void;
        updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
    }) {
        return (
            <CustomerListItem id={item.id} name={item.name} navigation={this.props.navigation}/>
        );
    };

    render() {
        return (
            <View style={{flex:1}}>
                <List>
                    <SearchBar placeholder="搜索"/>
                    <ListView onFetch={this.onFetch} renderItem={this.renderItem.bind(this)}/>
                </List>
                <ActionButton  buttonColor="#E94B3B"   offsetY={this.offsetY}  verticalOrientation={"up"} >
                    <ActionButton.Item buttonColor='#499C54' title="添加客户"  onPress={() => console.log("notes tapped!")}>
                        <Icon name="user-add" />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

