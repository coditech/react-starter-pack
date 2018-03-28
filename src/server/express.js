import React from 'react'; // allows <JSX/>
import express from 'express'; // for handling server requests
import Helmet from 'react-helmet'; // for manipulating things in <head>...</head>
import { StaticRouter as Router } from 'react-router-dom'; // for routing the URLs to the right components
import { renderToString } from 'react-dom/server'; // for rendering the react app as pure HTML
import ReactApp from '../Components/App'; // The entry point of our application
import renderPage from './renderPage'; // A React Component that renders an entire page and a helper function to render as string

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // reads the webpack config to know what files are needed

const app = express();

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.get('/*', (req, res) => {

  const context = {}; // this is used by react router to hold put some information that we can use later
    
  const body = renderToString(
    <Router context={context} location={req.url}>
      <ReactApp />
    </Router>
  );
  // "body" now hold the React app rendered as a string


  if (context.url) {
    res.redirect(context.url);
  } else {

    const status = context.status || 200 // we can set a status from the router, so this allows us to read it
    const css = [ assets.client.css ] // the css files needed by the app
    const js = [ assets.client.js ] // the js files needed by the app
    const is_prod = process.env.NODE_ENV === 'production' // checks if we're running in production mode
    const helmet = Helmet.renderStatic(); // extracts all the helmet data
    const html = renderPage( body, helmet, js, css, is_prod ) // renders the page as a string
    
    res.status(status).send(html); // sends the html to the client
  }
});

export default app;
