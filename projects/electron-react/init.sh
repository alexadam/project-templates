#!/bin/sh

rm -rf node_modules
rm -rf dist
rm -rf build
rm package.json
rm yarn.lock

yarn init --yes

yarn add react react-dom electron

yarn add --dev  @types/react \
        @types/react-dom \
        @types/electron \
        electron-packager \
        ts-loader \
        css-loader \
        html-webpack-plugin \
        node-sass \
        sass-loader \
        style-loader \
        typescript \
        webpack \
        webpack-cli \
        webpack-dev-server

# Remove the last line
sed -i.bak '$ d' package.json && rm package.json.bak

# append the scripts commads
cat <<EOT >> package.json
   ,"scripts": {
    "clean": "rm -rf dist/*",
    "build": "webpack --config webpack.react.config.js",
    "dev": "webpack serve --config webpack.react.config.js",
    "dev:electron": "webpack --config webpack.electron.config.js --mode development && electron ./dist/electron-app.js --dev",
    "build:electron": "webpack --config webpack.electron.config.js",
    "deploy": "electron-packager ./dist app-name --overwrite --asar=false --platform=linux --arch=x64 --prune=true --out=release-builds"
  }
}