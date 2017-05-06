#mkdir react-start
#cd reat-start

rm -rf node_modules
rm package.json webpack.config.js

yarn init --yes
yarn add react \
         react-dom \
         d3
yarn add --dev webpack \
               webpack-dev-server \
               style-loader \
               sass-loader \
               node-sass \
               html-webpack-plugin \
               css-loader \
               babel-core \
               babel-loader \
               babel-preset-react \
               babel-preset-latest \
               babel-preset-stage-0

echo '{ "presets": ["react", "latest", "stage-0"] }' > .babelrc

# Replace the last character "}"
sed -i '$ s/.$//' package.json

# append scripts commads
cat <<EOT >> package.json
    ,"scripts": {
        "dev": "export NODE_PATH=\"./node_modules\" && webpack-dev-server --port=8080 --inline --progress --colors",
        "build": "export NODE_PATH=\"./node_modules\" && npm run clean && webpack --progress -p",
        "clean": "rm -rf dist/*"
    }
}
EOT

# create webpack config
cat <<EOT >> webpack.config.js
var path = require("path");

var app_dir = __dirname + '/client';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: app_dir + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

var config = {
    entry: app_dir + '/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ["react", "latest", "stage-0"]
            }
        }]
    },
    plugins: [HTMLWebpackPluginConfig]
};
module.exports = config;
EOT

# create .gitignore
cat <<EOT >> .gitignore
node_modules/
dist/
EOT

#################################
## Create example files
#################################
mkdir client
cd client

# create index.html
cat <<EOT >> index.html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test App</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
EOT

# create style.scss
cat <<EOT >> style.scss
\$color: yellow;

h1 {
    background-color: \$color;
}
EOT

# create sample 'app'
cat <<EOT >> graph2d.js
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
EOT

# create sample 'app'
cat <<EOT >> app.js
import React from 'react';
import ReactDOM from 'react-dom';
import Graph2D from './graph2d';
import './style.scss';

const data = [
    {x: 1, y: Math.random() * 100},
    {x: 2, y: Math.random() * 100},
    {x: 3, y: Math.random() * 100},
    {x: 4, y: Math.random() * 100},
    {x: 5, y: Math.random() * 100},
    {x: 6, y: Math.random() * 100},
    {x: 7, y: Math.random() * 100},
    {x: 8, y: Math.random() * 100},
    {x: 9, y: Math.random() * 100},
    {x: 10, y: Math.random() * 100},
];

const App = (props) => (
    <div>
        <Graph2D width='500' height='500' data={data}/>
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
EOT
