var path = require("path");
var webpack = require("webpack")
var app_dir = __dirname + '/client';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: app_dir + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

var config = {
    entry: app_dir + '/app.tsx',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            exclude: /(node_modules|bower_components)/
        }]
    },
    plugins: [
        HTMLWebpackPluginConfig,
        // alternative to target: "electron-main"
        // new webpack.ExternalsPlugin('commonjs', [
        //     'electron'
        // ])
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    devServer: {
        historyApiFallback: true
    },
    target: 'electron-main'
};
module.exports = config;