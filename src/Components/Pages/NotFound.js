import React from 'react';
import Helmet from "react-helmet";
import Default from '../Wrappers/Default'
import { WithStatusNotFound } from '../Wrappers/WithStatus'

export const NotFound = () =>
  <Default className='not-found'>
    <Helmet>
      <title>404, page not found</title>
    </Helmet>
    <h1 className="title">Not found</h1>
  </Default>

export const NotFoundWithStatus = WithStatusNotFound(NotFound)

export default NotFoundWithStatus