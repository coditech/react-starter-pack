/********************************************************************
 * A very bare-bones and stupid socket server that does very little.
 * Consider it a starting point for your own socket server, if you 
 * need one.
 */
import SocketIo from 'socket.io'

// this function creates and sets up the socket server
// it's usually not needed, but in our case, we want to 
// bring down the previous socket server and set up a new
// one every time the server refreshes
export default function createSocketServer(server){

  let userId = 0

  const users = []

  const io = SocketIo(server);

  // this runs every time a browser connects
  io.on('connection', ( socket ) => {

    const id = `user`+(userId++)

    socket.emit('user_id',id) // we send the user their id
    
    users.push(id)

    // this runs everytime a browser disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected');
        const index = users.findIndex(user => user === id )
        if(index>=0){ 
          users.splice(index,1)
          io.emit('quit',id)
        }
    });
    
    // this runs everytime a browser sends the "message" signal
    socket.on('message', (text) => {
        io.emit('message', { id, text }) // we emit back the message to all users
    })

  });

  const close = (cb) => io.close(cb) // this allows us to kill the server

  return close
}