import { IDocumentRepository } from "../domain/interfaces/DocumentRepository";
import { Document } from "../domain/entities/Document";

export class DocumentUseCase {
    constructor(private documentRepository: IDocumentRepository) {}
    async GetAllDocuments(isAdmin: boolean, userId: string) {
        return await this.documentRepository.findAll(isAdmin, userId);
    }

    async GetDocumentByID(id: string) {
        return await this.documentRepository.findByID(id);
    }

    async CreateDocument(document:Document) {
        return await this.documentRepository.create(document)
    }

    async UpdateDocument(document: Document, userId: string, isAdmin: boolean) {
        return await this.documentRepository.update(document, userId, isAdmin)
    }

    async DeleteDocument(id: string) {
        return await this.documentRepository.delete(id)
    }
}