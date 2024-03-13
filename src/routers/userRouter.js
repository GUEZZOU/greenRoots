import express from 'express';
import checkTokenMiddleware from '../middlewares/checkTokenMiddlewares.js';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, softDeleteUser, restoreUser, getProfil} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);// on utilise la méthode put pour modifier une ressource
userRouter.delete('/:id', deleteUser);
userRouter.delete('/:id', softDeleteUser);
userRouter.delete('/:id', restoreUser);

userRouter.get('/profile', checkTokenMiddleware,  getProfil);

export default userRouter;