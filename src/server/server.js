/********************************************************************
 * This should be a simple file, which would be about just this:
 * ```js
 *  const app = createExpressApp()
 *  httpServer = http.createServer()
 *  httpsServer = https.createServer( https_options )
 *  createSocketServer(httpsServer)
 * ```
 * But it's rendered complex by the boilerplate needed for
 * hot-module-reloading. HMR is the fancy thing that makes
 * it so you don't have to press ctrl-c+up+enter every time
 * you make a change
 */
import http from 'http';
import https from 'https';
import fs from 'fs';

// these are `let` rather than `const` because they change
// every time the app is restarted (every time you make a change to files)
let httpServer, httpsServer, currentApp, closeSocketServer

// options used by the https server
const https_options = {
  key: fs.readFileSync( __dirname+'/certificates/private.key'),
  cert: fs.readFileSync(__dirname+'/certificates/server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

// this is the callback that runs when the http and the https servers
// start listening
const callback = (port) => ( error ) => {
  if (error) { throw error }
  console.log(`🚀 started, listening on ${port}`)
}

// this is the function that runs when the HMR watcher picks up a change in a file
// and needs to stop current servers before reloading them and starting them again 
export const stop = (httpServer, httpsServer) => new Promise((resolve, reject)=>{

  if(!httpServer){ // if there's no server, there's nothing to stop, exit early
    console.log('first run!')
    return resolve()
  }

  if(currentApp){ // remove the express app handler from server
    httpServer.removeListener('request', currentApp);
  }

  if(currentApp){
    httpsServer.removeListener('request', currentApp);
  }

  if(closeSocketServer){
    closeSocketServer((err)=>{
      if(err){ return reject(err)}
      resolve()
    })
  }
  else{
    return resolve()
  }
}).then(() => {
  if(httpServer){
    return new Promise((resolve,reject)=>httpServer.close((err)=>resolve(true)))
  }
  return true
}).then(() => {
  if(httpsServer){
    return new Promise((resolve,reject)=>httpsServer.close((err)=>resolve(true)))
  }
  return true
})

export const start = ( createExpressApp, createSocketServer, port, https_port ) => 
  new Promise((resolve,reject)=>
    stop(httpServer,httpServer).then(()=>{

      httpServer = http.createServer()
      httpsServer = https.createServer( https_options )
     
      currentApp = createExpressApp()

      httpServer.on('request', currentApp)
      httpsServer.on('request', currentApp)
    
      closeSocketServer = createSocketServer(httpServer)
    
      httpServer.listen( port, callback(port) );
      httpsServer.listen( https_port, callback(https_port) );
    })
  )

export default start