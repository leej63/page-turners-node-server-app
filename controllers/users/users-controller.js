import * as usersDao from "./users-dao.js";

const UsersController = (app) => {
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
};

const findAllUsers = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username && password) {
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else if (username) {
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    const users = await usersDao.findAllUsers();
    res.json(users);
  }
};

const findUserById = async (req, res) => {
  const id = req.params.id;
  const user = await usersDao.findUserById(id);
  res.json(user);
};

const createUser = async (req, res) => {
  const newUser = await usersDao.createUser(req.body);
  res.json(newUser);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const status = await usersDao.deleteUser(id);
  res.json(status);
};

const updateUser = async (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const role = req.body.role;
  if (!username || !firstName || !lastName || !role) {
    res.sendStatus(400);
    return;
  }
  
  const id = req.params.uid;
  const user = await usersDao.updateUser(id, req.body);

  req.session["currentUser"] = user;
  res.json(user);
};

export default UsersController;
