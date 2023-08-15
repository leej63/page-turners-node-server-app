import usersGeneralModel from "./users-general-model.js";

export const createUser = (user) =>
    usersGeneralModel.create(user)

export const findAllUsers = () =>
    usersGeneralModel.find()

export const findUserById = (uid) =>
    usersGeneralModel.findById(uid)

export const findByUsername = (username) =>
    usersGeneralModel.findOne({username})

export const findByCredentials = (username, password) =>
    usersGeneralModel.findOne({username, password}, {password:false})

export const deleteUser = (uid) =>
    usersGeneralModel.deleteOne({_id: uid})

export const updateUser = (userUpdates) =>
    usersGeneralModel.updateOne({_id: userUpdates._id},
        {$set: userUpdates})

export const welcomeRecentNewUsers = () =>
    usersGeneralModel.find().sort({_id:-1}).limit(4)