import express from 'express';
import { ParceiroController } from '../controller/parceiro.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const parceiroRoute = express.Router();
const parceiroController = new ParceiroController();

parceiroRoute.get('/', authMiddleware, (req, res) => parceiroController.getAllParceiros(req, res));

export default parceiroRoute;
