## ???

This is a simple starter app to build a server and client rendered application.

It uses:

  - server:
    - [express](https://npmjs.org/package/express) for handling requests
    - [connect-flash](https://npmjs.org/package/connect-flash) for sending messages to the user after they submit a form
    - [body-parser](https://npmjs.org/package/body-parser) for handling POST requests
    - [express-session](https://npmjs.org/package/express-session) for managing user sessions
    - [passport](https://npmjs.org/package/passport) for authentication
    - [passport-github2](https://npmjs.org/package/passport-github2) for logging in through github
    - [passport-local](https://npmjs.org/package/passport-local) for logging in through email and password
    - [socket-io](https://npmjs.org/package/socket-io) for real time communication
    - [helmet](https://github.com/helmetjs/helmet) (not to confuse with `react-helmet` below!) to protect the app
    - [hpp](https://github.com/analog-nico/hpp) to protect against parameters pollution
    - [compression](https://github.com/expressjs/compression) to compress server responses
  - database stuff:
    - [sqlite3](https://npmjs.org/package/sqlite3) for storing data
    - [knex](https://npmjs.org/package/knex) for easily communicating with sqlite
  - html stuff:
    - [react](https://npmjs.org/package/react) for generating a dynamic HTML structure
    - [react-dom](https://npmjs.org/package/react-dom) for converting React to DOM elements
    - [react-helmet](https://npmjs.org/package/react-helmet) for managing the page's title and body from React
    - [react-router](https://npmjs.org/package/react-router) for managing urls
    - [react-router-dom](https://npmjs.org/package/react-router-dom) for managing urls on the browser side
  - css stuff
    - [typestyle](https://npmjs.org/package/typestyle) for writing CSS as JS
    - [csstips](https://npmjs.org/package/csstips) helpers for typestyle
    - [csx](https://npmjs.org/package/csx) helpers for typestyle
    - [node-sass](https://npmjs.org/package/node-sass) allows to read Sass files and convert them to CSS
  - build stuff (webpack)
    - css:
      - [style-loader](https://npmjs.org/package/style-loader) allows webpack to load CSS files and insert them in the page
      - [autoprefixer](https://npmjs.org/package/autoprefixer) allows webpack to automatically add vendor prefixes
      - [sass-loader](https://npmjs.org/package/sass-loader) allowes webpack to automatically load and run SASS files
      - [extract-text-webpack-plugin](https://npmjs.org/package/extract-text-webpack-plugin) allows webpack to extract the CSS and put it in an independant CSS file (used in production mode only)
    - other:
      - [razzle](https://npmjs.org/package/razzle) zero-conf webpack setup
      - [ignore-loader](https://npmjs.org/package/ignore-loader) allows to ignore certain files (needed for the server to ignore SASS files and such)
      - [webpack-visualizer-plugin](https://npmjs.org/package/webpack-visualizer-plugin) creates an HTML file that shows how heavy our JS/CSS is

## Quickstart

fork/clone the repo, then, inside the folder,

install the necessary packages

```bash
yarn install
```

Run the app
```bash
yarn start
```

It's possible that you may have to interrupt the first build (`ctrl-c`), and run `yarn start` again.  
This only happens on the first build.


## Structure

There's `README.md` in each directory that explains its purpose