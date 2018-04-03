import http from 'http';


let server, currentApp, closeSocketServer

export const stop = (server) => new Promise((resolve, reject)=>{
  if(!server){
    console.log('first run!')
    return resolve()
  }

  if(currentApp){
    server.removeListener('request', currentApp);
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
  if(server){
    return new Promise((resolve,reject)=>server.close((err)=>resolve(true)))
  }
  return true
})

export const start = ( createExpressApp, createSocketServer, port ) => 
  new Promise((resolve,reject)=>
    stop(server).then(()=>{

      server = http.createServer();

      currentApp = createExpressApp()

      server.on('request', currentApp)
    
      closeSocketServer = createSocketServer(server)
    
      server.listen( port, ( error ) => {
        if (error) {
          return reject(error)
        }
        console.log(`🚀 started, listening on ${port}`)
        resolve()
      });
    })
  )

export default start