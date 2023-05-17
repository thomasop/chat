import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import conversationRouter from "./routes/Conversation.js";
import messageRouter from "./routes/Message.js";
import userRouter from "./routes/User.js";
dotenv.config();
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser(process.env.SECRET_COOKIE));
/* app.use(session({
    secret: process.env.SECRET_COOKIE!,
  })) */
app.use('/user', userRouter);
app.use('/conversation', conversationRouter);
app.use('/message', messageRouter);
export default app;
