import createSocketServer from './server/createSocketServer';
import createExpressApp from './server/createExpressApp';
import { start } from './server/server'

const port = process.env.PORT || 3000

start(createExpressApp, createSocketServer, port)

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept([ './server/server', './server/createExpressApp', './server/createSocketServer' ], () => {
    console.log('🔁  HMR Reloading `./server`...');
    const _createExpressApp = require('./server/createExpressApp').default
    const _createSocketServer = require('./server/createSocketServer').default
    const { start:_start } = require('./server/server')
    _start(_createExpressApp, _createSocketServer, port)

  });
}
