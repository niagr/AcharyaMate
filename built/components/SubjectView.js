import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
// TODO: convert to ES6 module import syntax
var Calendar = require('react-native-calendar-android');
export default class SubjectView extends React.Component {
    render() {
        return (React.createElement(View, {style: stylesheet['subject-view-container']}, React.createElement(Text, null, "Compiler Teri Ma ki bosdi ke"), this.props.showPlaceholderForCostlyElements ? (React.createElement(View, null)) : (React.createElement(Calendar, {width: 270, topbarVisible: true, arrowColor: "#dafacd", firstDayOfWeek: "monday", showDate: "all", currentDate: ["2016/12/01"], selectionMode: "multiple", selectionColor: "#dadafc", selectedDates: ["2015/11/20", "2015/11/30", 1448745712382], onDateChange: (data) => {
            console.log(data);
        }}))));
    }
}
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    }
});
