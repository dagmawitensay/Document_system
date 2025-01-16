import { Router } from "express";
import { DocumentRepository } from "../../infrastructure/repositories/DocumentRepository";
import { DocumentUseCase } from "../../use-case/DocumentUseCase";
import { DocumentController } from "../controllers/DocumentControllers";
import { authentication, isAdmin } from "../middlewares/Authmiddleware";

const router  = Router();

const documentRepository = new DocumentRepository();
const documentUseCase = new DocumentUseCase(documentRepository);
const documentController = new DocumentController(documentUseCase);

router.get('/', authentication, (req, res) => documentController.getAll(req, res))
router.get('/:id', authentication, (req, res) => documentController.getDocumentById(req, res))
router.post('/', authentication, (req, res) => documentController.createDocument(req, res))
router.put('/:id', authentication, (req, res) => documentController.updateDocument(req, res))
router.delete('/:id', authentication, isAdmin, (req, res) => documentController.deleteDocument(req, res))

export {router as documentRoutes}