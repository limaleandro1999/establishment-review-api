import {Server} from './src/config/server'

import {establishmentRouter} from './src/components/establishments/establishment.routes'

const server = new Server()

server.bootstrap([
    establishmentRouter
])
.then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})