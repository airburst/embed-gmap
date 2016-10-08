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
            yScale: d3.scale.linear().range([0, 0])
        };
    }

    static propTypes = {
        elevationData: React.PropTypes.array,
        details: React.PropTypes.object,
        margin: React.PropTypes.object
    }

    static defaultProps = {
        elevationData: [],
        details: {},
        margin: { top: 10, bottom: 20, left: 40, right: 0 }
    }

    handleResize = (e) => {
        this.setState({
            width: document.getElementById('route-profile-container').clientWidth,
            height: document.getElementById('route-profile-container').clientHeight
        });
    }

    componentDidMount() {
        const height = document.getElementById('route-profile-container').clientHeight;
        const width = document.getElementById('route-profile-container').clientWidth;
        this.setState({ height, width });
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    makeData() {
        let distance = this.props.details.distance;
        if ((distance === undefined) || (this.props.elevationData.length === 0)) {
            return [{ label: 'Elevation', values: [{x: 0, y: 0 }] }];
        }
        let intervalDistance = distance / this.props.elevationData.length;
        return [{
            
            values: this.props.elevationData.map((e, i) => { 
                return { x: intervalDistance * i, y: e }
            })
        }];
    }

    render() {
        let width = this.state.width - this.props.margin.left - this.props.margin.right;
        let height = this.state.height - this.props.margin.top - this.props.margin.bottom;
        width = (width < 0) ? 0 : width;
        height = (height < 0) ? 0 : height;

        const AreaChart = ReactD3.AreaChart;
        let data = this.makeData();
        let factor = data.length / width;

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
            </div>
        )
    }

}

export default RouteProfile;

//                     x={xAccessor}
//                     y={yAccessor}
//                     values={valuesAccessor}
//                     tooltipHtml={tooltipArea}


// //     mouseMove(ev) {
// let x = ev.clientX - this.margin.left,
//     labelOffset = 10,
//     labelRightBuffer = this.labelBox.width,
//     labelX = ((x + labelOffset) < (this.chartWidth - labelRightBuffer)) ? 
//         (x + labelOffset) : 
//         (x - labelRightBuffer - labelOffset),
//     labelY = (this.chartHeight / 2),
//     index = Math.floor(x * this.factor),
//     point = this.data[index],
//     elevationText = 'Elevation: ' + point[1].toFixed(1),    //TODO: catch errors when no point
//     distanceText = 'Distance: ' + point[0].toFixed(1);

// // Draw the line and details box
// d3.select('#focusLineX')
//     .attr('x1', x).attr('y1', 0)
//     .attr('x2', x).attr('y2', this.chartHeight);
// d3.select('#focusLabelX').attr('transform', 'translate(' + labelX + ',' + labelY + ')');
// d3.select('#elevation-text').text(elevationText);
// d3.select('#distance-text').text(distanceText);

// // Update the selected point (for route spot display)
// this.store.dispatch({
//     type: UPDATE_DETAILS,
//     payload: { selectedPointIndex: index }
// });
// //     }
    
// //     mouseOut(ev) {
// d3.selectAll('#focusLineX, #focusLabelX').attr('style', 'display: none');

// // Reset the selected point
// this.store.dispatch({
//     type: UPDATE_DETAILS,
//     payload: { selectedPointIndex: -1 }
// });
// //     }
    
// //     mouseOver(ev) {
// d3.selectAll('#focusLineX, #focusLabelX').attr('style', 'display: null');
// //     }
                