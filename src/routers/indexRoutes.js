import express from 'express';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
//import adminRouter from './adminRouter.js';
import campaignRouter from './campaignRouter.js';
import treesRouter from './treesRouter.js' ;
import checkTokenMiddleware from '../middlewares/checkTokenMiddlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to GreenRoots API');
});

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/campaign', campaignRouter);
router.use('/trees', treesRouter);
//router.use('/admin', adminRouter);

export default router;