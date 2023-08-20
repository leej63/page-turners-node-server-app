import express from 'express';
import session from "express-session";
import cors from 'cors';
import 'dotenv/config';
import BooksController from './controllers/books/books-controller.js';
import UserController from './controllers/users/users-controller.js';
import AuthController from './controllers/users/auth-controller.js';
import mongoose from 'mongoose';
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING ? process.env.DB_CONNECTION_STRING: 'mongodb://127.0.0.1:27017/page-turner';
mongoose.connect(CONNECTION_STRING)


const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
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
UserController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);