import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from './lib/GoogleApi';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';
import RouteProfile from './RouteProfile';

export class Container extends React.Component {
    
    componentDidMount() {
        this.setState({
            selectedPoint: null
        });
    }

    showPoint = (index) => {
        // this.setState({ selectedPoint: index });     // Triggers map reload!
    }

    render() {
        let route = [...this.props.route];
        let elevation = [...this.props.elevation];
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        let start = route[0];
        let end = route[route.length - 1];

        return (
            <div id="map-container" ref="container">
                <Map 
                    google={this.props.google} 
                    path={route}
                    selectedPoint={this.state.selectedPoint}>
                </Map>
                <RouteProfile 
                    elevationData={elevation}
                    details={this.props.details}
                    showPoint={this.showPoint}
                />
            </div>
        )
    }

};

export default GoogleApiComponent({
    apiKey: 'AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE',
    libraries: ['geometry']
})(Container);
