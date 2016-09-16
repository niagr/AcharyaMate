import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CalendarMonthView from './CalendarDayView';
import StaggeredListView from './StaggeredListView';
/**
 * Gets the absent days from daily attendance for the month
 *
 * @param attRec [month][day]
 * @returns
 */
function getAbsentDates(attRecByMonth) {
    return attRecByMonth.map(attByDay => {
        return attByDay.map((day, d) => day === 0 ? d : null).filter(d => d !== null);
    });
}
export default class SubjectView extends React.Component {
    render() {
        return (React.createElement(View, {style: [stylesheet['subject-view-container']]}, React.createElement(View, {style: stylesheet.headerContainer}, React.createElement(Text, {style: stylesheet.headerText}, this.props.subject)), !this.props.showPlaceholderForCostlyElements &&
            React.createElement(StaggeredListView, null, [0, 1, 2, 3, 4, 5].map(month => React.createElement(View, {key: `month${month}`, style: stylesheet.calenderContainer}, React.createElement(Text, {style: { fontWeight: '900', fontSize: 18, textAlign: 'center', lineHeight: 30 }}, SubjectView.months[month]), React.createElement(CalendarMonthView, {month: month, year: 2016, activeDays: this.props.attendanceRecord[month].map((day, d) => day === 0 ? d : null).filter(d => d !== null), activeDayColor: undefined}))))));
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
    },
    'headerContainer': {
        // backgroundColor: 'red',
        height: 60,
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    'headerText': {
        textAlign: 'center',
        fontSize: 24,
    }
});
