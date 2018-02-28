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
