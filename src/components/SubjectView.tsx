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

interface SubjectViewProps {
    showPlaceholderForCostlyElements: boolean
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
                {this.props.showPlaceholderForCostlyElements ? <Text>Loading bro</Text> :
                    <StaggeredListView>
                        {[0,1,2,3,4,5].map(month => 
                            <View key={`month${month}`} style={stylesheet.calenderContainer} >
                                <Text style={{fontWeight:'900',fontSize: 16 , textAlign: 'center', lineHeight: 30}} >{SubjectView.months[month]}</Text>
                                <CalendarMonthView
                                    month={month}
                                    year={2016}
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
    }
});