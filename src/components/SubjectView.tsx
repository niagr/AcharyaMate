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
    monthsListDataSource?: React.ListViewDataSource;
    renderTillIndex: number;
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
            renderTillIndex: 0
        };
    }

    componentDidMount () {
        // const handlerId = setInterval(() => {
        //     this.setState({renderTillIndex: this.state.renderTillIndex + 1});
        //     if (this.state.renderTillIndex >= 6)
        //         clearInterval(handlerId);            
        // }, 100);

        // setTimeout(() => {
            // this.setState({renderTillIndex: 5})
        // }, 200);

        // requestAnimationFrame(() => this.setState({renderTillIndex: this.state.renderTillIndex + 1}))
        
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.showPlaceholderForCostlyElements && !nextProps.showPlaceholderForCostlyElements) {
            this.renderContentProgressively();
        }
    }

    renderContentProgressively () {
        const tick = () => {
            this.setState({renderTillIndex: this.state.renderTillIndex + 1});
            this.state.renderTillIndex < 6 && requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    render () {
        return (
            <View
                style={[stylesheet['subject-view-container']]}
            >
                {
                // <ScrollView>
                // {this.props.showPlaceholderForCostlyElements ? <Text>Loading</Text> :
                    // [1,2,3,4,5,6].slice(0, this.state.renderTillIndex).map(month => 
                    //     <View key={`month${month}`} >
                    //         <Text style={{fontWeight:'800', textAlign: 'center', lineHeight: 30}} >{Object.keys(this.months)[month-1]}</Text>
                    //         <CalendarMonthView
                    //             month={month}
                    //             year={2016}
                    //         />
                    //     </View>
                    // )
                // }
                // </ScrollView>
                }
                {this.props.showPlaceholderForCostlyElements ? <Text>Loading bro</Text> :
                    <StaggeredListView>
                        {[1,2,3,4,5,6].map(month => 
                            <View key={`month${month}`} >
                                <Text style={{fontWeight:'800', textAlign: 'center', lineHeight: 30}} >{Object.keys(this.months)[month-1]}</Text>
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
    }
});