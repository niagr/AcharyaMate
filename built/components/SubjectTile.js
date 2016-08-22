import * as React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
export default class SubjectTile extends React.Component {
    // measureCustomAsync (callback: (x, y, w, h, px, py) => any) {
    //     (this.refs['container'] as any).measureLayout(findNodeHandle(this) , (...args) => {
    //         callback.apply(undefined, args);
    //     });
    // }
    getContainerView() {
        return this.refs['container'];
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return (React.createElement(TouchableNativeFeedback, {ref: 'container', style: [], onPress: this.props.onPress, background: TouchableNativeFeedback.SelectableBackground(), delayPressIn: 0}, React.createElement(View, {style: [
            stylesheet.container,
            this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }
        ]}, React.createElement(Text, {style: stylesheet.title}, this.props.subjectTitle), React.createElement(Text, {style: stylesheet.professorText}, "Prof. ", this.props.professor))));
    }
}
const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        elevation: 3,
        borderRadius: 2
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },
    professorText: {
        fontSize: 15,
        color: 'white'
    }
});
