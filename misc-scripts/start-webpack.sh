#mkdir react-start
#cd reat-start

rm -rf node_modules
rm package.json webpack.config.js

yarn init --yes
yarn add --dev webpack \
               webpack-dev-server \
               style-loader \
               sass-loader \
               node-sass \
               html-webpack-plugin \
               css-loader

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
        <h1>Hello World!</h1>
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
require('./style.scss');
console.log('Hello world!');
EOT
