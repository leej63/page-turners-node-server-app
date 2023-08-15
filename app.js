import express from 'express'
import mongoose from "mongoose";
import cors from 'cors';
import session from 'express-session'
import ProfileController from "./controllers/profile/profile-controller.js";
import GeneralUserController from "./controllers/users/users-general-controller.js"
import AdminUserController from "./controllers/users/users-admin-controller.js"


const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/page-turners'
mongoose.connect(CONNECTION_STRING).then(() => console.log('Successfully connected to DB!') );

const app = express()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

app.use(session({
  secret: 'any string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true}
}))

app.use(express.json())


GeneralUserController(app)
AdminUserController(app)
ProfileController(app)

app.listen(process.env.PORT ||4000)


