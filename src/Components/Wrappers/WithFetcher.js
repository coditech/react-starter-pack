import React from 'react'

export class Fetcher extends React.Component{
  runDataSourceFunction = () => {
    return this.constructor.dataSource(this.props);
  }
  getUrl = () => {
    let url = this.constructor.dataSource
    if (typeof this.constructor.dataSource === 'function') {
      url = this.runDataSourceFunction();
    }
    return url;
  }
  
  state = {
    loading:(!!this.getUrl()),
    success:null,
    error:null,
    payload:null
  }

  _isMounted = false

  prevUrl = this.getUrl()

  componentDidMount = () => {
    this._isMounted = true
    this.fetchData(this.getUrl())
  }

  componentDidUpdate() {
    if (typeof this.constructor.dataSource === 'function' && this.urlHasChanged()) {
      this.fetchData(this.getUrl())
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateNone = ( cb ) => {
    this.setState(() => ({ loading:false, success:false, error: false }), cb)
  }
  setStateLoading = ( cb ) => {
    this.setState(() => ({ loading:true, success:false, error: false }), cb)
  }
  setStateSuccess = ( payload, cb ) => {
    if (!this._isMounted){ return }
    this.setState(() => ({ loading:false, success:true, error: false, payload }), cb)
  }
  setStateError = (error, cb ) => {
    if (!this._isMounted){ return }
    this.setState(() => ({ loading:true, success:false, error }), cb)
  }

  fetchData = url => {

    if (!url){ 
      return this.setStateNone() 
    }
    
    const init = { credentials: 'same-origin', ...this.props.dataOptions }

    this.setStateLoading( () => 
      fetch(`/api${url}`, init)
        .then( response => {
          const { status:httpStatus, statusText } = response
          return response.json().then( data => {
              if ( (httpStatus >= 400 && httpStatus <= 599) || data.error ) {
                if(data.error){
                  throw new Error(data.error)  
                }
                throw new Error(statusText)
              }
              return data
          })
        } )
        .then(this.setStateSuccess)
        .catch(this.setStateError)
    )
  };

  urlHasChanged = () => {
    if (typeof this.constructor.dataSource !== 'function') {
      return this.prevUrl !== this.constructor.dataSource
    }

    const currentUrl = this.runDataSourceFunction()

    if (this.prevUrl !== currentUrl) {
      this.prevUrl = currentUrl;
      return true;
    }
    return false;
  };

  setStaticContext(){
    if(this.props.staticContext){
      this.props.staticContext.dataSource = this.prevUrl
    }
  }

  prepareProps(process){
    const props = process({ ...this.props, ...this.state })
    return props
  }

} 

export const WithFetcher = (dataSource,process=(x)=>x) => ( Component, compName ) => {

  const displayName = ( compName || Component.displayName || '' ) + 'WithFetcher'

  if(compName && !Component.displayName){
    Component.displayName = compName
  }

  return class WithFetcherClass extends Fetcher{
    static displayName = displayName
    static dataSource = dataSource
    render() {
      const props = this.prepareProps(process) 
      this.setStaticContext()
      return <Component {...props} />;
    }
  }
}

export const WithLoader = (dataSource,process=(x)=>x) => ( Component, compName ) => {

  const displayName = ( compName || Component.displayName || '' ) + 'WithLoader'

  if(compName && !Component.displayName){
    Component.displayName = compName
  }

  return class WithLoaderClass extends Fetcher{
    static displayName = displayName
    static dataSource = dataSource
    render() {
      
      this.setStaticContext()

      if( this.state.error ){
        return <div> { this.state.error.message } </div>
      }
      
      if( this.state.loading ){
        return <div>loading { this.prevUrl } </div>
      }
      
      const props = this.prepareProps(process) 
    
      return <Component {...props} />;
    }
  }
}

export default WithFetcher
