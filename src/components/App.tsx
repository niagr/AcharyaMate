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
var Calendar = require('react-native-calendar-android');
export class App extends React.Component<any, any> {
    constructor (props) {
        super(props);
        this.state = {
            showAll: false
        }
    }
    _onPress (navigator: React.NavigatorStatic) {
        console.log(navigator.getCurrentRoutes())
        navigator.push(this.routes[1]);
        InteractionManager.runAfterInteractions(() => this.setState({showAll: true}))
    }
    private _navigator: React.NavigatorStatic;
    
    private routes = [
        {title: 'week-view', index: 0},
        {title: 'subject-view', index: 1, subject: null},
    ];
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
                    initialRouteStack={this.routes}
                    configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
                    style={stylesheet.container}
                    renderScene={(route, navigator) => this.navigatorRenderScene(route, navigator)}
                    
                />
            </DrawerLayoutAndroid>
        );
    }
}
    
const stylesheet = StyleSheet.create({
    "container": {
        flex: 1,
        // alignItems: "center"
    }
});