import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

const ReactD3 = require('react-d3-components');

class RouteProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            xScale: d3.scale.linear().range([0, 0]),
            yScale: d3.scale.linear().range([0, 0]),
            factor: 0
        };
    }

    static propTypes = {
        elevationData: React.PropTypes.array,
        details: React.PropTypes.object,
        showPoint: React.PropTypes.func,
        margin: React.PropTypes.object
    }

    static defaultProps = {
        elevationData: [],
        details: {},
        margin: { top: 10, bottom: 20, left: 40, right: 0 }
    }

    componentDidMount() {
        this.setDimensions();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.elevationData !== this.props.elevationData) {
            this.setDimensions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    setDimensions() {
        const width = document.getElementById('route-profile-container').clientWidth;
        const height = document.getElementById('route-profile-container').clientHeight;
        const factor = (this.props.elevationData.length > 0) 
            ? this.props.elevationData.length / (width - this.props.margin.left * 2)
            : 0;
        this.setState({ width, height, factor });
    }

    handleResize = (e) => {
        this.setDimensions();
    }

    makeData() {
        let distance = this.props.details.distance;
        if ((distance === undefined) || (this.props.elevationData.length === 0)) {
            return [{ label: 'Elevation', values: [{x: 0, y: 0 }] }];
        }
        let intervalDistance = distance / this.props.elevationData.length;
        return [{
            label: 'Elevation',
            values: this.props.elevationData.map((e, i) => { 
                return { x: intervalDistance * i, y: e }
            })
        }];
    }

    makeEventsLayerStyle(width, height) {
        return {
            height: height + "px",
            width: width + "px",
            bottom: this.props.margin.bottom + "px"
        };
    }

    handleMouseOver(e) {
        // console.log('Mouse over')
    }

    handleMouseOut(e) {
        this.props.showPoint(null);   // Hide the map point
    }

    handleMouseMove = (e) => {
        let x = e.clientX - this.props.margin.left;
        x = (x < 0) ? 0 : x;
        let index = Math.floor(x * this.state.factor);
        //let point = this.props.elevationData[index];
        this.props.showPoint(index);
    }

    render() {
        let width = this.state.width - this.props.margin.left - this.props.margin.right;
        let height = this.state.height - this.props.margin.top - this.props.margin.bottom;
        width = (width < 0) ? 0 : width;
        height = (height < 0) ? 0 : height;
        let eventsStyle = this.makeEventsLayerStyle(width, height);

        const AreaChart = ReactD3.AreaChart;
        let data = this.makeData();

        return (
            <div className="route-profile-container" id="route-profile-container">
                <AreaChart
                    data={data}
                    width={width}
                    height={height}
                    yOrientation='left'
                    margin={this.props.margin}
                    interpolate={"basis"}
                    xAxis={{innerTickSize: 10, label: "Distance (km) "}}
                    yAxis={{label: "Height (m) "}}
                />
                <div 
                    className="event-layer"
                    style={eventsStyle}
                    onMouseOver={this.handleMouseOver}
                    onMouseMove={this.handleMouseMove}
                >
                </div>
            </div>
        )
    }

}

export default RouteProfile;

// mouseOut(ev) {
// d3.selectAll('#focusLineX, #focusLabelX').attr('style', 'display: none');
