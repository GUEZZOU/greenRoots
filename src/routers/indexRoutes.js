import express from 'express';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
//import adminRouter from './adminRouter.js';
//import campaignRouter from './campaignRouter.js';
//import treeRouter from './treeRouter.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to GreenRoots API');
});

router.use('/users', userRouter);
router.use('/auth', authRouter);
//router.use('/admin', adminRouter);
//router.use('/campaign', campaignRouter);
//router.use('/trees', treeRouter);
export default router;