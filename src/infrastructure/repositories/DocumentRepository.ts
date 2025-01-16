import { IDocumentRepository } from "../../domain/interfaces/DocumentRepository";
import { DocumentModel } from "../../interface/models/DocumentModel";
import { Document } from "../../domain/entities/Document";

export class DocumentRepository implements IDocumentRepository {
    async findAll() {
        return DocumentModel.find();
    }

    async findByID(id: string) {
        return DocumentModel.findById(id);
    }

    async create(document: Document) {
        try {
            const documentModel = new DocumentModel(document)
            documentModel.save()
            return documentModel
        } catch(error) {
            throw new  Error(error as string)
        }
    }

    async update(document: Document) {
        // try {
        //     DocumentModel.findByIdAndUpdate(document.id)
        // }
    }

    async delete(id: string) {

    }
}