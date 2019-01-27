import {Component} from "react";
import {List, ListView, SearchBar} from '@ant-design/react-native';
import React from "react";
import {BaseProps} from "../AppNavigator";
import {CustomerListItem} from "./CustomerListItem";

interface Props extends BaseProps{

}

export class CustomerView extends Component<Props> {

    constructor(props:Props) {
        super(props);
    }

    onFetch(page:number, startFetch:any, abortFetch:any) {
        try {
            let pageLimit = 30;
            let rowData = [{name:"wujiazhen",phone:"123456",desc:"xxxx"},{name:"wujiazhen",phone:"123456",desc:"xxxx"}]
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch();
        }
    };
    renderItem(item: any, index: number, separators: {
        highlight: () => void;
        unhighlight: () => void;
        updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
    }){
        return (
           <CustomerListItem id={item.id} name={item.name} navigation={this.props.navigation}/>
        );
    };
    render() {
        return (
            <List>
                <SearchBar  placeholder="搜索" />
            <ListView onFetch={this.onFetch} renderItem={this.renderItem.bind(this)}/>
            </List>
        );
    }
}