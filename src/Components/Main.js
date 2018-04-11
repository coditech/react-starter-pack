import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Chat from './Pages/Chat';
import News from './Pages/News';
import NotFound from './Pages/NotFound.js';
import './Main.scss';

const Main = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/home" component={ Home } />
    <Route path="/about" component={ About } />
    <Route path="/chat" component={ Chat } />
    <Route path="/news" component={ News } />
    <Route component={ NotFound }/>
  </Switch>
);

export default Main;
