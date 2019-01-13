import React, {Component} from "react";
import {Grid} from "antd-mobile-rn";
import {View} from "react-native";


interface Props {

}

const data = [
    {
        icon: "",
        text: "功能"
    },
    {
        icon: "",
        text: "功能"
    },
    {
        icon: "",
        text: "功能"
    },
    {
        icon: "",
        text: "功能"
    }, {
        icon: "",
        text: "功能"
    }, {
        icon: "",
        text: "功能"
    }, {
        icon: "",
        text: "功能"
    },
    {
        icon: "",
        text: "功能"
    },
    {
        icon: "",
        text: "功能"
    },
    {
        icon: "",
        text: "功能"
    },
]

export class IndexView extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View>
                <Grid columnNum={3} data={data} />
            </View>
        );
    }
}