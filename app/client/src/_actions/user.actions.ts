import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../_helpers/history';

export const userActions = {
    register,
    login,
    logout,
    getAll,
    _delete
};

function login(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/panel/users');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };

    function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(email: string, username: string, password: string, role = 'User') {
    return (dispatch: any) => {
        dispatch(request({ username }));

        userService.register(email, username, password, role)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success(String('User successfully registered, you may now login')));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };

    function request(user: any) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user: any) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return (dispatch: any) => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users: any) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error: any) { return { type: userConstants.GETALL_FAILURE, error } }
}

function _delete(id: string) {
    return (dispatch: any) => {
        dispatch(request());

        userService._delete(id)
            .then(
                users => dispatch(success(id)),
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)))
                }
            );
    };

    function request() { return { type: userConstants.DELETE_REQUEST } }
    function success(id: string) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(error: any) { return { type: userConstants.DELETE_FAILURE, error } }
}