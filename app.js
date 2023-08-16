import express from 'express';
import session from "express-session";
import cors from 'cors';
import 'dotenv/config';
import BooksController from './controllers/books/books-controller';
import AuthController from './controllers/users/auth-controller';
import mongoose from 'mongoose';
mongoose.connect("mongodb://127.0.0.1:27017/page-turner")


const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUnititialized: false,
};
if (process.env.NODE_ENV === "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
};
app.use(
    session(sessionOptions)  
);
app.use(express.json());
BooksController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);