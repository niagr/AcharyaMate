import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  InteractionManager
} from 'react-native';

interface SubjectTileProps extends React.Props<SubjectTile> {
    subjectTitle: string;
    professor: string;
    backgroundColor?: string;
    onPress?: () => void;
}

export default class SubjectTile extends React.Component<SubjectTileProps, any> {

    getContainerView () {
        return this.refs['container'];
    }
    
    _onPress () {
        // InteractionManager.runAfterInteractions(() => this.props.onPress());
        this.props.onPress()
    }

    render () {
        return (
            <TouchableNativeFeedback
                ref='container'   
                style={[  
                    // stylesheet.container, 
                    // this.props.backgroundColor && {backgroundColor: this.props.backgroundColor},
                ]}
                onPress={this._onPress.bind(this)}
                background={TouchableNativeFeedback.Ripple('#00000033', false)}
                delayPressIn={0}
            >
                <View 
                    style={[
                        stylesheet.container,
                        this.props.backgroundColor && {backgroundColor: this.props.backgroundColor}
                    ]} >
                    <Text style={stylesheet.title}>{this.props.subjectTitle}</Text>
                    <Text style={stylesheet.professorText}>Prof. {this.props.professor}</Text>
                </View>
            </TouchableNativeFeedback>
        )
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
    title : {
        textAlign: 'center',
        fontSize: 30,
        color: 'grey'
    } as any,
    professorText: {
        fontSize: 15,
        color: 'grey'
    }
});
