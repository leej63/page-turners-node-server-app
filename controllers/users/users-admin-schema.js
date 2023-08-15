import mongoose from 'mongoose';

const usersAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role : {
    type: String,
    required: true,
    enum: ['General','Admin']
  },
}, {versionKey: false,collection: 'users'},{typeKey: '$type'});

export default usersAdminSchema;