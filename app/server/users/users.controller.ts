import express, { Request, Response } from 'express';
import * as userService from './user.service';
import { authorize } from '../_helpers/authorize';
import { roles } from '../_helpers/role';

export const router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/registerAdmin', authorize(roles.Admin), registerAdmin);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function authenticate(req: Request, res: Response, next: Function) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req: Request, res: Response, next: Function) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function registerAdmin(req: Request, res: Response, next: Function) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req: Request, res: Response, next: Function) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req: any, res: Response, next: Function) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req: Request, res: Response, next: Function) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req: Request, res: Response, next: Function) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req: Request, res: Response, next: Function) {
    userService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}