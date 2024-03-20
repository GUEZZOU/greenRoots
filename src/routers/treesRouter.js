import express from 'express';
import {getAllTrees, getTree, addTree, updateTree, untrashTree, trashTree} from '../controllers/treesController.js';
const treesRouter = express.Router();

treesRouter.get('/', getAllTrees);// pour récupérer toutes les arbres

treesRouter.get('/:id', getTree);// pour récupérer  une arbre en fonction de son id

treesRouter.post('/', addTree);// pour  ajouter une arbre

treesRouter.put("/:id", updateTree);// pour modifier une arbre

treesRouter.post('/untrash/:id', untrashTree);// pour restaurer une arbre

treesRouter.delete('/trash/:id', trashTree);// pour supprimer une arbre

export default treesRouter;