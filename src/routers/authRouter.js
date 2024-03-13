import express from 'express';
import {loginForm} from '../controllers/authController.js';
import  checkTokenMiddleware  from '../middlewares/checkTokenMiddlewares.js';

const authRouter = express.Router();

//authRouter.get('/', login);login,
authRouter.post('/login', checkTokenMiddleware, loginForm);//gérer la connexion d'un utilisateur. 


export default authRouter; 