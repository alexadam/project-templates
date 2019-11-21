import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends React.Component {
    componentDidUpdate = () => this.renderAxis()
    componentDidMount = () => this.renderAxis()

    renderAxis = () => {
        let node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    }

    render = () => {
        let translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""}></g>
        );
    }

};

class SVGShadow extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => (
        <filter id={this.props.id} x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx={this.props.dx} dy={this.props.dy} />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation={this.props.stdDev} />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
    )
}

class SVGGradient extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => (
        <linearGradient id={this.props.id} x1="0" x2="0" y1="0" y2="100%">
           <stop stopColor="red" offset="0%"/>
           <stop stopColor="white" offset="20%" stopOpacity='1'/>
           <stop stopColor="white" offset="80%" stopOpacity='1'/>
           <stop stopColor="blue" offset="100%"/>
         </linearGradient>
    )
}

export default class Graph2D extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
    }


    render = () =>  {
        let width = this.props.width; // domNode.clientWidth;
        let height = this.props.height; // domNode.clientHeight;

        let data = this.props.data;

        let margin = {
            top: 5,
            right: 50,
            bottom: 20,
            left: 50
        };
        let w = width - (margin.left + margin.right);
        let h = height - 20 - (margin.top + margin.bottom);

        let x = d3.scaleLinear().range([0, w]);
        let y = d3.scaleLinear().range([h, 0]);

        // x.domain(d3.extent(data, (d, i) => d.x));
        // y.domain(d3.extent(data, (d, i) => d.y));
        x.domain([0, d3.max(data, (d, i) => d.x - 1)]);
        y.domain([0, d3.max(data, (d) => d.y)]);

        d3.max(data, (d) => d.y)

        let line = d3.line()
            .x((d, i) => x(i))
            .y((d) => y(d.y))

        let area = d3.area()
            .x((d, i) => x(i))
            .y1((d) => y(d.y))
            .curve(d3.curveCardinal);
        area.y0(y(0));


        let transformGraph = 'translate(' + (margin.left) + ',' + (-margin.top + 25)+ ')';
        let transformYAxis = 'translate(' + (margin.left) + ',' + (margin.top + 10) + ')';
        let transformXAxis = 'translate(' + margin.left + ',' + (margin.top) + ')';

        let axisBottom = d3.axisBottom(x).tickFormat((d, i) => i);
        let axisLeft = d3.axisLeft(y);//.tickFormat((d, i) => data[i]);

        let fill = this.props.bgColor;
        if (fill === 'gradient') {
            fill = 'url(#gradient1)';
        }

        return (
            <div ref={element => this.divRef = element}>
                <svg id={this.props.chartId} width={width} height={height}>
                    <defs>
                        <SVGShadow id='shadow1' dx='5' dy='5' stdDev='10' key="def1"/>
                        <SVGGradient id='gradient1' key="def2" />
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" rx='5' ry='5' fill='#58779D' fillOpacity='0.5'/>
                    <g transform={transformGraph} fill={fill} filter="url(#shadow1)" fillOpacity='0.25'>
                        <path className="line shadow" d={area(data)} strokeLinecap="round" />
                    </g>
                    <g transform={transformXAxis}>
                        <Axis axisType='x' h={this.props.height - 30} axis={axisBottom} key='axisX' color='black'/>
                    </g>
                    <g transform={transformYAxis}>
                        <Axis axisType='y' h='0' axis={axisLeft} key='axisY' color='black' />
                    </g>
                </svg>
            </div>
        )
    }
}
