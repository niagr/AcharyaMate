import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CalendarMonthView from './CalendarDayView';
import StaggeredListView from './StaggeredListView';
export default class SubjectView extends React.Component {
    render() {
        return (React.createElement(View, {style: [stylesheet['subject-view-container']]}, this.props.showPlaceholderForCostlyElements ? React.createElement(Text, null, "Loading bro") :
            React.createElement(StaggeredListView, null, [0, 1, 2, 3, 4, 5].map(month => React.createElement(View, {key: `month${month}`, style: stylesheet.calenderContainer}, React.createElement(Text, {style: { fontWeight: '900', fontSize: 16, textAlign: 'center', lineHeight: 30 }}, SubjectView.months[month]), React.createElement(CalendarMonthView, {month: month, year: 2016}))))));
    }
}
SubjectView.months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June'
];
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "stretch"
    },
    'calenderContainer': {
        paddingVertical: 20
    }
});
