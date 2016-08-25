import * as React from 'react';
import { ScrollView } from 'react-native';
export default class StaggeredListView extends React.Component {
    constructor() {
        super();
        this.state = {
            renderIndex: 0
        };
    }
    componentDidMount() {
        const tick = () => {
            this.setState({ renderIndex: this.state.renderIndex + 1 });
            (this.state.renderIndex < React.Children.toArray(this.props.children).length) && requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
    render() {
        return (React.createElement(ScrollView, null, React.Children.toArray(this.props.children).slice(0, this.state.renderIndex)));
    }
}
