import express from 'express';
import userCtrl from '../controllers/user.js';

const router = express.Router(); // crée un routeur

router.get('/', userCtrl.getAllUsers); // récupérer les utilisateurs existants
router.get('/:id', userCtrl.getUsers); // récupérer un seul utilisateur existant

router.post('', userCtrl.addUser); // créer un nouvel utilisateur


export default router; 