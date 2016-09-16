import * as React from "react";
import { StyleSheet, Navigator, BackAndroid } from "react-native";
import SubjectView from './SubjectView';
import WeekView from './WeekView';
import { routine, calcAttRecForMonth } from '../mock/data';
import { subjects } from '../mock/subjects';
import { records } from '../mock/attendance-record';
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.interactionHandle = null;
        this.routes = [
            { title: 'week-view', index: 0 },
            { title: 'subject-view', index: 1, subject: '10IS51' },
        ];
        this.state = {
            showAll: false
        };
    }
    _onPress(navigator, subject) {
        navigator.push({
            title: 'subject-view',
            subject
        });
    }
    navigatorRenderScene(route, navigator) {
        if (!this._navigator) {
            this._navigator = navigator;
            BackAndroid.addEventListener('hardwareBackPress', () => {
                if (this._navigator.getCurrentRoutes().length === 1) {
                    return false;
                }
                this._navigator.pop();
                this.setState({ showAll: false });
                return true;
            });
        }
        switch (route.title) {
            case 'week-view':
                return (React.createElement(WeekView, {subjectSelectHandler: (subject) => this._onPress(navigator, subject), subjects: subjects, routine: routine}));
            case 'subject-view':
                const subject = route.subject;
                // Attendance record in the form of a 2D array indexed as [month][day]
                const attRec = [0, 1, 2, 3, 4, 5].map(month => {
                    const foo = calcAttRecForMonth(subject, routine, records[month], month, 2016);
                    // flatten hourly attendance into daily. 
                    // Here we take any hour attended as 'attended all hours of that subject in the day'.
                    const bar = foo.map(day => {
                        return (day.indexOf(1) !== -1 ? 1 :
                            day.indexOf(0) !== -1 ? 0 :
                                -1);
                    });
                    return bar;
                });
                return (React.createElement(SubjectView, {showPlaceholderForCostlyElements: !this.state.showAll, subject: subjects[route.subject].name, attendanceRecord: attRec}));
        }
    }
    onNavigatorDidFocus(route) {
        switch (route.title) {
            case 'subject-view': {
                this.setState({ showAll: true });
                break;
            }
        }
    }
    render() {
        return (React.createElement(Navigator, {initialRoute: this.routes[0], configureScene: () => Navigator.SceneConfigs.FloatFromBottomAndroid, style: stylesheet.container, renderScene: (route, navigator) => this.navigatorRenderScene(route, navigator), onDidFocus: (r) => this.onNavigatorDidFocus(r)}));
    }
}
const stylesheet = StyleSheet.create({
    "container": {
        flex: 1,
        alignItems: "stretch",
    }
});
