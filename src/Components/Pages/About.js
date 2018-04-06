import React from 'react';
import Helmet from 'react-helmet'
import { style } from 'typestyle'
import Default from '../Wrappers/Default'

const mainClassName = style({ background:'green' })

const Home = () => (
  <Default className={mainClassName}>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1 className="title">About</h1>
  </Default>
)
export default Home;
