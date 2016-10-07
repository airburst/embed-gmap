import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {timeStamp} from '../utils';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import NewUserDialog from './NewUserDialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// class App extends Component {
const App = React.createClass({

    propTypes: { 
        firebaseRef: React.PropTypes.object
    },

    getDefaultProps() {
        return { };
    },

    getInitialState: function () {
        return {
            route: {}
        };
    },

    componentWillMount: function () {
        this.getRouteFromFirebase();
    },

    getRouteFromFirebase: function () {
        console.log(this.props.firebaseRef);           //
        const route = this.props.firebaseRef.child('rhayadar-route');
        console.log(route);         //
        // this.setState({route: route});
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    render: function () {
        return (
            <MuiThemeProvider>
                <div role="main" id="main">
                    <Container />
                    <Toolbar />
                </div>
            </MuiThemeProvider>
        )
    }

});

export default App;
