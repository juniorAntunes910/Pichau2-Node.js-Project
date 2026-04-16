import express from 'express'

import { CreateUserController } from './modules/users/controllers/CreateUserController';
import { ReadUsersController } from './modules/users/controllers/ReadUsersController';
import { UpdateUserController } from './modules/users/controllers/UpdateUserController';
import { DeleteUserControoler } from './modules/users/controllers/DeleteUserController';
import { AuthenticateUserController } from './modules/accounts/controllers/AutenticateUserController';
import { ensuereAuthenticated } from './shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from './shared/infra/http/middlewares/ensureAdmin';

const router = express.Router();

const createUserController = new CreateUserController();
const readUsersController = new ReadUsersController();
const updateUsersController = new UpdateUserController();
const deleUserController = new DeleteUserControoler();
const authenticateController = new AuthenticateUserController();
// --- Rotas Abertas ---
router.post('/login', (req, res) => authenticateController.handle(req, res));
router.post('/users', (req, res) => createUserController.handle(req, res));

// --- Rotas Protegidas (Precisa de Token) ---
router.get('/users', ensuereAuthenticated, ensureAdmin,  (req, res) => readUsersController.handle(req, res));
router.put('/users/:id', ensuereAuthenticated, ensureAdmin, (req, res) => updateUsersController.handle(req, res));
router.delete('/users/:id', ensuereAuthenticated, ensureAdmin, (req, res) => deleUserController.handle(req, res));

export { router }