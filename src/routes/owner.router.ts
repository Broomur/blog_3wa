import express from 'express';
import { ownerController } from '../controllers/owner.controller';

const OwnerRouter = express.Router();

OwnerRouter.get('/update', (req, res) => ownerController.form(req, res));
OwnerRouter.post('/update', (req, res) => ownerController.update(req, res));

export default OwnerRouter;