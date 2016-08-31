import * as React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

interface StaggeredListViewProps extends React.Props<StaggeredListView> {

}

interface StaggeredListViewState {
    renderIndex: number;    // The index till which items are currently rendered.
}

export default class StaggeredListView extends React.Component<StaggeredListViewProps, StaggeredListViewState> {
    constructor () {
        super();
        this.state = {
            renderIndex: 0
        };
    }

    componentDidMount () {
        const tick = () => {
            this.setState({renderIndex: this.state.renderIndex + 1});
            (this.state.renderIndex < React.Children.toArray(this.props.children).length) && requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    render () {
        return (
            <ScrollView>
                {React.Children.toArray(this.props.children).slice(0, this.state.renderIndex)}
            </ScrollView>
        );
    }

}