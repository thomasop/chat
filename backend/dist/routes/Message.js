import express from 'express';
import auth from '../middleware/auth.js';
import { body } from 'express-validator';
import { All, Add } from '../controllers/Message.js';
const messageRouter = express.Router();
messageRouter.get("/all/:id", auth, All);
messageRouter.post('/add', auth, body('content').notEmpty().escape(), Add);
export default messageRouter;
