import * as React from "react";
import { View, StyleSheet, ToolbarAndroid } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DayView from './DayView';
export default class WeekView extends React.Component {
    render() {
        return (React.createElement(View, {style: { flex: 1 }}, React.createElement(ToolbarAndroid, {title: "Week View", actions: [{ title: "Compact View" }, { title: "Settings" }], style: stylesheet.toolbar}), React.createElement(ScrollableTabView, null, React.createElement(DayView, {tabLabel: "Mon", onPress: this.props.subjectSelectHandler}), React.createElement(DayView, {tabLabel: "Tue", onPress: this.props.subjectSelectHandler}), React.createElement(DayView, {tabLabel: "Wed", onPress: this.props.subjectSelectHandler}), React.createElement(DayView, {tabLabel: "Thu", onPress: this.props.subjectSelectHandler}), React.createElement(DayView, {tabLabel: "Fri", onPress: this.props.subjectSelectHandler}), React.createElement(DayView, {tabLabel: "Sat", onPress: this.props.subjectSelectHandler}))));
    }
}
const stylesheet = StyleSheet.create({
    "toolbar": {
        height: 50
    }
});
