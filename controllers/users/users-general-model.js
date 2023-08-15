import mongoose from "mongoose";
import UsersGeneralSchema from "./users-general-schema.js";

const usersGeneralModel = mongoose.model('UsersGeneralModel', UsersGeneralSchema);
export default usersGeneralModel;