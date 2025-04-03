import express from 'express';
import { OportunidadeController } from '../controller/oportunidade.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const oportunidadesRoute = express.Router();

const oportunidadeController = new OportunidadeController();

oportunidadesRoute.get('/parceiro/:parceiroID', authMiddleware, (req, res) =>
  oportunidadeController.getOportunidadesByParceiro(req, res)
);

oportunidadesRoute.post('/filter', authMiddleware, (req, res) => {
  oportunidadeController.filterOportunidadesByDate(req, res);
});

export default oportunidadesRoute;
