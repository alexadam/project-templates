#!/bin/sh

rm -rf node_modules
rm package.json

yarn init --yes

yarn add react \
        react-dom \
        react-router-dom \
        @reduxjs/toolkit \
        react-redux

yarn add --dev @types/react \
        @types/react-dom \
        @types/react-router-dom \
        @types/react-redux \
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
      "build": "webpack",
      "dev": "webpack serve"
   }
}