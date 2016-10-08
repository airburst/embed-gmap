import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

const ReactD3 = require('react-d3-components');

class RouteProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
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
        margin: { top: 20, bottom: 0, left: 20, right: 20 }
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
        return (
            <div className="route-profile-container" id="route-profile-container">
                <AreaChart
                    data={data}
                    width={width}
                    height={height}
                    yOrientation='right'
                    margin={this.props.margin}
                    interpolate={"basis"}
                />
            </div>
        )
    }

}

export default RouteProfile;

// React.render(<AreaChart
//                     data={data}
//                     width={400}
//                     height={400}
//                     margin={{top: 10, bottom: 50, left: 50, right: 10}}
//                     interpolate={"basis"}
//                     label={labelAccessor}
//                     x={xAccessor}
//                     y={yAccessor}
//                     values={valuesAccessor}
//                     tooltipHtml={tooltipArea}/>,
//     document.getElementById('areachart2')
//     );


// // Subscribe to changes in elevation observable 
// this.route = new RouteObserver(this.store);
// this.route.elevation$.subscribe((v) => {
//     this.data = this.addDistanceToData(flatten(v));
//     this.factor = this.data.length / this.chartWidth;
//     this.update();
// });
// //     }


// //     update() {
// this.hideSVG = (this.data.length === 0) ? true : false;
// let el: any = this.elementRef.nativeElement;
// let graph: any = d3.select(el);

// this.x = d3.scale.linear().range([0, this.chartWidth]);
// this.y = d3.scale.linear().range([this.chartHeight, 0]);
// this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
// this.yAxis = d3.svg.axis().scale(this.y).orient("left");
// this.x.domain(d3.extent(this.data, function(d) { return d[0]; }));
// this.y.domain([0, d3.max(this.data, function(d) { return +d[1]; })]);

// this.area = d3.svg.area()
//     .x(function(d) { return this.x(d[0]); })
//     .y0(this.chartHeight)
//     .y1(function(d) { return this.y(d[1]); })
//     .interpolate('basis');

// d3.select('.x.axis')
//     .attr('transform', 'translate(0,' + this.chartHeight + ')')
//     .call(this.xAxis);
// d3.select('.x.label')
//     .attr('x', this.chartWidth)
//     .attr('y', -10);
// d3.select('.y.axis').call(this.yAxis);
// d3.select('.y.label')
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", ".71em");

// let svg = graph.transition();

// if (this.data.length > 0) {
//     svg.select(".area").duration(this.transitionTime).attr("d", this.area(this.data));
//     svg.select(".x.axis").duration(this.transitionTime).call(this.xAxis);
//     svg.select(".y.axis").duration(this.transitionTime).call(this.yAxis);
// }
// //     }

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
                
// // }