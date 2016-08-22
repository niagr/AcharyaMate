import * as React from "react";
import { Text, View, StyleSheet, DrawerLayoutAndroid, Navigator, BackAndroid, InteractionManager } from "react-native";
import SubjectView from './SubjectView';
import WeekView from './WeekView';
var Calendar = require('react-native-calendar-android');
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.routes = [
            { title: 'week-view', index: 0 },
            { title: 'subject-view', index: 1, subject: null },
        ];
        this.state = {
            showAll: false
        };
    }
    _onPress(navigator) {
        console.log(navigator.getCurrentRoutes());
        navigator.push(this.routes[1]);
        InteractionManager.runAfterInteractions(() => this.setState({ showAll: true }));
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
                return (React.createElement(WeekView, {subjectSelectHandler: (subject) => this._onPress(navigator)}));
            case 'subject-view':
                return (React.createElement(SubjectView, {showPlaceholderForCostlyElements: !this.state.showAll}));
        }
    }
    render() {
        return (React.createElement(DrawerLayoutAndroid, {drawerWidth: 300, drawerPosition: DrawerLayoutAndroid.positions.Left, renderNavigationView: () => React.createElement(View, null, React.createElement(Text, null, "Navigation Bitchez!!"))}, React.createElement(Navigator, {initialRoute: this.routes[0], initialRouteStack: this.routes, configureScene: () => Navigator.SceneConfigs.FloatFromBottomAndroid, style: stylesheet.container, renderScene: (route, navigator) => this.navigatorRenderScene(route, navigator)})));
    }
}
const stylesheet = StyleSheet.create({
    "container": {
        flex: 1,
    }
});
