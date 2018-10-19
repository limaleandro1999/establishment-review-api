import {Router} from './router'
import * as mongoose from 'mongoose'
import {NotFoundError} from 'restify-errors'

export abstract class ModelRouter<D extends mongoose.Document> extends Router{
    basePath: string
    
    constructor(protected model: mongoose.Model<D>){
        super()
        this.basePath = `/${model.collection.name}`
    }

    validateId = (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not found'))
        }else{
            next()
        }
    }

    findById = (req, res, next) => {
        this.model
            .findById(req.params.id)
            .then(this.render(res, next))
            .catch(next)
    }

    findAll = (req, res, next) => {
        this.model
            .find()
            .then(this.renderAll(res, next))
            .catch(next)
    }

    save = (req, res, next) => {
        let document = new this.model(req.body)

        document.save()
                .then(this.render(res, next))
                .catch(next)
    }

    replace = (req, res, next) => {
        const options = {runValidators: true, overwrite: true}

        this.model.update({_id: req.params.id}, req.body, options).exec().then(result => {
            if(result.n){
                return this.model.findById(req.params.id)
            }else{
                return new NotFoundError('Document not found')
            }
        })
        .then(this.render(res, next))
        .catch(next)
    }

    update = (req, res, next) => {
        const options = {runValidators: true}

        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(this.render(res, next))
            .catch(next)
    }

    delete = (req, res, next) => {
        this.model.remove({_id : req.params.id}).exec().then((cmdResult: any) => {
            if(cmdResult.result.n){
                res.send(204)
            }else{
                throw new NotFoundError('Document not found')
            }

            return next()
        })
    }

}