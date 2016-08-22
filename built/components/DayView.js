import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import SubjectTile from './SubjectTile';
export default class DayView extends React.Component {
    render() {
        return (React.createElement(View, {style: stylesheet["subject-tile-container"]}, React.createElement(SubjectTile, {professor: "Mahesh", subjectTitle: "Compiler Design", onPress: this.props.onPress})));
    }
}
const stylesheet = StyleSheet.create({
    "subject-tile-container": {
        height: 150,
        margin: 5
    }
});
