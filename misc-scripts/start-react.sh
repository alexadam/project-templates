#mkdir react-start
#cd reat-start

rm -rf node_modules
rm package.json webpack.config.js

yarn init --yes
yarn add react \
         react-dom
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
cat <<EOT >> app.js
import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const App = (props) => (
    <div>
        <h1>Hello World</h1>
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
EOT