import { IDocument } from "../../interface/models/DocumentModel";
import { Document } from "../entities/Document";

export interface IDocumentRepository {
    findAll(): Promise<IDocument[]>;
    findByID(id: string): Promise<IDocument | null>;
    create(document: Document): Promise<IDocument>;
    update(document: Document): Promise<void>;
    delete(id: string): Promise<void>;
}