import React from 'react';
import Helmet from "react-helmet";
import Route from 'react-router-dom/Route';
import Default from '../Wrappers/Default'

export const NotFound = () =>
  <Default className='not-found'>
    <Helmet>
      <title>404, page not found</title>
    </Helmet>
    <h1 className="title">Not found</h1>
  </Default>

export const setStatusIfServer = ( staticContext, props ) => {

  if (staticContext){ // this means we're rendering on the server 
    // this is needed to detect the 404 on the server
    // we will use the `status` when the server renders the page
    staticContext.status = 404
  }
  
  return <NotFound {...props}/>
}

export const NotFoundWithStatus = (props) =>
  <Route render={({staticContext})=>setStatusIfServer(staticContext,props) }/>

export default NotFoundWithStatus