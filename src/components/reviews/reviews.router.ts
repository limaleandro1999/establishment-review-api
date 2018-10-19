import * as restify from 'restify'
import * as mongoose from 'mongoose'

import {ModelRouter} from '../../common/model-router'
import {Review} from './reviews.model'
import {NotFoundError} from 'restify-errors'

class ReviewsRouter extends ModelRouter<Review> {
    constructor(){
        super(Review)
    }

    findByEstablishmentId = (req, res, next) => {
        if(req.query.establishmentId !== undefined){
            if(mongoose.Types.ObjectId.isValid(req.query.establishmentId)){
                Review.findByEstablishmentId(req.query.establishmentId)
                      .then(review => review ? [review] : [])
                      .then(this.renderAll(res, next))
                      .catch(next)
            }else{
                new NotFoundError('Document not found')
            }
            
            next(false)
        }else{
            next()
        }
    }

    applyRoutes(application: restify.Server){
        application.get(`/${this.basePath}`, [this.findByEstablishmentId, this.findAll])
        application.get(`/${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`/${this.basePath}`, this.save)
        application.put(`/${this.basePath}/:id`, [this.validateId, this.replace])
        application.patch(`/${this.basePath}/:id`, [this.validateId, this.replace])
        application.del(`/${this.basePath}/:id`, [this.validateId, this.delete])
    }
}

export const reviewsRouter = new ReviewsRouter()