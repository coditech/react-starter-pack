import React from 'react'
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const defaultTitle = `My Site` 

const toSlug = ( str ) => str.trim().replace(/(\s|[!@#$%^&*()])+/g,'-')

export const DefaultWrapper = ({ className, children, title }) => {
  className = className || ( title ? toSlug(title) : '' )
  return (
    <div className={className}>
      <Helmet titleTemplate={ `%s | `+defaultTitle } defaultTitle={ defaultTitle }>
        <body className={className ? 'page page-'+className : 'page'}/>
        <title>{title}</title>
      </Helmet>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/about"> About Us </Link>
        <Link to="/chat"> Chat </Link>
        <Link to="/news"> News </Link>
      </nav>
      <div className={className ? 'content content-'+className : 'content'}>
        { children }
      </div>
    </div>
  )
}

export default DefaultWrapper