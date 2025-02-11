import express from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/authMiddleware';

const UserRouter = express.Router();

UserRouter.get('/register', UserController.formRegister);
UserRouter.post('/register', UserController.register);
UserRouter.get('/login', UserController.formLogin);
UserRouter.post('/login', UserController.login);
UserRouter.get('/logout', AuthMiddleware, UserController.logout);

export default UserRouter;