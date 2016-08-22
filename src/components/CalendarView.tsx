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
    }
}
