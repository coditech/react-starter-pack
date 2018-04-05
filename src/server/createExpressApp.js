/********************************************************************
 * This is a file that takes care of creating an express application
 * to handle user requests. This express app has very little to do,
 * because all the routing is handled, in our case, by react-router.
 * However, it does a few useful things:
 *  - it sets a static file server (to send images and other files
 *    to the user)
 *  - it opens to door to sessions, cookies, and so on, which would
 *    be harder to do without express
 */
import React from 'react'; // allows <JSX/>
import express from 'express'; // for handling server requests
import Helmet from 'react-helmet'; // for manipulating things in <head>...</head>
import { StaticRouter as Router } from 'react-router-dom'; // for routing the URLs to the right components
import { renderToString } from 'react-dom/server'; // for rendering the react app as pure HTML
import ReactApp from '../Components/App'; // The entry point of our application
import renderPage from './renderPage'; // A React Component that renders an entire page and a helper function to render as string

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // reads the webpack config to know what files are needed

// this function creates an express request handler and sets it
// usually, wrapping the creation of the express request handler is not necessary
// but in this case, it allows us to destroy and recreate the app when the server
// needs restarting
const createExpressApp = () => {

  // creates an express app
  const app = express();
  
  // sets the express app to serve static files from the public directory
  app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  
  // makes the app answer *any* request. So, if you would want to add routes before
  app.get('/*', (req, res) => {
  
    const context = {}; // this is used by react router to hold put some information that we can use later
      
    const body = renderToString(
      <Router context={context} location={req.url}>
        <ReactApp />
      </Router>
    );
    // the "body" variable now hold the React app rendered as a string
  
  
    if (context.url) { // this is set by react-router on the front-end and allows us to know if we need to redirect
      res.redirect(context.url);
    } else {
      const status = context.status || 200 // we can set a status from react-router, so this allows us to read it
      const css = [ assets.client.css ] // the css files needed by the app
      const js = [ assets.client.js ] // the js files needed by the app
      const is_prod = process.env.NODE_ENV === 'production' // checks if we're running in production mode
      const helmet = Helmet.renderStatic(); // extracts all the helmet data (everything used in <head>)
      const html = renderPage( body, helmet, js, css, is_prod ) // renders the page as a string
      
      res.status(status).send(html); // finally sends the html to the client
    }
  });

  return app;
}

export default createExpressApp;