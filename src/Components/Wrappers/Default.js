import React from 'react'
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import './Default.scss';

const defaultTitle = `My Site` 

const toSlug = ( str ) => str.trim().replace(/(\s|[!@#$%^&*()])+/g,'-').toLowerCase()

export const DefaultWrapper = ({ className, children, title, slug }) => {
  slug = slug || ( title ? toSlug(title) : '') 
  className = className || [className,slug].filter(Boolean).join(' ')
  return (
    <div className={className}>
      <Helmet titleTemplate={ `%s | `+defaultTitle } defaultTitle={ defaultTitle }>
        <body className={className ? 'page page-'+slug : 'page'}/>
        <title>{title}</title>
      </Helmet>
      <nav>
        <Link to="/" className="brand">
          <img className="logo" alt={`logo for ${title}`} src="" />
          <span>My Site</span>
        </Link>
        <input id="menu-button"  type="checkbox" class="show"/>
        <label for="menu-button" class="burger pseudo button">≡</label>
        <div className="menu">
          <Link className="pseudo button" to="/"> Home </Link>
          <Link className="pseudo button" to="/about"> About Us </Link>
          <Link className="pseudo button" to="/chat"> Chat </Link>
          <Link className="pseudo button" to="/news"> News </Link>
          <Link className="button" to="/news"> Login </Link>
        </div>
      </nav>
      <main className={(slug ? 'content content-'+slug : 'content')}>
        { children }
      </main>
    </div>
  )
}

export default DefaultWrapper