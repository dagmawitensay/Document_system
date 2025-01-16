import { IDocument } from "../../interface/models/DocumentModel";
import { Document } from "../entities/Document";

export interface IDocumentRepository {
    findAll(isAdmin: boolean, userId: string): Promise<IDocument[]>;
    findByID(id: string): Promise<IDocument | null>;
    create(document: Document): Promise<IDocument>;
    update(document: Document, userId: string, isAdmin: boolean): Promise<void>;
    delete(id: string): Promise<void>;
}