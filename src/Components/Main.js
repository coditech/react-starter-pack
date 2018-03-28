import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound.js';
import './Main.scss';

const Container = ({title}) => (
  <div>
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/about"> About Us </Link>
      <Link to="/chat"> Chat </Link>
    </nav>
    <Helmet titleTemplate={ `%s | `+title } defaultTitle={ title } />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/home" component={ Home } />
        <Route path="/about" component={ About } />
        <Route path="/chat" component={ Chat } />
        <Route component={ NotFound }/>
      </Switch>
  </div>
);

export default Container;
