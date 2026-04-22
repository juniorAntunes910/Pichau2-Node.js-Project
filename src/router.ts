import express from 'express'

import { CreateUserController } from './modules/users/controllers/CreateUserController';
import { ReadUsersController } from './modules/users/controllers/ReadUsersController';
import { UpdateUserController } from './modules/users/controllers/UpdateUserController';
import { DeleteUserControoler } from './modules/users/controllers/DeleteUserController';
import { AuthenticateUserController } from './modules/accounts/controllers/AutenticateUserController';
import { ensuereAuthenticated } from './shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from './shared/infra/http/middlewares/ensureAdmin';
import { CreateProductController } from './modules/products/controllers/CreateProductController';
import { ReadProductController } from './modules/products/controllers/ReadProductController';
import { UpdateProductController } from './modules/products/controllers/UpdateProductController';
import { DeleteProductController } from './modules/products/controllers/DeleteProductController';

const router = express.Router();

const createUserController = new CreateUserController();
const readUsersController = new ReadUsersController();
const updateUsersController = new UpdateUserController();
const deleUserController = new DeleteUserControoler();

const authenticateController = new AuthenticateUserController();

const createProductController = new CreateProductController(); 
const readProductController = new ReadProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

// --- Rotas Abertas ---
router.post('/login', (req, res) => authenticateController.handle(req, res));
router.post('/users', (req, res) => createUserController.handle(req, res));
router.get('/products',  (req, res) =>  readProductController.handle(req, res));
router.get("/me", ensuereAuthenticated, (req: any , res) => {
  // O ensureAuthenticated lê o cookie, valida o JWT e coloca o ID em req.user_id
  // Aqui você pode buscar os dados do usuário no banco se quiser
  return res.json({ 
    user: { id: req.user_id, name: "Usuário Logado" } 
  });
});
// --- Rotas Protegidas (Precisa de Token) ---
router.get('/users', ensuereAuthenticated, ensureAdmin,  (req, res) => readUsersController.handle(req, res));
router.put('/users/:id', ensuereAuthenticated, ensureAdmin, (req, res) => updateUsersController.handle(req, res));
router.delete('/users/:id', ensuereAuthenticated, ensureAdmin, (req, res) => deleUserController.handle(req, res));
router.post('/products', ensuereAuthenticated, ensureAdmin, (req, res) => createProductController.handle(req, res));
router.put('/products/:id', ensuereAuthenticated, ensureAdmin, (req, res) => updateProductController.handle(req, res)); 
router.delete('/products/:id', ensuereAuthenticated, ensureAdmin, (req, res) => deleteProductController.handle(req, res))
export { router }