import express from 'express';
import session from "express-session";
import cors from 'cors';
import 'dotenv/config';
import BooksController from './controllers/books/books-controller.js';
import AuthController from './controllers/users/auth-controller.js';
import UsersController from './controllers/users/users-controller.js';
import mongoose from 'mongoose';
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING

mongoose.connect(DB_CONNECTION_STRING)

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
UsersController(app);
app.listen(process.env.PORT || 4000);

