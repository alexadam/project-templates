rm -rf node_modules
rm package.json

yarn init --yes

yarn add express \
         pg \
         reflect-metadata \
         typeorm 

yarn add --dev typescript \
               @types/node \
               @types/express

# Remove the last line
sed -i.bak '$ d' package.json && rm package.json.bak

# append scripts commads
cat <<EOT >> package.json
   ,"scripts": {
       "dev": "export NODE_PATH=\"./node_modules\" && ./node_modules/.bin/tsc && node dist/index.js",
       "build": "export NODE_PATH=\"./node_modules\" && npm run clean && ./node_modules/.bin/tsc && node dist/index.js",
       "clean": "rm -rf dist/*"
   }
}