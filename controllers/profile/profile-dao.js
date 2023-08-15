import profileModel from "./profile-model.js";

export const updateProfile = (pid, profile) =>
    profileModel.updateOne({_id: pid}, {$set: profile});

export const findTheProfile = (pid) =>
    profileModel.findOne({_id:pid});
    
export const findProfile = () =>
    profileModel.find();