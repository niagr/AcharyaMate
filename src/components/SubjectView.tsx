import * as React from "react";
import { 
    Text, 
    View, 
    StyleSheet
} from "react-native";
// TODO: convert to ES6 module import syntax
var Calendar = require('react-native-calendar-android');
interface SubjectViewProps {
    showPlaceholderForCostlyElements: boolean
}
interface SubjectViewState {
}
    
export default class SubjectView extends React.Component<SubjectViewProps, SubjectViewState> {
    render () {
        return (
            <View
                style={stylesheet['subject-view-container']}
            >
                <Text>Compiler Teri Ma ki bosdi ke</Text>
                {
                    this.props.showPlaceholderForCostlyElements ? (
                        <View>
                        </View>
                    ) : (
                        <Calendar
                            width={270}
                            topbarVisible={true}
                            arrowColor="#dafacd"
                            firstDayOfWeek="monday"
                            showDate="all"
                            currentDate={[ "2016/12/01" ]}
                            selectionMode="multiple"
                            selectionColor="#dadafc"
                            selectedDates={[ "2015/11/20", "2015/11/30", 1448745712382 ]}
                            onDateChange={(data) => {
                                console.log(data);
                            }} 
                        />
                    ) 
                }
            </View>
        )
    }
}
const stylesheet = StyleSheet.create({
    "subject-view-container": {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    }
});