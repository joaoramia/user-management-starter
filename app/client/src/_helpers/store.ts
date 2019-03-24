import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { alert } from '../_reducers/alert.reducer';
import { users } from '../_reducers/users.reducer';
import { authentication } from '../_reducers/authentication.reducer';

const loggerMiddleware = createLogger();

export const store = createStore(
    combineReducers({
        authentication,
        users,
        alert
    }),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);