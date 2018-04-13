import React from 'react';
import { style } from 'typestyle';
import Default from '../Wrappers/Default'

const testClassName = style({color:'orange'})

const Home = () => (
  <Default title='Home'>
    <h1 className="title">Home</h1>
    <p className={testClassName}>sdasd</p>
  </Default>
)
export default Home;
