import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet
} from "react-native";
interface CalendarMonthViewProps extends React.Props<CalendarMonthView> {
    year: number;
    month: number
}
interface CalendarMonthViewState {
} 

type Month = 'January'|'February';

export type MonthMap = {[name:string]: number};

export default class CalendarMonthView extends React.Component<CalendarMonthViewProps, CalendarMonthViewState> {
    render () {
        
        const NUM_DAYS = new Date(this.props.year, this.props.month + 1, 0).getDate();
        const NUM_DAYS_IN_LAST_MONTH = new Date(this.props.year, this.props.month, 0).getDate();
        const STARTING_DAY = new Date(this.props.year, this.props.month, 1).getDay();
        const dayList: number[] = Array(42); // holds the numbers that are shown on the calendar in order (0-indexed)
        
        // fill last month's days
        for (let i = STARTING_DAY - 1, k = 0; i >= 0; i--, k++) {
            dayList[i] = NUM_DAYS_IN_LAST_MONTH - k;
        }
        
        // fill this month's days
        for (let i = STARTING_DAY, day = 1; day <= NUM_DAYS; i++, day++) {
            dayList[i] = day;
        }
        // fill next day's days
        for (let i = STARTING_DAY + NUM_DAYS, day = 1; i < 42; i++, day++) {
            dayList[i] = day;
        }

        const daysTextNodes = dayList.map((day, i) => {
            let color = 'grey';
            if (i < STARTING_DAY || i >= STARTING_DAY + NUM_DAYS)
                color = '#cccccc';
            return <View key={`row${i}`} style={stylesheet.dayTextContainer} ><Text style={{color}} >{day}</Text></View>
        });

//


        const columns = [0,1,2,3,4,5,6].map(i => [0,1,2,3,4,5].map(n => daysTextNodes[(n*7) + i]));

        const columnViews = columns.map((colDays, i) => <View key={i} style={stylesheet.columnContainer}>{colDays}</View>)

        return <View style={stylesheet.mainContainer}>{columnViews}</View>;


//



        let rows: any[] = [0,1,2,3,4,5].map(i => daysTextNodes.slice(i*7, (i+1)*7)) // split array up into smaller arrays for each week
        
        rows = rows.map((rowDays, i) => <View key={i} style={stylesheet.rowContainer}>{rowDays}</View>);


        return <View style={stylesheet.mainContainer}>{rows}</View>;
    }
}

const stylesheet = StyleSheet.create({
    'rowContainer': {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40        
    },
    'columnContainer': {
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    'mainContainer': {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: 250
    },
    'dayTextContainer': {
        width: 20,
        alignItems: 'center'
    },
    'otherMonthsDay': {
        color: 'grey'
    }
});