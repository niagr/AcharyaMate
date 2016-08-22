import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet, 
    ToolbarAndroid
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DayView from './DayView';
interface WeekViewProps extends React.Props<WeekView> {
    subjectSelectHandler: (subject: string) => any;
    // children: React.Component<any, any>[] | React.Component<any, any>;
}
interface WeekViewState {
}
export default class WeekView extends React.Component<WeekViewProps, WeekViewState> {
    render () {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title="Week View"
                    actions={[{title: "Compact View"}, {title: "Settings"}]}
                    style={stylesheet.toolbar}
                />
                <ScrollableTabView>
                    <DayView tabLabel="Mon" onPress={this.props.subjectSelectHandler} />
                    <DayView tabLabel="Tue" onPress={this.props.subjectSelectHandler} />
                    <DayView tabLabel="Wed" onPress={this.props.subjectSelectHandler} />
                    <DayView tabLabel="Thu" onPress={this.props.subjectSelectHandler} />
                    <DayView tabLabel="Fri" onPress={this.props.subjectSelectHandler} />
                    <DayView tabLabel="Sat" onPress={this.props.subjectSelectHandler} />
                </ScrollableTabView>
            </View>
        )
    }
}
const stylesheet = StyleSheet.create({
    "toolbar": {
        height: 50
    }
});