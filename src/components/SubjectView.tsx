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
import StaggeredListView from './StaggeredListView';
import * as Util from '../Util';

interface SubjectViewProps {
    showPlaceholderForCostlyElements: boolean;
    subject: string;
    
}
interface SubjectViewState {
}
    
export default class SubjectView extends React.Component<SubjectViewProps, SubjectViewState> {

    static months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June'
    ]

    render () {
        return (
            <View
                style={[stylesheet['subject-view-container']]}
            >
                <View style={stylesheet.headerContainer} >
                    <Text style={stylesheet.headerText} >{this.props.subject}</Text>
                </View>
                {!this.props.showPlaceholderForCostlyElements &&
                    
                    <StaggeredListView>
                        {[0,1,2,3,4,5].map(month => 
                            <View key={`month${month}`} style={stylesheet.calenderContainer} >
                                <Text style={{fontWeight:'900',fontSize: 18 , textAlign: 'center', lineHeight: 30}} >{SubjectView.months[month]}</Text>
                                <CalendarMonthView
                                    month={month}
                                    year={2016}
                                    activeDays={Util.makeRandomNumberArray(5, 30)}
                                    activeDayColor={undefined}
                                />
                            </View>
                        )}
                    </StaggeredListView>
                }
            
            </View>
        )
    }
}
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "stretch"
    },
    'calenderContainer': {
        paddingVertical: 20
    },
    'headerContainer': {
        // backgroundColor: 'red',
        height: 60,
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    'headerText': {
        textAlign: 'center',
        fontSize: 24,
        // fontWeight: 'bold'
    }
});