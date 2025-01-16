import mongoose, { Schema } from "mongoose";

interface IDocument extends Document {
    title: string,
    content: string,
    ownerID: string,
    createdAt: Date,
    updatedAt: Date,
}

const DocumentSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    },
}, { timestamps: true },)

const DocumentModel = mongoose.model<IDocument>('Documents', DocumentSchema)
export {DocumentModel, IDocument}