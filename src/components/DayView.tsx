import * as React from 'react';
import { 
    View, 
    StyleSheet,
    ScrollView 
} from 'react-native';
import SubjectTile from './SubjectTile'

interface Subject {
    // subjectCode: string;
    name: string;
    professor: string;
}

interface DayViewProps {
    onPress?: (...args: any[]) => any;
    subjects: Subject[];
}

export default class DayView extends React.Component<DayViewProps, any> {
    render () {
        return (
            <ScrollView
                contentContainerStyle={stylesheet.scrollViewContainer}
            >
                {this.props.subjects.map((sub, i) =>
                    <View style={stylesheet.subjectTileContainer} key={`tile${i}`} >
                        <SubjectTile
                            professor={sub.professor}
                            subjectTitle={sub.name}
                            onPress={this.props.onPress}
                        />
                    </View>
                )}
            </ScrollView>
        )
    }
}

interface DayViewStyles {
    subjectTileContainer: React.ViewStyle;
    scrollViewContainer: React.ViewStyle;
}
const stylesheet = StyleSheet.create<DayViewStyles>({
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