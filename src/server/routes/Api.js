import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const Api = ({match:{url},staticContext}) => {
  staticContext.json = true
  return (
    <Switch>
      <Route path={`${url}/ba`} component={Batata}/>
      <Route component={Batata2}/>
    </Switch>
  )
}

const Response = ({data}) => <div dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>

const Batata = () => <Response data={{hey:'yes'}}/>


const Batata2 = () => <Response data={{hey:'no'}}/>