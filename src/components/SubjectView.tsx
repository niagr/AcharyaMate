import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    ListView,
    InteractionManager
} from "react-native";
import { connect } from "react-redux";
// TODO: convert to ES6 module import syntax
// import Calendar = require('react-native-calendar-android');

import {CalendarMonthView, MonthMap} from './CalendarDayView';
import StaggeredListView from './StaggeredListView';
import * as Util from '../Util';
import {calcAttRecForMonth} from '../mock/data';
import { State } from '../reducers/main';
import { dateSelected } from "../actions/index";


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
    subject: {
        subjectCode: string
        name: string;
    };
    attendanceRecord?: number[][]; // [month][day]
    onDateSelected?: (day, month) => any;
}
interface SubjectViewState {
}
    
class SubjectView extends React.Component<SubjectViewProps, SubjectViewState> {

    static months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June'
    ]

    render () {
        // console.log('attendance record:', this.props.attendanceRecord)
        return (
            <View
                style={[stylesheet['subject-view-container']]}
            >
                <View style={stylesheet.headerContainer} >
                    <Text style={stylesheet.headerText} >{this.props.subject.name}</Text>
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
                                    disabledDays={this.props.attendanceRecord[month].map((day, d) => day === -1 ? d : null).filter(d => d !== null)}
                                    activeDayColor={undefined}
                                    onDateSelected={day => this.props.onDateSelected(day, month)}
                                />
                            </View>
                        )}
                    </StaggeredListView>
                }
            
            </View>
        )
    }
}

export const SubjectViewRedux = connect(
    (state: State, ownProps: SubjectViewProps) => {
        console.log("mapStateToProps called");
        return {
            attendanceRecord: 
                [0,1,2,3,4,5].map(month => {
                    const foo = calcAttRecForMonth(ownProps.subject.subjectCode, state.routine as string[][], state.attRec[month], month, 2016)
                    // flatten hourly attendance into daily. 
                    // Here we take any hour attended as 'attended all hours of that subject in the day'.
                    const bar = foo.map(day => 
                        day.indexOf(1) !== -1 ? 1 : 
                        day.indexOf(0) !== -1 ? 0 : 
                        -1
                    );
                    return bar;
                })
        }
    },
    (dispatch, ownProps: SubjectViewProps) => ({
        onDateSelected: (day, month) => dispatch(dateSelected(ownProps.subject.subjectCode, day, month))
    })
)(SubjectView);


const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "stretch"
    } as any,
    'calenderContainer': {
        paddingVertical: 20
    },
    'headerContainer': {
        // backgroundColor: 'red',
        height: 60,
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#dddddd'
    } as any,
    'headerText': {
        textAlign: 'center',
        fontSize: 24,
        // fontWeight: 'bold'
    } as any
});