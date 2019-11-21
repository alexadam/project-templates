rm -rf node_modules
rm package.json

yarn init --yes

yarn add react \
         react-dom

# ./node_modules/.bin/tsc --init

yarn add --dev typescript \
               @types/react \
               @types/react-dom \
               webpack \
               webpack-dev-server \
               webpack-cli \
               awesome-typescript-loader \
               style-loader \
               sass-loader \
               node-sass \
               html-webpack-plugin \
               css-loader

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