import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import { EventEmitter } from "events";

export abstract class Router extends EventEmitter{
    abstract applyRoutes(application: restify.Server)

    envelope(document: any){
        return document
    }

    envelopeAll(documents: any[]){
        return documents
    }

    render(response: restify.Response, next: restify.Next){
        return (document) => {
            if(document){
                response.json(this.envelope(document))
            }else{
                throw new NotFoundError('Document not found')
            }

            return next(false)
        }
    }

    renderAll(response: restify.Response, next: restify.Next){
        return(documents: any[]) => {
            if(documents){
                documents.forEach((document, index, array) => {
                    array[index] = this.envelope(document)
                })

                response.json(this.envelopeAll(documents))
            }else{
                response.json(this.envelopeAll([]))
            }

            return next(false)
        }
    }
}