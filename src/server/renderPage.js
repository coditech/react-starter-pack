import React from 'react'; // to use <JSX/>
import { renderToString } from 'react-dom/server'; // for rendering the react app as pure HTML
import { getStyles } from "typestyle";

export class Document extends React.Component {
  render() {
    const { js, css, body, is_prod, helmet } = this.props;
    
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html { ...htmlAttrs }>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          { helmet.title.toComponent() }
          { helmet.meta.toComponent() }
          { helmet.link.toComponent() }
          { css && css.map( url => url ? <link rel="stylesheet" key={url} href={url}/> : null) }
          <style id="styles">{ getStyles() }</style>
          { js &&  js.map( url  => <script key={url} src={url} defer crossOrigin={is_prod ? true : undefined }/>) }
        </head>
        <body { ...bodyAttrs }>
          <div id="root" dangerouslySetInnerHTML={{__html:body}}>
          </div>
        </body>
      </html>
    );
  }
}

export const renderPage = ( body, helmet, js, css, is_prod ) => {
  if(!body){
    throw new Error('html is empty')
  }
  if(!js || !js.length){
    throw new Error('js must be an array and have at least one element')
  }
  if(!css || !css.length){
    throw new Error('css must be an array and have at least one element')
  }
  if(!helmet){
    throw new Error('no <head> information available')
  }
  const props = { body, helmet, js, css, is_prod }
  return renderToString(<Document { ...props } />)
}

export default renderPage