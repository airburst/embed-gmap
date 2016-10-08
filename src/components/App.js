import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Container from './map/Container';
import {flatten} from '../utils';

// class App extends Component {
const App = React.createClass({

    propTypes: {
        firebaseRef: React.PropTypes.object
    },

    getDefaultProps() {
        return {};
    },

    getInitialState() {
        return { 
            route: [],
            elevation: [],
            details: {}
        }
    },

    componentWillMount() {
        let routeName = this.lastPathInUrl();
        if (routeName !== '') { this.getRouteFromFirebase(routeName); }
    },

    lastPathInUrl() {
        let parts = window.location.pathname.split('/');
        return parts[parts.length - 1];
    },

    getRouteFromFirebase(routeName) {
        const self = this;
        const route = this.props.firebaseRef.child(routeName);
        route.on("value", function (snapshot) {
            if (snapshot.val() !== null) {
                self.setState({ route: self.extractTrackData(snapshot.val().track) });
                self.setState({ elevation: flatten(snapshot.val().elevation) });
                self.setState({ details: snapshot.val().details });
            }
        });
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    extractTrackData(data) {
        let track = [];
        for (let d of data) { 
            if (d.track !== undefined) {
                track.push(d.track.map((pos) => { 
                    return { lat: pos.lat, lng: pos.lon }
                })); 
            }
        }
        return flatten(track);
    },

    render: function () {
        return (
            <div role="main" id="main">
                <Container 
                    route={this.state.route} 
                    elevation={this.state.elevation}
                    details={this.state.details}
                />
            </div>
        )
    }

});

export default App;
