import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../domain/Layouts/PrivateLayout/PrivateLayout';
import { PublicLayout } from '../domain/Layouts/PublicLayout/PublicLayout';

export const PublicRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <PrivateLayout {...props}/>
            : <PublicLayout {...props}/>
    )} />
)