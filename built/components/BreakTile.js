import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class BreakTile extends React.Component {
    render() {
        return (React.createElement(View, null, 
            React.createElement(View, {style: [style.container, this.props.color && { borderColor: this.props.color }]}, 
                React.createElement(Text, {style: [style.text, this.props.color && { color: this.props.color }]}, this.props.text)
            )
        ));
    }
}
const style = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        borderWidth: 2,
        borderColor: '#b3b3b3ff',
        borderStyle: 'dashed',
        borderRadius: 0.1,
        marginVertical: 7,
        alignItems: 'center'
    },
    text: {
        color: '#b3b3b3ff',
        fontSize: 40
    }
});
