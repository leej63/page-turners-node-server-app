import mongoose from 'mongoose';
import UserSchema from '../users/user-schema.js';

const profileModel = mongoose.model('ProfileModel', UserSchema);
export default profileModel;