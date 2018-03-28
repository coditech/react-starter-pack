import SocketIo from 'socket.io'

export default function createSocket(server){

  let userId = 0

  const users = []

  const io = SocketIo(server);

  io.on('connection', (socket) => {

    const id = `user`+(userId++)

    socket.emit('user_id',id)
    
    users.push(id)

    socket.on('disconnect', function(){
        console.log('user disconnected');
        const index = users.findIndex(user => user === id )
        if(index>=0){ 
          users.splice(index,1)
          io.emit('quit',id)
        }
    });
    
    socket.on('message', (text) => {
        io.emit('message', { id, text })
    })

  });

  const close = () => io.close()

  return close
}