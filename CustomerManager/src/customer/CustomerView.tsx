import React, {Component} from "react";
import {Icon, List, ListView, SearchBar} from '@ant-design/react-native';
import {Dimensions, ToastAndroid, View} from "react-native";
import {BaseProps} from "../AppNavigator";
import {CustomerListItem} from "./CustomerListItem";
import ActionButton from 'react-native-action-button';
import {globalParams} from '../Context';
import RNFS from 'react-native-fs';
import {NavigationActions, StackActions} from "react-navigation";
interface Props extends BaseProps {
    searchText: string;
}

interface State {
    searchText: string;
    edit: boolean;
    progressNum:number;
}

export class CustomerView extends Component<Props, State> {
    offsetY: number;
    private listView: any;
    private searchText: string = "";
    private items: any = {};

    constructor(props: Props) {
        super(props);
        let {height, width} = Dimensions.get('window');
        this.offsetY = height - 600
        this.state = {
            searchText: "",
            edit: false,
            progressNum:0,
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
                    this.items[item.id] = item
                }
            }} checkbox={this.state.edit} id={item.id} name={item.name} navigation={this.props.navigation}/>
        );
    };

    search(value: string) {
        this.searchText = value;
    }

    refresh() {
        this.listView.refresh();
    }
    delete(){
        this.setState({
            edit: true
        })
        let checkeds=new Array();
        for (let key in this.items) {
            if(this.items[key].checked()){
                checkeds.push(this.items[key].props.id);
            }
        }
        fetch(globalParams.server+"/customer/delete",{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkeds)
        }).then(resp=>{
            this.refresh();
            ToastAndroid.show('删除成功', 1);
        })
    }
    checkedAll(checked:boolean){
        for (let key in this.items) {
            this.items[key].setState({
                checked:checked
            })
        }
    }
    export(){
        const destFile=`${RNFS.ExternalDirectoryPath}/客户信息.xls`;
        const options = {
            fromUrl: globalParams.server+"/customer/export",
            toFile:destFile ,
            background: true,
            connectionTimeout: 10000, // 连接超时时间（仅适用于Android）
            readTimeout: 10000,       // 读取数据超时时间（适用于Android and iOS）
            begin: (res:any) => {
            },
            progress: (res:any) => {
                let pro = res.bytesWritten / res.contentLength;
                this.setState({
                    progressNum: pro,
                });
            }
        };
        const ret = RNFS.downloadFile(options);
        ret.promise.then(res => {
            ToastAndroid.show("导出成功，文件保存路径："+destFile,1);
        }).catch(err => {
            alert(err)
            console.log('err', err);
        });
    }
    render() {
        let actionButton;
        if (this.state.edit) {
            actionButton= (<ActionButton buttonColor="#E94B3B" offsetY={this.offsetY} verticalOrientation={"up"}>

                <ActionButton.Item buttonColor='#499C54' title="删除选中" onPress={this.delete.bind(this)}>
                    <Icon name="delete"/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#499C54' title="取消编辑" onPress={() => {
                    this.setState({
                        edit: false
                    })
                    this.checkedAll(false);
                    for (let key in this.items) {
                        this.items[key].checkBox(false)
                    }
                }}>
                    <Icon name="close"/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#499C54' title="全选" onPress={() => {
                    this.setState({
                        edit: false
                    })
                    this.checkedAll(true)
                }}>
                    <Icon name="check-square"/>
                </ActionButton.Item>
            </ActionButton>)
        }else{
            actionButton= (<ActionButton buttonColor="#E94B3B" offsetY={this.offsetY} verticalOrientation={"up"}>
                <ActionButton.Item buttonColor='#499C54' title="添加客户" onPress={() => {
                    const  resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName:'CustomerInfoView',params:{
                                    id: -1
                                }})//要跳转到的页面名字
                        ]
                    });
                    this.props.navigation.dispatch(resetAction)
                }}>
                    <Icon name="user-add"/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#499C54' title="导出" onPress={this.export.bind(this)}>
                    <Icon name="export"/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#499C54' title="编辑" onPress={() => {
                    this.setState({
                        edit: true
                    })
                    for (let key in this.items) {
                        this.items[key].checkBox(true)
                    }
                }}>
                    <Icon name="edit"/>
                </ActionButton.Item>
            </ActionButton>)
        }
        return (
            <View style={{flex: 1}}>
                <List>
                    <SearchBar placeholder="搜索" value={this.props.searchText} onChange={this.search.bind(this)}
                               onSubmit={() => {
                                   this.refresh();
                               }}
                               onCancel={() => {
                                   this.refresh();
                               }} cancelText={"查找"}/>
                    <ListView ref={(listView) => {
                        this.listView = listView;
                    }} onFetch={this.onFetch} renderItem={this.renderItem.bind(this)}  refreshable={true}
                              customRefreshControl={(refreshing: boolean, onfresh: any) => {
                                  if (refreshing) {
                                      //刷新清除所有选择
                                      this.checkedAll(false);
                                      delete this.items;
                                      this.items = {};
                                  }
                              }}/>
                </List>
                {actionButton}
            </View>
        );
    }
}

