import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {timeStamp} from '../utils';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// class App extends Component {
const App = React.createClass({

    propTypes: {
        firebaseRef: React.PropTypes.object
    },

    getDefaultProps() {
        return {};
    },

    getInitialState() {
        return { route: [] }
    },

    componentWillMount: function () {
        this.getRouteFromFirebase();
    },

    getRouteFromFirebase: function () {
        const self = this;
        const route = this.props.firebaseRef.child('rhayadar-route');
        route.on("value", function (snapshot) {
            self.setState({ route: snapshot.val().track[0].track });
        }, function (errorObject) {
            console.log("No route found..." + errorObject.code);
        });
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    render: function () {
        return (
            <MuiThemeProvider>
                <div role="main" id="main">
                    <Container route={this.state.route}/>
                    <Toolbar />
                </div>
            </MuiThemeProvider>
        )
    }

});

export default App;
