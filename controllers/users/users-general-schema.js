import mongoose from "mongoose";

const usersGeneralSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role : {
    type: String,
    required: true,
    enum: ['General','Admin']
  },
  email: {
    type: String,
    required: true
  },

  following:String,
  followers: String,
}, {versionKey: false,collection: 'users'},{typeKey: '$type'});

export default usersGeneralSchema;