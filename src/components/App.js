import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Container from './map/Container';

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

    componentWillMount: function () {
        this.getRouteFromFirebase();
    },

    getRouteFromFirebase: function () {
        const self = this;
        const route = this.props.firebaseRef.child('rhayadar-route');
        route.on("value", function (snapshot) {
            self.setState({ route: snapshot.val().track[0].track });
            self.setState({ elevation: snapshot.val().elevation[0] });
            self.setState({ details: snapshot.val().details });
        }, function (errorObject) {
            console.log("No route found..." + errorObject.code);
        });
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
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
