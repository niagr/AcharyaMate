import * as React from "react"
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
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import DayView from './DayView';
import { SubjectViewRedux as SubjectView } from './SubjectView';
import WeekView from './WeekView';
import { attendance, State } from "../reducers/main";


interface SubjectRecord {
    name: string;
}
type SubjectMap = {[subjectCode: string]: SubjectRecord}

type WeeklyRoutine = {[dayOfWeek: number]: string[]};


interface AppProps extends React.Props<AppBase> {
    records?: number[][][];
    subjects?: SubjectMap;
    routine?: WeeklyRoutine;
}


class AppBase extends React.Component<AppProps, any> {

    private interactionHandle = null;
    private _navigator: React.NavigatorStatic;
    private routes = [
        {title: 'week-view', index: 0},
        {title: 'subject-view', index: 1, subject: '10IS51'},
    ];

    constructor (props) {
        super(props);
        this.state = {
            showAll: false
        }
    }

    _onPress (navigator: React.NavigatorStatic, subject: string) {
        navigator.push({
            title: 'subject-view',
            subject
        });
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
                            subjectSelectHandler={(subject: string) => this._onPress(navigator, subject)}
                            subjects={this.props.subjects}
                            routine={this.props.routine as any}
                        />
                    
                );
            case 'subject-view':
                const subject = route.subject;
                // // Attendance record in the form of a 2D array indexed as [month][day]
                // const attRec = [0,1,2,3,4,5].map(month => {
                //     const foo = calcAttRecForMonth(subject, routine as string[][], this.props.records[month], month, 2016)
                //     // flatten hourly attendance into daily. 
                //     // Here we take any hour attended as 'attended all hours of that subject in the day'.
                //     const bar = foo.map(day => 
                //         day.indexOf(1) !== -1 ? 1 : 
                //         day.indexOf(0) !== -1 ? 0 : 
                //         -1
                //     );
                //     return bar;
                // });
                return (
                    <SubjectView
                        showPlaceholderForCostlyElements={!this.state.showAll}
                        subject={{
                            subjectCode: subject,
                            name: this.props.subjects[subject].name
                        }}
                    />
                );
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
            <Navigator
                initialRoute={this.routes[0]}
                configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
                sceneStyle={stylesheet.container}
                renderScene={(route, navigator) => this.navigatorRenderScene(route, navigator)}
                onDidFocus={(r) => this.onNavigatorDidFocus(r)}
            />
        );
    }
}

const AppBaseRedux = connect(
    (store: State)  => ({
        records: store.attRec,
        subjects: store.subjects,
        routine: store.routine
    })
)(AppBase);

export const App = (props) => (
    <Provider store={createStore(attendance)}>
        <AppBaseRedux/>
    </Provider>
)
    
const stylesheet = StyleSheet.create({
    "container": {
        flex: 1,
        alignItems: "stretch",
        // backgroundColor: 'red'
    } as any
});

