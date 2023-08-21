import * as usersDao from "./users-dao.js";
import mongoose from 'mongoose';

const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastname = req.body.password;
    const role = req.body.role;
    if (!username || !password || !firstName || !lastname || !role) {
      res.sendStatus(400);
      return;
    }

    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(409);
      return;
    }

    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        user["role"] = role;
        req.session["currentUser"] = user;
        const newUser = await usersDao.updateUser(user._id, { role: role });
        res.status(200).json(user);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(400);
    }
  };

  const profile = async (req, res) => {
    const id = req.params.uid;

    if (mongoose.Types.ObjectId.isValid(id)) {
        const user = await usersDao.findUserById(id);
        if (!user) {
          res.sendStatus(500);
          return;
        }
        req.session["currentUser"] = user;
        res.status(200).json(user);
    } else {
        res.sendStatus(409);
        return;
    }


  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    const newUser = usersDao.updateUser(currentUser._id, req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.get("/api/users/profile/:uid", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
};
export default AuthController;
