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
