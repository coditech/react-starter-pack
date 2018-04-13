import React from 'react';
import { style } from 'typestyle'
import Default from '../Wrappers/Default'

const mainClassName = style({ background:'green' })

const Home = () => (
  <Default title='About' className={mainClassName}>
    
  </Default>
)
export default Home;
