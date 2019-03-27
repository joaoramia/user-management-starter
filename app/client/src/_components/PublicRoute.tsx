import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoggedIn } from '../domain/Layouts/LoggedIn/LoggedIn';
import { LoggedOut } from '../domain/Layouts/LoggedOut/LoggedOut';

export const PublicRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <LoggedIn {...props}/>
            : <LoggedOut {...props}/>
    )} />
)