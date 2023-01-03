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
        sass \
        typescript \
        @vitejs/plugin-react \
        vite \
        jest \
        @types/jest \
        ts-jest \
        @testing-library/react \
        @testing-library/jest-dom \
        jest-environment-jsdom \

# Remove the last line
sed -i.bak '$ d' package.json && rm package.json.bak

# append the scripts commads
cat <<EOT >> package.json
   ,"scripts": {
      "clean": "rm -rf dist/*",
      "build": "vite --config vite.config.js build",
      "dev": "vite --config vite.config.js serve",
      "preview": "vite --config vite.config.js preview",
      "test": "jest"
   }
}