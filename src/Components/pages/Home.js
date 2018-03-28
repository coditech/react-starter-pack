import React from 'react';
import Helmet from 'react-helmet';
import { style } from 'typestyle';

const testClassName = style({color:'orange'})

const Home = () => (
  <div>
    <Helmet>
      <title>Home</title>1
      <body className="page-home"/>
    </Helmet>
    <h1 className="title">Home</h1>
    <p className={testClassName}>sdasd</p>
  </div>
)
export default Home;
