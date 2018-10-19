import {Server} from './src/config/server'

import {establishmentsRouter} from './src/components/establishments/establishments.routes'
import {reviewsRouter} from './src/components/reviews/reviews.router'

const server = new Server()

server.bootstrap([
    establishmentsRouter,
    reviewsRouter
])
.then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})