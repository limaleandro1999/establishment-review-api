import * as restify from 'restify'

import {ModelRouter} from '../../common/model-router'
import {Establishment} from './establishments.model'

class EstablishmentsRouter extends ModelRouter<Establishment> {
    constructor(){
        super(Establishment)
    }

    applyRoutes(application: restify.Server){
        application.get(`/${this.basePath}`, this.findAll)
        application.get(`/${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`/${this.basePath}`, this.save)
        application.put(`/${this.basePath}/:id`, [this.validateId, this.replace])
        application.patch(`/${this.basePath}/:id`, [this.validateId, this.replace])
        application.del(`/${this.basePath}/:id`, [this.validateId, this.delete])
    }
}

export const establishmentsRouter = new EstablishmentsRouter()