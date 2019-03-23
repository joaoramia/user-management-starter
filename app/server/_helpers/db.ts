import mongoose from 'mongoose';
import { UserModel } from '../users/user.model';

mongoose.connect(process.env.MONGODB_URI || '', { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

export const db = { User: UserModel };