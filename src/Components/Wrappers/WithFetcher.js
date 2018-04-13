import React from 'react'

export class Fetcher extends React.Component{

  getUrl = () => {
    if (typeof this.constructor.dataSource === 'function') {
      return this.constructor.dataSource(this.props);
    }
    return this.constructor.dataSource
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
    this.fetchData(this.getUrl())
    this._isMounted = true
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

    const { setStateError, setStateLoading, setStateNone, setStateSuccess } = this

    if (!url){ 
      return setStateNone()
    }
    
    const init = { credentials: 'same-origin', ...this.constructor.dataOptions }

    setStateLoading( () => 
      fetch(`/api${url}`, init)
        .then( response => response.json()
            .then( data => {
              if(data.error){
                throw new Error(data.error)
              }
              if (response.status >= 400 && response.status <= 599) {
                throw new Error(response.statusText)
              }
              return data
          })
        )
        .then(setStateSuccess)
        .catch(setStateError)
    )
  };

  urlHasChanged = () => {
    if (typeof this.constructor.dataSource !== 'function') {
      return this.prevUrl !== this.constructor.dataSource
    }

    const currentUrl = this.constructor.dataSource(this.props);

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

  prepareProps(mapStateToProps){
    if(mapStateToProps){
      return mapStateToProps(this.state,this.props)
    }
    return { ...this.state, ...this.props }
  }

} 

export const withFetcher = ( dataSource, mapStateToProps, dataOptions ) => ( Component, compName ) => {

  const displayName = ( compName || Component.displayName || '' ) + 'WithFetcher'

  if(compName && !Component.displayName){
    Component.displayName = compName
  }

  class WithFetcherClass extends Fetcher{
    
    static displayName = displayName  
    static dataOptions = dataOptions
    static dataSource = dataSource
    
    render() {
      this.setStaticContext()
      
      if( this.state.error ){
        return <div> { this.state.error.message } </div>
      }
      
      if( this.state.loading ){
        return <div>loading { this.prevUrl } </div>
      }

      const props = this.prepareProps(mapStateToProps) 
      return <Component {...props} />;
    }
  }

  return WithFetcherClass
}

export default withFetcher
