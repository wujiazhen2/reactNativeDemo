import React, {Component} from "react";
import {Checkbox, Icon, List, ListView, SearchBar} from '@ant-design/react-native';
import {Dimensions, View} from "react-native";
import {BaseProps} from "../AppNavigator";
import {CustomerListItem} from "./CustomerListItem";
import ActionButton from 'react-native-action-button';
import {globalParams} from '../Context';

interface Props extends BaseProps {
    searchText: string;

}

interface State {
    searchText: string;
    edit: boolean;
}

export class CustomerView extends Component<Props, State> {
    offsetY: number;
    private listView: any;
    private searchText: string = "";
    private items: Array<CustomerListItem> = new Array<CustomerListItem>();

    constructor(props: Props) {
        super(props);
        let {height, width} = Dimensions.get('window');
        this.offsetY = height - 600
        this.state = {
            searchText: "",
            edit: false
        }
    }

    onFetch = async (
        page = 1,
        startFetch: (rowData: any, pageLimit: number) => any, abortFetch: () => void
    ) => {
        try {
            let pageLimit = 10;
            let params = {
                pageSize: pageLimit,
                pageNum: page,
                searchText: this.searchText
            }
            fetch(globalParams.server + "/customer/list", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }).then(response => {
                return response.json();
            }).then(rowData => {
                startFetch(rowData, pageLimit);
            })
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
        }
    };


    renderItem(item: any, index: number, separators: {
        highlight: () => void;
        unhighlight: () => void;
        updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
    }) {
        return (
            <CustomerListItem ref={(item) => {
                if (item != null) {
                    this.items.push(item)
                }
            }} checkbox={this.state.edit} id={item.id} name={item.name} navigation={this.props.navigation}/>
        );
    };

    search(value: string) {
        this.searchText = value;
    }

    render() {
        if(this.state.edit){

        }
        return (
            <View style={{flex: 1}}>
                <List>
                    <SearchBar placeholder="搜索" value={this.props.searchText} onChange={this.search.bind(this)}
                               onSubmit={() => {
                                   this.listView.refresh();
                               }}
                               onCancel={() => {
                                   this.listView.refresh();
                               }} cancelText={"查找"}/>
                    <ListView ref={(listView) => {
                        this.listView = listView;
                    }} onFetch={this.onFetch} renderItem={this.renderItem.bind(this)}
                              customRefreshControl={(refreshing: boolean, onfresh: any) => {
                                  if (refreshing) {
                                      delete this.items;
                                      this.items = new Array<CustomerListItem>();
                                  }
                              }}/>
                </List>

                <ActionButton buttonColor="#E94B3B" offsetY={this.offsetY} verticalOrientation={"up"}>
                    <ActionButton.Item buttonColor='#499C54' title="添加客户" onPress={() => {
                        this.props.navigation.navigate("CustomerInfoView", {
                            id: -1
                        });
                    }}>
                        <Icon name="user-add"/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#499C54' title="编辑" onPress={() => {
                        this.setState({
                            edit: true
                        })
                        this.items.forEach((item)=>{
                            item.checkBox(true);
                        })
                    }}>
                        <Icon name="edit"/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

