import * as React from "react";
import { View, StyleSheet, ToolbarAndroid, StatusBar } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DayView from './DayView';
// import {routine} from '../mock/data'
// import {subjects, SubjectMap} from '../mock/subjects'
const WeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STATUSBAR_COLOR = '#600000';
const BACKGROUND_COLOR = '#800000';
const TEXT_COLOR = 'white';
export default class WeekView extends React.Component {
    render() {
        // convert our data to a form suiltable for passing to DayView as a prop.
        const routinePropArray = this.props.routine.map(dayRoutine => {
            return dayRoutine.map(sub => {
                return {
                    subjectCode: sub,
                    name: this.props.subjects[sub].name,
                    professor: ''
                };
            });
        });
        const tabs = WeekDays.slice(1).map((day, i) => {
            i++; // adjust index to account for ignoring Sunday.
            return (React.createElement(DayView, {tabLabel: day, onPress: this.props.subjectSelectHandler, subjects: routinePropArray[i], key: `tab_${day}`}));
        });
        return (React.createElement(View, {style: { flex: 1 }}, 
            React.createElement(StatusBar, {backgroundColor: STATUSBAR_COLOR, barStyle: "light-content"}), 
            React.createElement(ToolbarAndroid, {title: "Week View", titleColor: 'white', actions: [{ title: " View" }, { title: "Settings" }], style: stylesheet.toolbar}), 
            React.createElement(ScrollableTabView, {tabBarActiveTextColor: TEXT_COLOR, tabBarInactiveTextColor: TEXT_COLOR, tabBarUnderlineColor: TEXT_COLOR, tabBarBackgroundColor: BACKGROUND_COLOR, prerenderingSiblingsNumber: 1}, tabs)));
    }
}
const stylesheet = StyleSheet.create({
    "toolbar": {
        height: 50,
        backgroundColor: BACKGROUND_COLOR,
    }
});
