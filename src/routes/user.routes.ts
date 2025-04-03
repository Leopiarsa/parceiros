import express from 'express';
import { UserController } from '../controller/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const customRoute = express.Router();

customRoute.post('/sendFile', authMiddleware, (req, res) => new UserController().sendFile(req, res));

export default customRoute;
