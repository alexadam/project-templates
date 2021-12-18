#!/bin/sh

rm -rf node_modules
rm -rf dist
rm -rf build
rm package.json
rm yarn.lock

yarn init --yes

yarn add react react-dom

yarn add --dev @types/react \
        @types/react-dom \
        ts-loader \
        css-loader \
        html-webpack-plugin \
        node-sass \
        sass-loader \
        style-loader \
        typescript \
        webpack \
        webpack-cli \
        webpack-dev-server \
        jest \
        @types/jest \
        ts-jest \
        @testing-library/react \
        @testing-library/jest-dom \

# Remove the last line
sed -i.bak '$ d' package.json && rm package.json.bak

# append the scripts commads
cat <<EOT >> package.json
   ,"scripts": {
      "clean": "rm -rf dist/*",
      "build": "webpack",
      "dev": "webpack serve",
      "test": "jest"
   }
}