import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CalendarMonthView } from './CalendarDayView';
import StaggeredListView from './StaggeredListView';
import { calcAttRecForMonth } from '../mock/data';
import { dateSelected } from "../actions";
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
class SubjectView extends React.Component {
    render() {
        // console.log('attendance record:', this.props.attendanceRecord)
        return (React.createElement(View, {style: [stylesheet['subject-view-container']]}, 
            React.createElement(View, {style: stylesheet.headerContainer}, 
                React.createElement(Text, {style: stylesheet.headerText}, this.props.subject.name)
            ), 
            !this.props.showPlaceholderForCostlyElements &&
                React.createElement(StaggeredListView, null, [0, 1, 2, 3, 4, 5].map(month => React.createElement(View, {key: `month${month}`, style: stylesheet.calenderContainer}, 
                    React.createElement(Text, {style: { fontWeight: '900', fontSize: 18, textAlign: 'center', lineHeight: 30 }}, SubjectView.months[month]), 
                    React.createElement(CalendarMonthView, {month: month, year: 2016, activeDays: this.props.attendanceRecord[month].map((day, d) => day === 0 ? d : null).filter(d => d !== null), disabledDays: this.props.attendanceRecord[month].map((day, d) => day === -1 ? d : null).filter(d => d !== null), activeDayColor: undefined, onDateSelected: day => this.props.onDateSelected(day, month)}))))));
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
export const SubjectViewRedux = connect((state, ownProps) => {
    console.log("mapStateToProps called");
    return {
        attendanceRecord: [0, 1, 2, 3, 4, 5].map(month => {
            const foo = calcAttRecForMonth(ownProps.subject.subjectCode, state.routine, state.attRec[month], month, 2016);
            // flatten hourly attendance into daily. 
            // Here we take any hour attended as 'attended all hours of that subject in the day'.
            const bar = foo.map(day => day.indexOf(1) !== -1 ? 1 :
                day.indexOf(0) !== -1 ? 0 :
                    -1);
            return bar;
        })
    };
}, (dispatch, ownProps) => ({
    onDateSelected: (day, month) => dispatch(dateSelected(ownProps.subject.subjectCode, day, month))
}))(SubjectView);
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
