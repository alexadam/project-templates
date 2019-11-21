rm -rf node_modules
rm package.json

yarn init --yes

yarn add react \
         react-dom

yarn add --dev webpack \
               webpack-dev-server \
               webpack-cli \
               style-loader \
               sass-loader \
               node-sass \
               html-webpack-plugin \
               css-loader \
               "@babel/core" \
               "babel-loader" \
               "@babel/preset-react" \
               "@babel/preset-env" \
               "@babel/preset-stage-0" \
               "babel-plugin-transform-class-properties"

# Remove the last line
sed -i.bak '$ d' package.json && rm package.json.bak

# append scripts commads
cat <<EOT >> package.json
   ,"scripts": {
       "dev": "export NODE_PATH=\"./node_modules\" && webpack-dev-server --port=8080 --inline --progress --colors --mode=\"development\"",
       "build": "export NODE_PATH=\"./node_modules\" && npm run clean && webpack --progress -p --mode=\"production\"",
       "clean": "rm -rf dist/*"
   }
}
EOT
