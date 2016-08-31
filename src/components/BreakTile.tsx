import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
interface BreakTileProps extends React.Props<BreakTile> {
    color?: string;
    text: string;
}
export default class BreakTile extends React.Component<BreakTileProps, any> {
    render () {
        return (
            <View>
                <View style={[style.container, this.props.color && {borderColor: this.props.color}]} >
                    <Text style={[style.text, this.props.color && {color: this.props.color}]} >{this.props.text}</Text>
                </View>
            </View>
        )
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
