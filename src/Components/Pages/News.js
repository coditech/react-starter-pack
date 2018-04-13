import React from 'react';
import Helmet from 'react-helmet'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Default from '../Wrappers/Default'
import { withFetcher } from '../Wrappers/WithFetcher'
import { Toggler } from '../Wrappers/Toggler'

export const News = (props) =>{
  const url = extractUrl(props)
  return (
    <Default className='news'>
      <Helmet>
        <title>News</title>
      </Helmet>
      <h1 className="title">News</h1>
      <Switch>
        <Route path={`${url}/item/:slug`} render={ (props) => <NewsItemWithFetcher {...props} url={url}/> }/>
        <Route path={`${url}/page/:num`}  render={ (props) => <NewsPageWithFetcher {...props} url={url}/> }/>
        <Redirect from={url} to={`${url}/page/0`} />
      </Switch>
    </Default>
  )
}

export const NewsItemFull = ({ title, body, slug, url }) =>
  <div>
    <Helmet>
      <title>{title} | news </title>
    </Helmet>
    <h2><Link to={`${url}/item/${slug}`}>{title}</Link></h2>
    <article>
      {body}
    </article>
  </div>

export const NewsItemMini = ({title, slug, url}) =>
  <div>
    <Link to={`${url}/item/${slug}`}>{title}</Link>
  </div>


export const NewsPage = ({ num, items, url }) => (
  <div>
    <Helmet>
      <title>news | page {num} </title>
    </Helmet>
    <h2>page {num}</h2>
    <div>{items.map(item=><NewsItemMini key={item.post_id} { ...item } url={url}/>)}</div>
    <NewsAdd/>
  </div>
)

export class NewsAdd extends React.Component{
  state = {
    submitting:false,
    errors:[]
  }
  onSubmit = (evt) => {
    evt.preventDefault()
    const form = evt.target
    const title = form.title.value
    const body = form.body.value
    const errors = []
    if(!title){
      errors.push('title cannot be empty')
    }
    if(!body){
      errors.push('body cannot be empty')
    }
    if(errors.length){ this.setState({errors})}
    // TODO: send the data to server, something like fetch('/api/news/add')
  }
  render(){
    return (
      <Toggler>
        { this.state.errors.length 
        ? <div>
            { this.state.errors.map(err=><div className="error" key={err}>{err}</div>) }
          </div>
        : null
        }
        <form onSubmit={this.onSubmit}>
          <input name="title" placeholder="Title" defaultValue={this.props.title}/>
          <textarea name="body" defaultValue={this.props.body}/>
          <button>ok</button>
        </form>
      </Toggler>
    )
  }
}

const extractUrl = ( props ) => { return props.match.url }

const mapItemDataToProps = (state,props) => ({ ...state.payload.data[0], url:props.url })
export const NewsItemWithFetcher = withFetcher(extractUrl, mapItemDataToProps)(NewsItemFull)

const mapPageDataToProps = (state, props) => ({items:state.payload.data, url:props.url, num:props.match.params.num})
export const NewsPageWithFetcher = withFetcher(extractUrl, mapPageDataToProps)(NewsPage)

export default News
