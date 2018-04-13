import React from 'react';
import Default from '../Wrappers/Default'
import { WithStatusNotFound } from '../Wrappers/WithStatus'

export const NotFound = () =>
  <Default title='404, Page Not Found' className='not-found'>
    <h1 className="title">Not found</h1>
  </Default>

export const NotFoundWithStatus = WithStatusNotFound(NotFound)

export default NotFoundWithStatus