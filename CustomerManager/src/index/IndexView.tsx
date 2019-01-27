import React, {Component} from "react";
import {View} from "react-native";
import {Grid, Icon, Toast} from "@ant-design/react-native";
import {DataItem} from "@ant-design/react-native/lib/grid/PropsType";
import {BaseProps} from "../AppNavigator";


interface Props extends BaseProps {

}

const data = [
    {
        icon: <Icon name={"user"} />,
        text: "顾客管理"
    },
    {
        icon: "",
        text: "未开启"
    },
    {
        icon: "",
        text: "未开启"
    },
    {
        icon: "",
        text: "未开启"
    }, {
        icon: "",
        text: "未开启"
    }, {
        icon: "",
        text: "未开启"
    }, {
        icon: "",
        text: "未开启"
    },
    {
        icon: "",
        text: "未开启"
    },
    {
        icon: "",
        text: "未开启"
    },
    {
        icon: "",
        text: "未开启"
    },
]

export class IndexView extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    onPress(dataItem: DataItem | undefined, itemIndex: number): void {
        this.props.navigation.navigate("CustomerView")
    }

    render(): React.ReactNode {
        return (
            <View>
                <Grid columnNum={3} data={data} onPress={this.onPress.bind(this)}/>
            </View>
        );
    }
}