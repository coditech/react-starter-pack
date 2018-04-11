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
import express from 'express' // for handling server requests
import helmet from 'helmet' // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help! 
import bodyParser from 'body-parser' // takes care of POST requests
import compression from 'compression' // compression middleware. Compresses responses before sending them
import hpp from 'hpp' // protects against parameters pollution, see https://github.com/analog-nico/hpp
import renderReact from './routes/renderReact' // our static React renderer
//import api from './routes/api/api' // JSON api

// this function creates an express request handler and sets it
// usually, wrapping the creation of the express request handler is not necessary
// but in this case, it allows us to destroy and recreate the app when the server
// needs restarting
const createExpressApp = () => {

  
  // creates an express app
  const app = express();
  
  // creates parsers for POST requests
  const jsonParser = bodyParser.json()
  const urlencodedParser = bodyParser.urlencoded({ extended: false }) 
  app.post('/*',jsonParser,urlencodedParser)

  const is_prod = process.env.NODE_ENV === 'production' // checks if we're running in production mode

  if(is_prod){ // we use those in production mode only
    app.use(hpp()) // protects against parameters pollution, see https://github.com/analog-nico/hpp
    app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
    app.use(compression()) // compression middleware. Compresses responses before sending them
  }

  // sets the express app to serve static files from the public directory
  app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  
  //app.use('/api',api)

  // makes the app answer *any* request. So, if you would want to add routes, it has to be before
  // this line
  app.get('/*', renderReact);

  return app;
}

export default createExpressApp;