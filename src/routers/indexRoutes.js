import express from 'express';


const router = express.Router();
import user_router from './user.js';

router.get('/', (req, res) => res.send('Hello World!')) // crée une route qui renvoie "Hello World!" en réponse à une requête GET sur la racine du serveur

router.use('/users', user_router);

export default router;