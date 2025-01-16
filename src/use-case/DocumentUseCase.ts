import { IDocumentRepository } from "../domain/interfaces/DocumentRepository";
import { Document } from "../domain/entities/Document";

export class DocumentUseCase {
    constructor(private documentRepository: IDocumentRepository) {}
    async GetAllDocuments() {
        return this.documentRepository.findAll();
    }

    async GetDocumentByID(id: string) {
        return this.documentRepository.findByID(id);
    }

    async CreateDocument(document:Document) {
        return this.documentRepository.create(document)
    }

    async UpdateDocument(document: Document) {
        return this.documentRepository.update(document)
    }

    async DeleteDocument(id: string) {
        return this.documentRepository.delete(id)
    }
}