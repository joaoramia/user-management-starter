import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css'

import { history } from '../_helpers/history';
import { alertActions } from '../_actions/alert.actions';
import { PublicRoute } from '../_components/PublicRoute';
import { message } from 'antd';

interface Props {
    dispatch: any;
    alert: any;
}

interface State {}

class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;

        const feedback = (type: string, text: string) => {
            switch (type) {
                case 'success':
                    message.success(text);
                    break;
                case 'error':
                    message.error(text);
                    break;
                default:
                    message.warning(text);
            }
        };

        return (
            <Router history={history}>
                <PublicRoute path="/"/>
                {alert.message && !alert.hideAlert && feedback(alert.type, alert.message)}
            </Router>
        );
    }
}

function mapStateToProps(state: any) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
