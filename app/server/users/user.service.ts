import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../_helpers/db';
import { User, UserModel } from './user.model';

const User = db.User;

const { JWT_SECRET } = process.env;

interface UserParam extends User {
    password: string
}

export async function authenticate(data: { email: string, password: string }) {
    const { email, password } = data;
    const user: any = await UserModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET || '');
        return {
            ...userWithoutHash,
            token
        };
    }
}

export async function getAll() {
    return await UserModel.find().select('-hash');
}

export async function getById(id: string) {
    return await UserModel.findById(id).select('-hash');
}

export async function create(userParam: UserParam) {
    // validate
    if (await UserModel.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }
    if (await UserModel.findOne({ username: userParam.username })) {
        throw 'username "' + userParam.username + '" is already taken';
    }

    const user: any = new User(userParam);
    if (!user.role) {
        user.role = 'User';
    }

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

export async function update(id: string, userParam: UserParam) {
    const user: any = await UserModel.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await UserModel.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }
    if (user.username !== userParam.username && await UserModel.findOne({ username: userParam.username })) {
        throw 'username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();

    return user;
}

export async function _delete(_id: string) {
    await UserModel.findOneAndDelete({_id});
}