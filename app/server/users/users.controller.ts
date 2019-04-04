import express, { Request, Response } from 'express';
import * as userService from './user.service';
import { authorize, RequestType } from '../_helpers/authorize';
import { roles } from '../_helpers/role';
import { User } from './user.model';

export const router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/registerAdmin', authorize(roles.Admin), registerAdmin);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(roles.Admin), _delete);

function authenticate(req: any, res: Response, next: Function) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req: any, res: Response, next: Function) {
    userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function registerAdmin(req: any, res: Response, next: Function) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req: any, res: Response, next: Function) {
    userService.getAll()
        .then(users => {
            const {role} = req.user;
            const result = (users || []).filter((user: any) => {
                if (role === 'User') {
                    return user.role !== 'Admin' && user._id != req.user.sub
                }
                return user._id != req.user.sub
            });
            return res.json(result)
        })
        .catch(err => next(err));
}

function getCurrent(req: any, res: Response, next: Function) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req: any, res: Response, next: Function) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req: any, res: Response, next: Function) {
    if (req.user.role !== 'Admin' && req.body.id !== req.user.sub) {
        return res.status(403).send({message: 'You should not be trying that :)'})
    }
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function _delete(req: any, res: Response, next: Function) {
    if (req.params.id === req.user.sub) {
        return res.status(400).send({message: 'You should not delete yourself :)'})
    }
    userService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}