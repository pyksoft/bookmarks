## Bookmarks Archive

Simple bookmarks management utility

### How to run app

Download and unzip latest release.

You can run manually from app folder

``` bash
node app.js
```

Or find autorun script in /start/win/start.vbs. You can create a shortcut for that file and change its icon.

Programme will launch new Chrome instance in app mode, if you do not have Chrome it will launch default browser.

Alternatively, app is available by default URL: http://localhost:4088

### Run development environmnent

To run client

```bash
npm i -g react-scripts
cd client
npm i
npm start
```

To run server

compile typescript
run /server/build/src/startServer.js with NODE_ENV=development