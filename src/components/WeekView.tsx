import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet, 
    ToolbarAndroid
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DayView from './DayView';
// import {routine} from '../mock/data'
// import {subjects, SubjectMap} from '../mock/subjects'

const WeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const BACKGROUND_COLOR = '#800000';
const TEXT_COLOR = 'white';


interface WeekViewProps extends React.Props<WeekView> {
    subjectSelectHandler: (subject: string) => any;
    // children: React.Component<any, any>[] | React.Component<any, any>;
    routine: string[][];
    subjects: {[subjectCode: string] : {name: string;}}
}
interface WeekViewState {
}
export default class WeekView extends React.Component<WeekViewProps, WeekViewState> {
    render () {


        // convert our data to a form suiltable for passing to DayView as a prop.
        const routinePropArray = this.props.routine.map(dayRoutine => {
            return dayRoutine.map(sub => {
                // console.log(this.props.subjects);
                return {
                    name: this.props.subjects[sub].name,
                    professor: ''
                };
            });
        });

        const tabs =  WeekDays.map((day, i) => {
            return ( 
                <DayView  
                    tabLabel={day} 
                    onPress={this.props.subjectSelectHandler} 
                    subjects={routinePropArray[i]}
                    key={`tab_${day}`}
                />
            );
        })       


        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title="Week View"
                    titleColor='white'
                    actions={[{title: " View"}, {title: "Settings"}]}
                    style={stylesheet.toolbar}
                />
                <ScrollableTabView
                    tabBarActiveTextColor={TEXT_COLOR}
                    tabBarInactiveTextColor={TEXT_COLOR}
                    tabBarUnderlineColor={TEXT_COLOR}
                    tabBarBackgroundColor={BACKGROUND_COLOR}
                    prerenderingSiblingsNumber={1}
                >
                {
                    tabs
                }
                </ScrollableTabView>
            </View>
        )
    }
}


interface WeekViewStyles {
    toolbar: React.ViewStyle;
}


const stylesheet = StyleSheet.create<WeekViewStyles>({
    "toolbar": {
        height: 50,
        backgroundColor: BACKGROUND_COLOR,
        
    }
});