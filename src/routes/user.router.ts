import express from 'express';
import { userController } from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const UserRouter = express.Router();

UserRouter.get('/register', (req, res) => userController.formRegister(req, res));
UserRouter.post('/register',(req, res) => userController.register(req, res));
UserRouter.get('/login', (req, res) => userController.formLogin(req, res));
UserRouter.post('/login',(req, res) => userController.login(req, res));
UserRouter.get('/logout', AuthMiddleware, (req, res) => userController.logout(req, res));

export default UserRouter;