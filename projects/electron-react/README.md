
# React + Electron App Template

Run `yarn build` and `yarn build:electron`

Then open `./dist/index.html` and replace:

```html
<script defer src="/app.js"></script></body>

with:

<script defer src="./app.js"></script></body>
```

and create `./dist/package.json`

```json
{
 "name": "app-name",
 "version": "0.1.0",
 "main": "electron-app.js"
}
```

Then run `yarn deploy` and go to `./release-builds/app-name-linux-x64/` and run `./app-name`  or  `yarn deploy-macos` and run the app at `./release-builds/app-name-darwin-x64/app-name.app/...`
