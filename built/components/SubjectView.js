import * as React from "react";
import { Text, View, StyleSheet, ScrollView, ListView } from "react-native";
import CalendarMonthView from './CalendarDayView';
export default class SubjectView extends React.Component {
    constructor() {
        super();
        this.months = {
            'January': [0],
            'February': [1],
            'March': [2],
            'April': [3],
            'May': [4],
            'June': [5]
        };
        const dataSrc = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            monthsListDataSource: dataSrc.cloneWithRowsAndSections(this.months),
            renderTillIndex: 0,
            foo: false
        };
    }
    componentDidMount() {
        const handlerId = setInterval(() => {
            this.setState({ renderTillIndex: this.state.renderTillIndex + 1, foo: true });
            if (this.state.renderTillIndex >= 6)
                clearInterval(handlerId);
        }, 300);
    }
    render() {
        return (React.createElement(View, {style: stylesheet['subject-view-container']}, React.createElement(ScrollView, null, [1, 2, 3, 4, 5, 6].slice(0, this.state.renderTillIndex).map(month => React.createElement(View, null, React.createElement(Text, {style: { fontWeight: '800', textAlign: 'center', lineHeight: 30 }}, Object.keys(this.months)[month - 1]), React.createElement(CalendarMonthView, {month: month, year: 2016})))), React.createElement(Text, null, "ha")));
    }
}
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "stretch"
    }
});
