#!/bin/sh

rm -rf node_modules
rm -rf dist
rm -rf build
rm package.json
rm yarn.lock

yarn init --yes

yarn add express cors

yarn add --dev typescript \
    tslint \
    ts-node-dev \
    ts-node \
    @types/node \
    @types/express \
    @types/cors \
    jest \
    @types/jest \
    ts-jest \
    supertest \
    @types/supertest

# Remove the last line
sed -i.bak '$ d' package.json && rm package.json.bak

# append the scripts commads
cat <<EOT >> package.json
   ,"scripts": {
    "prod": "tsc",
    "dev": "tsnd --respawn src/main.ts",
    "lint": "tslint 'src/**/*.ts'",
    "audit": "npm audit fix",
    "test": "jest"
  }
}