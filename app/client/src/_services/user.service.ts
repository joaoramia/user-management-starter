import { authHeader } from '../_helpers/auth-helper';

export const userService = {
    register,
    login,
    logout,
    getAll,
    _delete
};

const { REACT_APP_API_URL } = process.env;

function register(email: string, username: string, password: string, role = 'User') {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username, role })
    };

    return fetch(`${REACT_APP_API_URL}/api/users/register`, requestOptions)
        .then(handleResponse)
        .then(res => res);
}

function login(email: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${REACT_APP_API_URL}/api/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${REACT_APP_API_URL}/api/users`, requestOptions).then(handleResponse);
}

function _delete(id: string) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${REACT_APP_API_URL}/api/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
