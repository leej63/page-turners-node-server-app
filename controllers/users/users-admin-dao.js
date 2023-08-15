import usersAdminModel from "./users-admin-model.js";

export const createUser = (user) =>
    usersAdminModel.create(user)

export const findAllUsers = () =>
    usersAdminModel.find()

export const findUserById = (uid) =>
    usersAdminModel.findById(uid)

export const findByUsername = (username) =>
    usersAdminModel.findOne({username})

export const findByCredentials = (username, password) =>
    usersAdminModel.findOne({username, password}, {password:false})

export const deleteUser = (uid) =>
    usersAdminModel.deleteOne({_id: uid})

export const updateUser = (uid, userUpdates) =>
    usersAdminModel.updateOne({_id: uid},
        {$set: userUpdates})