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


/**
 * Gets the absent days from daily attendance for the month
 * 
 * @param attRec [month][day]
 * @returns
 */
function getAbsentDates (attRecByMonth: number[][]): number[][] {
    return attRecByMonth.map(attByDay => {
        return attByDay.map((day, d) => day === 0 ? d : null).filter(d => d !== null);
    });
}


interface SubjectViewProps {
    showPlaceholderForCostlyElements: boolean;
    subject: string;
    attendanceRecord: number[][]; // [month][day]
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
                                    activeDays={
                                        this.props.attendanceRecord[month].map((day, d) => day === 0 ? d : null).filter(d => d !== null)
                                    }
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