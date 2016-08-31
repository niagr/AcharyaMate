import * as React from "react";
import { StyleSheet, Navigator, BackAndroid } from "react-native";
import SubjectView from './SubjectView';
import WeekView from './WeekView';
import { routine } from '../mock/data';
import { subjects } from '../mock/subjects';
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.interactionHandle = null;
        this.routes = [
            { title: 'week-view', index: 0 },
            { title: 'subject-view', index: 1, subject: null },
        ];
        this.state = {
            showAll: false
        };
    }
    _onPress(navigator) {
        navigator.push(this.routes[1]);
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
                return (React.createElement(WeekView, {subjectSelectHandler: (subject) => this._onPress(navigator), subjects: subjects, routine: routine}));
            case 'subject-view':
                return (React.createElement(SubjectView, {showPlaceholderForCostlyElements: !this.state.showAll, subject: 'Compiler Design'}));
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
        alignItems: "stretch"
    }
});
