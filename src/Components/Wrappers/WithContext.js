import React from 'react'
import Route from 'react-router-dom/Route'

export const WithContext = ( functionToRun ) => ( Comp ) => ( props ) =>
  <Route 
    render={
      ({ staticContext })=>{
        if (staticContext){ // this means we're rendering on the server 
          // if we are, let's run the function
          functionToRun( staticContext, props )
        }
        // then, we just render the passed React Object
        return <Comp {...props}/>
      }
    }/>

export default WithContext