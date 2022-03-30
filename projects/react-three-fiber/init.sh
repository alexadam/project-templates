#!/bin/sh

rm -rf node_modules
rm -rf dist
rm -rf build
rm package.json
rm yarn.lock

yarn init --yes

yarn add react react-dom \
         three \
         @react-three/fiber \
         @react-three/drei \
         @react-three/postprocessing

yarn add --dev @types/react \
        @types/react-dom \
        ts-loader \
        css-loader \
        html-webpack-plugin \
        sass \
        sass-loader \
        style-loader \
        typescript \
        webpack \
        webpack-cli \
        webpack-dev-server \
        @types/three

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