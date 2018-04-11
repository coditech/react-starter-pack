import React from 'react';
import Helmet from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import Default from '../Wrappers/Default'
import { WithLoader } from '../Wrappers/WithFetcher'

const extractUrl = ( props ) => { return props.match.url }

export const News = (props) =>{
  const url = extractUrl(props)
  return (
    <Default className='news'>
      <Helmet>
        <title>News</title>
      </Helmet>
      <h1 className="title">News</h1>
      <Switch>
        <Route path={`${url}/item/:slug`} component={ NewsItemWithFetcher }/>
        <Route path={`${url}/page/:num`} component={ NewsPageWithFetcher }/>
        <Route exact path={url} render={() => <NewsPage num={0}/>}/>
      </Switch>
    </Default>
  )
}

export const NewsItem = ({ title, body, slug }) =>
  <div>
    <Helmet>
      <title>{title} | news </title>
    </Helmet>
    <h2>{title}</h2>
    <article>
      {body}
    </article>
  </div>

export const NewsItemSmall = ({title,slug}) =>
  <div>{title}</div>


export const NewsPage = ({ num, items }) => (
  <div>
    <Helmet>
      <title>news | page {num} </title>
    </Helmet>
    <h2>page {num}</h2>
    <div>{items.map(item=><NewsItemSmall key={item.post_id} { ...item }/>)}</div>
  </div>
)

const mapItemDataToProps = (props) => ({...props.payload.data[0]})
export const NewsItemWithFetcher = WithLoader(extractUrl, mapItemDataToProps)(NewsItem)

const mapPageDataToProps = (props) => ({items:props.payload.data,num:props.match.params.num})
export const NewsPageWithFetcher = WithLoader(extractUrl, mapPageDataToProps)(NewsPage)

export default News
