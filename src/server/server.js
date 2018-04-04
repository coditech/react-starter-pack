import http from 'http';
import https from 'https';
import fs from 'fs';

let httpServer, httpsServer, currentApp, closeSocketServer

const https_options = {
  key: fs.readFileSync( __dirname+'/certificates/private.key'),
  cert: fs.readFileSync(__dirname+'/certificates/server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

const callback = (port) => ( error ) => {
  if (error) {
    throw error
  }
  console.log(`🚀 started, listening on ${port}`)
}

export const stop = (httpServer, httpsServer) => new Promise((resolve, reject)=>{

  if(!httpServer){
    console.log('first run!')
    return resolve()
  }

  if(currentApp){
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
    return new Promise((resolve,reject)=>httpServer.close((err)=>resolve(true)))
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