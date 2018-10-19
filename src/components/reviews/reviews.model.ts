import * as mongoose from 'mongoose'
import { Establishment } from '../establishments/establishments.model';

export interface Review extends mongoose.Document {
    date: Date
    rating: number
    comment: string
    establishment: mongoose.Types.ObjectId | Establishment
}

export interface ReviewModel extends mongoose.Model<Review> {
    findByEstablishmentId(establishmentId: any): Promise<Review>
}

const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    establishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    }
})

reviewSchema.statics.findByEstablishmentId = function(establishmentId: any){
    return this.find({establishment: establishmentId})
}

export const Review = mongoose.model<Review, ReviewModel>('Review', reviewSchema) 