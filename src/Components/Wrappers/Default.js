import React from 'react'
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const defaultTitle = `My Site` 

export const DefaultWrapper = ({ className, children }) => (
  <div className={className}>
    <Helmet titleTemplate={ `%s | `+defaultTitle } defaultTitle={ defaultTitle }>
      <body className={className ? 'page page-'+className : 'page'}/>
    </Helmet>
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/about"> About Us </Link>
      <Link to="/chat"> Chat </Link>
    </nav>
    <div className={className ? 'content content-'+className : 'content'}>
      { children }
    </div>
  </div>
)

export default DefaultWrapper