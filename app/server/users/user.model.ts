import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: false },
    email: {type: String, unique: true, required: true},
    hash: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    role: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

export interface User {
    username: string,
    email: string,
    hash: string,
    firstName: string,
    lastName: string,
    role: string,
    createdDate: number
}

export const UserModel = mongoose.model('User', schema);