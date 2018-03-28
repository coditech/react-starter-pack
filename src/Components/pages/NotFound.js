import React from 'react';
import Helmet from "react-helmet";
import Route from 'react-router-dom/Route';

export const NotFound = () =>
  <div>
    <Helmet>
      <title>404, page not found</title>
      <body className="page-not-found"/>
    </Helmet>
    <h1 className="title">Not found</h1>
  </div>

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