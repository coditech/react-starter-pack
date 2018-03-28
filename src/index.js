import http from 'http';
import { express, socket } from './server';

const server = http.createServer(express);

let currentApp = express;
//let closeSocketServer = 
socket(server)

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error)
  }
  
  console.log('🚀 started')
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    //closeSocketServer()
    const { express } = require('./server');
    server.on('request', express);
    //closeSocketServer = 
    socket(server)
    currentApp = express;
  });
}
