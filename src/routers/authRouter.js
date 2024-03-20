import express from 'express';
import {loginForm} from '../controllers/authController.js'; 


const authRouter = express.Router();

//authRouter.get('/', login);login,
authRouter.post('/login', loginForm);//gérer la connexion d'un utilisateur. 


export default authRouter; 