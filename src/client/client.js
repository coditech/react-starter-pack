/********************************************************************
 * This file is used browser-side only. All it takes care of is:
 *  - load the entry component (`App`)
 *  - load the styles created by typestyle
 *  - insert the entry component in the root div (using "hydrate", see https://reactjs.org/docs/react-dom.html#hydrate)
 *  - insert the typestyle style in a style div
 */
import React from 'react'; // needed for <JSX/>
import { hydrate } from 'react-dom'; // needed to attach the React app to existing markup created by ReactDom
import { BrowserRouter as Router } from 'react-router-dom'; // needed for routing
import {setStylesTarget} from "typestyle"; // creates a <style> element to put the typestyle css in
import App from '../Components/App'; // entry point of our application

const htmlRoot = document.getElementById('root') // get the root element
const stylesRoot = document.getElementById('styles') // get the styles element

const RoutedApp = <Router><App/></Router> // wrap the app in router

hydrate(RoutedApp, htmlRoot); // insert the app in the div root element
setStylesTarget(stylesRoot); // insert the css in the style root element

// set hot module reloading (automatic refresh)
if (module.hot) {
  module.hot.accept();
}
