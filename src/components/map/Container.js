import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from './lib/GoogleApi';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import RouteProfile from './RouteProfile';

export class Container extends React.Component {
    
    componentDidMount() {
        this.setState({
            // showingInfoWindow: false,
            // activeMarker: {},
            // selectedPlace: {},
            selectedPoint: null
        });
    }

    // onMarkerClick(props, marker, e) {
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    // }

    showPoint = (index) => {
        // this.setState({ selectedPoint: index });     // Triggers map reload!
    }

    render() {
        let route = [...this.props.route];
        let elevation = [...this.props.elevation];
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        // let markers = path.map((l) => {
        //     return (<div/>)
        //     // return (
        //     //     <Marker
        //     //         key = {l.key}
        //     //         name={l.name}
        //     //         position={l.position}
        //     //         color={l.color} />
        //     // )
        // });
        let path = route.map((l) => { return l; });
        return (
            <div id="map-container" ref="container">
                <Map 
                    google={this.props.google} 
                    path={path}
                    selectedPoint={this.state.selectedPoint} 
                />
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
