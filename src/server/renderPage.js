/********************************************************************
 * A very simple React component that you can use to render a full
 * page. This is intended to be used on the server only, of course.
 * There's a helper function that checks all needed props are present,
 * and then renders the page to string so it can be sent server-side
 */
import React from 'react'; // to use <JSX/>
import { renderToString } from 'react-dom/server'; // for rendering the react app as pure HTML
import { getStyles } from "typestyle"; // a styles helper

export const Document = ({ js, css, body, is_prod, helmet, rootComponentId }) => (
  <html { ...helmet.htmlAttributes.toComponent() }>
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
    <body { ...helmet.bodyAttributes.toComponent() }>
      <div id={rootComponentId ? rootComponentId : "root"} dangerouslySetInnerHTML={{__html:body}}>
      </div>
    </body>
  </html>
)

export const renderPage = ( js, css, body, is_prod, helmet, rootComponentId = 'root' ) => {
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
  const props = { js, css, body, is_prod, helmet, rootComponentId }
  return renderToString(<Document { ...props } />)
}

export default renderPage