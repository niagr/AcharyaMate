import * as React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
export default class SubjectTile extends React.Component {
    getContainerView() {
        return this.refs['container'];
    }
    _onPress() {
        // InteractionManager.runAfterInteractions(() => this.props.onPress());
        this.props.onPress();
    }
    render() {
        return (React.createElement(TouchableNativeFeedback, {ref: 'container', style: [], onPress: this._onPress.bind(this), background: TouchableNativeFeedback.Ripple('#00000033', false), delayPressIn: 0}, 
            React.createElement(View, {style: [
                stylesheet.container,
                this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }
            ]}, 
                React.createElement(Text, {style: stylesheet.title}, this.props.subjectTitle), 
                React.createElement(Text, {style: stylesheet.professorText}, 
                    "Prof. ", 
                    this.props.professor))
        ));
    }
}
const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 2
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: 'grey'
    },
    professorText: {
        fontSize: 15,
        color: 'grey'
    }
});
