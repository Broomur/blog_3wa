import express from 'express';
import OwnerController from '../controllers/OwnerController';

const OwnerRouter = express.Router();

OwnerRouter.get('/update', OwnerController.form);
OwnerRouter.post('/update', OwnerController.update);

export default OwnerRouter;