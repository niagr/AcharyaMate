import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SubjectTile from './SubjectTile';
export default class DayView extends React.Component {
    render() {
        return (React.createElement(ScrollView, {contentContainerStyle: stylesheet.scrollViewContainer}, this.props.subjects.map((sub, i) => React.createElement(View, {style: stylesheet.subjectTileContainer, key: `tile${i}`}, React.createElement(SubjectTile, {professor: sub.professor, subjectTitle: sub.name, onPress: this.props.onPress})))));
    }
}
const stylesheet = StyleSheet.create({
    subjectTileContainer: {
        height: 150,
        margin: 5,
        flex: 1,
        marginTop: 20
    },
    scrollViewContainer: {
        backgroundColor: '#cccccc'
    }
});
