import React from 'react';
import { Route, Switch } from 'react-router-dom';

class SwitchWithLocation extends React.Component {
    render() {
        const { location } = this.props;

        return (
            <Switch location={location}>
                {this.props.children}
            </Switch>
        );
    }
}

export default SwitchWithLocation;