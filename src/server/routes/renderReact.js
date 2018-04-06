/********************************************************************
 * This file takes care of rendering the react app server-side. It
 * bundles:
 *  - a React component that renders a full HTML page
 *  - a helper function to render this component to string
 *  - an express route that knows how to use react-router to extract
 *    redirects and status codes
 *
 */
import React from 'react' // allows <JSX/>
import { StaticRouter as Router } from 'react-router-dom' // for routing the URLs to the right components
import { renderToString } from 'react-dom/server' // for rendering the react app as pure HTML
import Helmet from 'react-helmet' // for manipulating things in <head>...</head>
import { getStyles } from "typestyle"; // a styles helper
import ReactApp from '../../Components/App' // The entry point of our application

// A very simple React component that you can use to render a full
// page. This is intended to be used on the server only, of course.
export const Document = ({ js, css, body, is_prod, helmet, rootComponentId }) => (
  <html { ...helmet.htmlAttributes.toComponent() }>
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      { helmet.title.toComponent() }
      { helmet.meta.toComponent() }
      { helmet.link.toComponent() }
      { css && css.map( url => url ? <link rel="stylesheet" key={url} href={url}/> : null) }
      <style id="styles">{ getStyles() }</style>
      { js &&  js.map( url  => <script key={url} src={url} defer crossOrigin={is_prod ? true : undefined }/>) }
    </head>
    <body { ...helmet.bodyAttributes.toComponent() }>
      <div id={rootComponentId ? rootComponentId : "root"} dangerouslySetInnerHTML={{__html:body}}>
        {/* THIS IS WHERE THE REACT APP WILL LIVE */}
      </div>
    </body>
  </html>
)

// a helper function that checks for all props before using the component, but only
// on development builds. Renders to a string that is suitable to be used
// server-side
export const renderPage = ( { js, css, body, is_prod, helmet, rootComponentId = 'root' }) => {
  if(!is_prod){
    if(!body){
      throw new Error('html is empty')
    }
    if(!js || !js.length){
      throw new Error('js must be an array and have at least one element')
    }
    if(!css || !css.length){
      throw new Error('css must be an array and have at least one element')
    }
    if(!helmet){
      throw new Error('no <head> information available')
    }
  }
  const props = { js, css, body, is_prod, helmet, rootComponentId }
  return renderToString(<Document { ...props } />)
}

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // reads the webpack config to know what js and css files are needed

// a route that can be used to render the react document
export default ( req, res ) => {

  const is_prod = process.env.NODE_ENV === 'production' // checks if we're running in production mode

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
    const helmet = Helmet.renderStatic(); // extracts all the helmet data (everything used in <head>)

    const html = renderPage( { body, helmet, js, css, is_prod } ) // renders the page as a string

    res.status(status).send(html); // finally sends the html to the client
  }
}