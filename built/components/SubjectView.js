import * as React from "react";
import { Text, View, StyleSheet, ListView } from "react-native";
import CalendarMonthView from './CalendarDayView';
import StaggeredListView from './StaggeredListView';
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
            renderTillIndex: 0
        };
    }
    componentDidMount() {
        // const handlerId = setInterval(() => {
        //     this.setState({renderTillIndex: this.state.renderTillIndex + 1});
        //     if (this.state.renderTillIndex >= 6)
        //         clearInterval(handlerId);            
        // }, 100);
        // setTimeout(() => {
        // this.setState({renderTillIndex: 5})
        // }, 200);
        // requestAnimationFrame(() => this.setState({renderTillIndex: this.state.renderTillIndex + 1}))
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.showPlaceholderForCostlyElements && !nextProps.showPlaceholderForCostlyElements) {
            this.renderContentProgressively();
        }
    }
    renderContentProgressively() {
        const tick = () => {
            this.setState({ renderTillIndex: this.state.renderTillIndex + 1 });
            this.state.renderTillIndex < 6 && requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
    render() {
        return (React.createElement(View, {style: [stylesheet['subject-view-container']]}, this.props.showPlaceholderForCostlyElements ? React.createElement(Text, null, "Loading bro") :
            React.createElement(StaggeredListView, null, [1, 2, 3, 4, 5, 6].map(month => React.createElement(View, {key: `month${month}`}, React.createElement(Text, {style: { fontWeight: '800', textAlign: 'center', lineHeight: 30 }}, Object.keys(this.months)[month - 1]), React.createElement(CalendarMonthView, {month: month, year: 2016}))))));
    }
}
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "stretch"
    }
});
