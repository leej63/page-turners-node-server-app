import mongoose from 'mongoose';
import UsersAdminSchema from "./users-admin-schema.js";


const usersAdminModel = mongoose.model('UserAdminModel', UsersAdminSchema);
export default usersAdminModel;