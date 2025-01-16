import { IDocumentRepository } from "../../domain/interfaces/DocumentRepository";
import { DocumentModel } from "../../interface/models/DocumentModel";
import { Document } from "../../domain/entities/Document";

export class DocumentRepository implements IDocumentRepository {
    async findAll(isAdmin: boolean, userId: string) {
        if (isAdmin) {
            return await DocumentModel.find();
        }
        return await DocumentModel.find({ownerID: userId}).exec();
    }

    async findByID(id: string) {
        const value = await DocumentModel.findById(id);
        if (!value) {
            throw new Error("Document not Found!")
        }
        return value
    }

    async create(document: Document) {
        try {
            const documentModel = new DocumentModel(document)
            await documentModel.save()
            return documentModel
        } catch(error) {
            throw new  Error(error as string)
        }
    }

    async update(document: Document, userId: string, isAdmin: boolean) {
        try {
            if (isAdmin) {
                await DocumentModel.findByIdAndUpdate(document.id, document)
            } else {
                await DocumentModel.findOneAndUpdate({_id: document.id, ownerID: userId}, document)
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: string) {
        try {
            const value = await DocumentModel.findByIdAndDelete(id)
            if (!value) {
                throw new Error("Document not found!")
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }
}