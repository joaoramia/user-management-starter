import expressJwt from 'express-jwt';
import { Response, Request } from 'express-serve-static-core';

import { User } from '../users/user.model';

const { JWT_SECRET } = process.env;

interface RequestType extends Request {
    user: User
}

export function authorize(roles: string[] | string = []): Array<any> {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret: JWT_SECRET  || '' }).unless({
            path: [
                // public routes that don't require authentication
                '/api/users/authenticate',
                '/api/users/register'
            ]
        }),

        // authorize based on user role
        (req: RequestType, res: Response, next: Function) => {
            const role = req.user ? req.user.role : '';

            if (roles.length && !roles.includes(role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}