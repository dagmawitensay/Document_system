import { Response } from "express";
import { RequestWithUserRole } from "../middlewares/Authmiddleware";
import { DocumentUseCase } from "../../use-case/DocumentUseCase";
import { CreateDocumentDto } from "../dtos/CreateDocumentDto";
import { validate } from "class-validator";
import { Document } from "../../domain/entities/Document";

export class DocumentController {
    constructor(private documentUseCase: DocumentUseCase){}

    async getAll(req: RequestWithUserRole, res: Response) {
        const isAdmin = req.user.role === 'admin' ? req.user.role === 'admin': false;
        const userId = req.user.id;
        const documents = await this.documentUseCase.GetAllDocuments(isAdmin, userId);
        res.json(documents)
    }

    async createDocument(req: RequestWithUserRole, res: Response) {
        const userId = req.user.id;
        const dto = Object.assign(new CreateDocumentDto(), req.body)
        const errors = await validate(dto);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return
        }

        const document = new Document(dto.title, dto.content, userId)
        try {
            const documentResult = await this.documentUseCase.CreateDocument(document);
            res.status(200).json({documentResult})
        } catch (error) {
            res.status(501).json(error)
        }
    }

    async getDocumentById(req: RequestWithUserRole, res: Response) {
        const isAdmin = req.user.role === 'admin' ? req.user.role === 'admin': false;
        const userId = req.user.id;
        const documentId = req.params.id;
        try {
            const document = await this.documentUseCase.GetDocumentByID(documentId);
            if (isAdmin || document?.ownerID == userId) {
                res.status(200).json(document)
                return
            }

            res.status(401).json({"message": "Unauthorized!"})
        } catch (error) {
            res.status(401).json({"error": error})
        }
    }

    async updateDocument(req: RequestWithUserRole, res: Response) {
        const isAdmin = req.user.role === 'admin' ? req.user.role === 'admin': false;
        const userId = req.user.id;
        const documentId = req.params.id;

        const dto = Object.assign(new CreateDocumentDto(), req.body)
        const errors = await validate(dto);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return
        }

        const document = new Document(dto.title, dto.content, userId, documentId)
        try {
            await this.documentUseCase.UpdateDocument(document, userId, isAdmin)
            res.send({"message": "Document updated successfully!"})
        } catch (error) {
            res.send(error)
        }
    }

    async deleteDocument(req: RequestWithUserRole, res: Response) {
        const documentId = req.params.id;
        try {
            await this.documentUseCase.DeleteDocument(documentId)
            res.json({"message": "Document deleted successfully!"})
        } catch (error) {
            res.status(400).json({"error": error})
        } 
    }
}