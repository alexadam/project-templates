#mkdir react-start
#cd reat-start

rm -rf node_modules
rm package.json webpack.config.js

yarn init --yes
yarn add react \
         react-dom \
         redux \
         react-redux
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
cat <<EOT >> app.js
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main.js';

ReactDOM.render((
    <Main/>
), document.getElementById('app'));
EOT

mkdir actions
cat <<EOT >> ./actions/actions.js
const actions = {
    ADD: Symbol('ADD'),
    REMOVE: Symbol('REMOVE')
};

const add = (amount) => ({
    type: actions.ADD,
    amount: amount
});

const remove = (amount) => ({
    type: actions.REMOVE,
    amount: amount
});

export {actions, add, remove};
EOT

mkdir components
cat <<EOT >> ./components/display.js
import React from 'react';
import { connect } from 'react-redux';

const Display = (props) => (
    <h1>{props.counter}</h1>
);

const mapStateToProps = (state) => ({counter: state.counter})

export default connect(mapStateToProps)(Display);
EOT

cat <<EOT >> ./components/edit.js
import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import {add, remove} from '../actions/actions.js'

class Edit extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        counter: 0
    }

    onChange = (e) => this.setState({counter:e.target.value});

    render = () =>  (
        <div>
            <input type="text" value="0" onChange={this.onChange} value={this.state.counter}/>
            <button onClick={ () => (this.props.add(this.state.counter)) }>Add</button>
            <button onClick={ () => (this.props.remove(this.state.counter)) }>Sub</button>
        </div>
    )
}

const mapStateToProps = (state) => ({ counter: state.counter })

const mapDispatchToProps = (dispatch) => ({
    add: bindActionCreators(add, dispatch),
    remove: bindActionCreators(remove, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
EOT

cat <<EOT >> ./components/main.js
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import mainReducer from '../reducers/reducer.js';
import Display from './display.js';
import Edit from './edit.js';

let store = createStore(mainReducer);

const Main = () => (
    <Provider store={store}>
        <div>
            <Edit />
            <Display />
        </div>
    </Provider>
);

export default Main;
EOT

mkdir reducers
cat <<EOT >> ./reducers/reducer.js
import {actions} from '../actions/actions.js';

 const mainReducer = (state = {counter: 0}, action) => {
     switch (action.type) {
         case actions.ADD:
            return {counter: (state.counter + Number(action.amount))};
         case actions.REMOVE:
            return {counter: (state.counter - Number(action.amount))};
         default:
            return state;
     }
 };

export default mainReducer;
EOT
