import express from 'express'

//User
import { CreateUserController } from './modules/users/controllers/CreateUserController';
import { ReadUsersController } from './modules/users/controllers/ReadUsersController';
import { UpdateUserController } from './modules/users/controllers/UpdateUserController';
import { DeleteUserControoler } from './modules/users/controllers/DeleteUserController';

//Acout 
import { AuthenticateUserController } from './modules/accounts/controllers/AutenticateUserController';
const router = express.Router();
const UserController = new CreateUserController();
router.post('/users', (req, res) => UserController.handle(req, res));
const readUsersController = new ReadUsersController();
router.get('/users', (req, res) => readUsersController.handle(req, res));
const updateUsersControlle = new UpdateUserController();
router.put('/users/:id', (req, res) => updateUsersControlle.handle(req, res));
const deleUserController = new DeleteUserControoler();
router.delete('/users/:id', (req, res) => deleUserController.handle(req, res));
const authenticateController = new AuthenticateUserController();
router.post('/login', (req, res) => authenticateController.handle(req, res));



export { router}




