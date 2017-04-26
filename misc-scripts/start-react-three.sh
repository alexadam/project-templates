#mkdir react-start
#cd reat-start

rm -rf node_modules
rm package.json webpack.config.js

yarn init --yes
yarn add react \
         react-dom \
         three \
         three-orbit-controls
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
cat <<EOT >> view3d.js
import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)

export default class View3D extends React.Component {
    constructor(props) {
        super(props);
    }

    camerea = null;
    renderer = null;
    scene = null;
    controls = null;

    componentDidMount() {
        this.init();
        window.addEventListener('resize', this.applyResize.bind(this), false);
    }

    applyResize() {
        if (!this.camera) {
            return;
        }
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
        this.renderer.render(this.scene, this.camera);
    }

    init = () => {
        let component = this;
        let width = ReactDOM.findDOMNode(component).clientWidth;
        let height = ReactDOM.findDOMNode(component).clientHeight;
        let backgroundColor = '#C6D7E1';

        this.scene = new THREE.Scene();

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.65);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        directionalLight.position.normalize();
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
        this.scene.add(light);

        light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(backgroundColor, 0);

        //////////
        //////////

        this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
        this.camera.position.set(0, 500, 400);
        this.scene.add(this.camera);
        directionalLight.position.copy(this.camera.position);


        this.controls = new OrbitControls(this.camera, ReactDOM.findDOMNode(component), this.renderer);
        this.controls.addEventListener('change', () => {
            directionalLight.position.copy(this.camera.position);
            this.renderer.render(this.scene, this.camera);
        });
        this.controls.maxPolarAngle =  Math.PI/2; // prevent the camera from going under the ground
        this.controls.minDistance = 0.1;
        this.controls.maxDistance = 1000;

        ReactDOM.findDOMNode(component).replaceChild(this.renderer.domElement, ReactDOM.findDOMNode(component).firstChild);

        this.renderer.render(this.scene, this.camera);

        this.createCube();
    }

    createCube = () => {
        let mesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), new THREE.MeshPhongMaterial({ color: '#007fff'}));
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);

        this.renderer.render(this.scene, this.camera);
    }

    render = () =>  {
        return (
           <div id="Graph3D" style={{width: '100%', height:'100%'}}>
                 <div style={{
                         textAlign: 'center',
                         marginTop: 0
                     }}>
                 </div>
           </div>
       );
    }
}
EOT

# create sample 'app'
cat <<EOT >> app.js
import React from 'react';
import ReactDOM from 'react-dom';
import View3D from './view3d';
import './style.scss';

const App = (props) => (
    <div style={{width:'1000px', height:'1000px', backgroundColor:'#fff'}}>
        <View3D />
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
EOT
