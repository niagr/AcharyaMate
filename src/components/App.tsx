import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet, 
    ToolbarAndroid, 
    DrawerLayoutAndroid, 
    Navigator, 
    TouchableNativeFeedback, 
    BackAndroid, 
    InteractionManager 
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import DayView from './DayView';
import SubjectView from './SubjectView';
import WeekView from './WeekView';

import CalendarMonthView from './CalendarDayView';





export class App extends React.Component<any, any> {

    private interactionHandle = null;
    private _navigator: React.NavigatorStatic;
    private routes = [
        {title: 'week-view', index: 0},
        {title: 'subject-view', index: 1, subject: null},
    ];

    constructor (props) {
        super(props);
        this.state = {
            showAll: false
        }
    }

    _onPress (navigator: React.NavigatorStatic) {
        navigator.push(this.routes[1]);
    }

    navigatorRenderScene (route, navigator: React.NavigatorStatic) {
        if (!this._navigator) {
            this._navigator = navigator;
            BackAndroid.addEventListener('hardwareBackPress', () => {
                if (this._navigator.getCurrentRoutes().length === 1  ) {
                    return false;
                }
                this._navigator.pop();
                this.setState({showAll: false})
                return true;
            });
        }
        switch (route.title) {
            case 'week-view': 
                return (
                    <WeekView
                        subjectSelectHandler={(subject: string) => this._onPress(navigator)}
                    />
                )
            case 'subject-view':
                return (
                    <SubjectView
                        showPlaceholderForCostlyElements={!this.state.showAll}
                    />
                )
        }
        
    }

    onNavigatorDidFocus (route) {
        switch (route.title) {
            case 'subject-view': {
                this.setState({showAll: true});
                break;
            }
        }
    }

    render () {
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => 
                    <View>
                        <Text>Navigation Bitchez!!</Text>
                    </View>
                }>
                <Navigator
                    initialRoute={this.routes[0]}
                    configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
                    style={stylesheet.container}
                    renderScene={(route, navigator) => this.navigatorRenderScene(route, navigator)}
                    onDidFocus={(r) => this.onNavigatorDidFocus(r)}
                />
            </DrawerLayoutAndroid>
        );
    }
}
    
const stylesheet = StyleSheet.create({
    "container": {
        flex: 1,
        alignItems: "stretch"
    }
});