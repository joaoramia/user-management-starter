import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../_helpers/history';
import { loadingActions } from './loading.actions';

export const userActions = {
    register,
    login,
    logout,
    getAll,
    getById,
    update,
    create,
    _delete,
    clean
};

function login(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ username }));
        dispatch(loadingActions.page(true));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success(`Welcome to the application :)`));
                    dispatch(loadingActions.page(false));
                    history.push('/panel/users');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(String(error), true));
                    dispatch(loadingActions.page(false));
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
        dispatch(loadingActions.button(true));

        userService.register(email, username, password, role)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success('User successfully registered, you may now login', true));
                    dispatch(loadingActions.button(false));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(String(error), true));
                    dispatch(loadingActions.button(false));
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
        dispatch(userActions.clean());
        dispatch(request());
        dispatch(loadingActions.page(true));

        userService.getAll()
            .then(
                users => dispatch(success(users)) && dispatch(loadingActions.page(false)),
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)))
                    dispatch(loadingActions.page(false));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users: any) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error: any) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(id: string) {
    return (dispatch: any) => {
        dispatch(userActions.clean());
        dispatch(loadingActions.page(true));
        dispatch(request(id));

        userService.getById(id)
            .then(
                user => dispatch(success(user)) && dispatch(loadingActions.page(false)),
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                    dispatch(loadingActions.page(false));
                }
            );
    };

    function request(id: string) { return { type: userConstants.GETBYID_REQUEST, id } }
    function success(user: any) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function update(user: any) {
    return (dispatch: any) => {
        dispatch(request(user));
        dispatch(loadingActions.button(true));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success(String('User successfully updated'), true));
                    dispatch(loadingActions.button(false));
                },
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error), true));
                    dispatch(loadingActions.button(false));
                }
            );
    };

    function request(user: string) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user: any) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function create(user: any) {
    return (dispatch: any) => {
        dispatch(request(user));
        dispatch(loadingActions.button(true));

        userService.create(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success(String('User successfully created'), true));
                    dispatch(loadingActions.button(false));
                },
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error), true));
                    dispatch(loadingActions.button(false));
                }
            );
    };

    function request(user: string) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user: any) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function _delete(id: string) {
    return (dispatch: any) => {
        dispatch(request());
        dispatch(loadingActions.button(true));

        userService._delete(id)
            .then(
                users => {
                    dispatch(success(id));
                    dispatch(alertActions.success(String('User successfully deleted')));
                    dispatch(loadingActions.button(false));
                },
                error => { 
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                    dispatch(loadingActions.button(false));
                }
            );
    };

    function request() { return { type: userConstants.DELETE_REQUEST } }
    function success(id: string) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(error: any) { return { type: userConstants.DELETE_FAILURE, error } }
}

function clean() {
    return (dispatch: any) => dispatch({ type: userConstants.CLEAN });
}