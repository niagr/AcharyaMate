import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { data, MockData, SubjCode, Subject } from '../mock';
import SubjectTile from './SubjectTile'
interface DayViewProps {
    onPress: (...args: any[]) => any;
}
export default class DayView extends React.Component<DayViewProps, any> {
    render () {
        return (
            <View style={stylesheet["subject-tile-container"]} >
                <SubjectTile
                    professor="Mahesh"
                    subjectTitle="Compiler Design"
                    onPress={this.props.onPress}
                />
            </View>
        )
    }
}
const stylesheet = StyleSheet.create({
    "subject-tile-container": {
        height: 150,
        margin: 5
    }
});