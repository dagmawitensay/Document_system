import { Request, Response } from "express";
import { DocumentUseCase } from "../../use-case/DocumentUseCase";

export class DocumentController {
    constructor(private documentUseCase: DocumentUseCase){}

    async getAll(req: Request, res: Response) {
        
    }
}