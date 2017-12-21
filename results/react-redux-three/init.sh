rm -rf node_modules
rm package.json

yarn init --yes

yarn add react \
         react-dom
yarn add redux \
         react-redux
yarn add three \
         three-orbit-controls

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
