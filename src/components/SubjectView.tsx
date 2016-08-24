import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    ListView,
    InteractionManager
} from "react-native";
// TODO: convert to ES6 module import syntax
// import Calendar = require('react-native-calendar-android');

import CalendarMonthView, {MonthMap} from './CalendarDayView';

interface SubjectViewProps {
    showPlaceholderForCostlyElements: boolean
}
interface SubjectViewState {
    monthsListDataSource?: React.ListViewDataSource;
    renderTillIndex: number;
    foo: boolean;
}
    
export default class SubjectView extends React.Component<SubjectViewProps, SubjectViewState> {

    private months:{[monthName: string]: number[]} = {
        'January': [0],
        'February': [1],
        'March': [2],
        'April': [3],
        'May': [4],
        'June': [5]
    } 

    constructor () {
        super();
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

    componentDidMount () {
        const handlerId = setInterval(() => {
            this.setState({renderTillIndex: this.state.renderTillIndex + 1, foo: true});
            if (this.state.renderTillIndex >= 6)
                clearInterval(handlerId);            
        }, 300);
        
    }

    render () {
        return (
            <View
                style={stylesheet['subject-view-container']}
            >
                <ScrollView>
                {
                    [1,2,3,4,5,6].slice(0, this.state.renderTillIndex).map(month => 
                        <View>
                            <Text style={{fontWeight:'800', textAlign: 'center', lineHeight: 30}} >{Object.keys(this.months)[month-1]}</Text>
                            <CalendarMonthView
                                month={month}
                                year={2016}
                            />
                        </View>
                    )
                }
                </ScrollView>

                <Text>ha</Text>
                
            </View>
        )
    }
}
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "stretch"
    }
});