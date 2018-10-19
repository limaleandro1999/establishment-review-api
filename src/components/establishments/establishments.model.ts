import * as mongoose from 'mongoose'

export interface Establishment extends mongoose.Document{
    name: string,
    businessBranch: string
}

const establishmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6
    },
    businessBranch: {
        type: String,
        required: true,
        enum: ['Food', 'Software', 'Education', 'Engineering', 'Construction']
    }
})

export const Establishment = mongoose.model<Establishment>('Establishment', establishmentSchema)