import React from 'react';
import Helmet from 'react-helmet';
import { style } from 'typestyle';

const mainClassName = style({ background:'green' })

const Home = () => (
  <div className={mainClassName}>
    <Helmet>
      <title>Home</title>1
      <body className="page-about"/>
    </Helmet>
    <h1 className="title">About</h1>
  </div>
)
export default Home;
