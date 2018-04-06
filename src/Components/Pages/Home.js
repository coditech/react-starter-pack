import React from 'react';
import Helmet from 'react-helmet';
import { style } from 'typestyle';
import Default from '../Wrappers/Default'

const testClassName = style({color:'orange'})

const Home = () => (
  <Default className='home'>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1 className="title">Home</h1>
    <p className={testClassName}>sdasd</p>
  </Default>
)
export default Home;
