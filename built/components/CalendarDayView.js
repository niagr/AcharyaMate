import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
export default class CalendarMonthView extends React.Component {
    constructor() {
        super();
        this.state = {
            activeDays: []
        };
    }
    _onDateSelected(day) {
        const oldActiveDays = this.state.activeDays;
        let i;
        this.setState({
            activeDays: (i = oldActiveDays.indexOf(day)) === -1 ?
                oldActiveDays.concat(day) :
                oldActiveDays.slice(0, i).concat(oldActiveDays.slice(i + 1))
        });
        this.props.onDateSelected && this.props.onDateSelected(day);
    }
    render() {
        const NUM_DAYS = new Date(this.props.year, this.props.month + 1, 0).getDate();
        const NUM_DAYS_IN_LAST_MONTH = new Date(this.props.year, this.props.month, 0).getDate();
        const STARTING_DAY = new Date(this.props.year, this.props.month, 1).getDay();
        const dayList = Array(42); // holds the numbers that are shown on the calendar in order (0-indexed)
        // fill last month's days
        for (let i = STARTING_DAY - 1, k = 0; i >= 0; i--, k++) {
            dayList[i] = NUM_DAYS_IN_LAST_MONTH - k;
        }
        // fill this month's days
        for (let i = STARTING_DAY, day = 1; day <= NUM_DAYS; i++, day++) {
            dayList[i] = day;
        }
        // fill next day's days
        for (let i = STARTING_DAY + NUM_DAYS, day = 1; i < 42; i++, day++) {
            dayList[i] = day;
        }
        const daysTextNodes = dayList.map((day, i) => {
            let color = 'grey';
            let onPress = null;
            let backgroundColor;
            if (i < STARTING_DAY || i >= STARTING_DAY + NUM_DAYS) {
                color = '#cccccc';
            }
            else {
                if (this.state.activeDays.indexOf(day) !== -1) {
                    color = 'white';
                    backgroundColor = this.props.activeDayColor || 'red';
                }
                onPress = () => this._onDateSelected(day);
            }
            return React.createElement(Text, {style: [stylesheet.dayText, { color, backgroundColor }], onPress: onPress}, day);
        });
        // Change color of selected days
        // if (this.state.activeDays) {
        //     for (let day of this.state.activeDays) {
        //         daysTextNodes[day] = <Text style={{color: this.props.activeDayColor || 'red'}} >{day}</Text>
        //     }
        // }
        //
        const columns = [0, 1, 2, 3, 4, 5, 6].map(i => [0, 1, 2, 3, 4, 5].map(n => daysTextNodes[(n * 7) + i]));
        const columnViews = columns.map((colDays, i) => React.createElement(View, {key: i, style: stylesheet.columnContainer}, colDays));
        return React.createElement(View, {style: stylesheet.mainContainer}, columnViews);
        //
        let rows = [0, 1, 2, 3, 4, 5].map(i => daysTextNodes.slice(i * 7, (i + 1) * 7)); // split array up into smaller arrays for each week
        rows = rows.map((rowDays, i) => React.createElement(View, {key: i, style: stylesheet.rowContainer}, rowDays));
        return React.createElement(View, {style: stylesheet.mainContainer}, rows);
    }
}
const stylesheet = StyleSheet.create({
    'rowContainer': {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40
    },
    'columnContainer': {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    'mainContainer': {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: 250,
    },
    'dayTextContainer': {
        width: 20,
        height: 20,
        alignItems: 'center'
    },
    'dayText': {
        height: 30,
        // lineHeight: 30,
        width: 30,
        // backgroundColor: 'yellow',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 30
    },
    'otherMonthsDay': {
        color: 'grey'
    }
});
