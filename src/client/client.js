import App from '../Components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import {setStylesTarget} from "typestyle";

const htmlRoot = document.getElementById('root')
const stylesRoot = document.getElementById('styles')

hydrate(<Router><App /></Router>, htmlRoot);
setStylesTarget(stylesRoot);

if (module.hot) {
  module.hot.accept();
}
