import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Input, Icon, Button, Checkbox } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

import { userActions } from '../../_actions/user.actions';
import { history } from '../../_helpers/history';
import { alertActions } from '../../_actions/alert.actions';
import './LoginPage.scss';

interface Props extends FormComponentProps {
    dispatch?: any;
    alert?: any;
    users?: any;
    user?: any;
    loggingIn?: any;
}

interface State {
    username?: string;
    password?: string;
    submitted?: boolean;
    authentication?: any;
}

class LoginPage extends React.Component<Props & FormComponentProps, State> {

    constructor(props: Props & FormComponentProps) {
        super(props);
        const { dispatch } = this.props;

        // reset login status
        dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    hasErrors(fieldsError: any) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const { username, password } = this.state;

        this.props.form.validateFields((err, values) => {
            if (!err && username && password) {
              this.setState({ submitted: true });
              const { dispatch } = this.props;
              dispatch(userActions.login(username, password));
            }
        });
    }

    render() {
        const { loggingIn, alert } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form name="form" onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            name="username"
                            onChange={this.handleChange} />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange} />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    { loggingIn ? <Icon type="loading" /> : 'Login' }
                </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
                {alert.message &&
                
                <Alert
                    message={alert.message}
                    type={alert.type}
                    closable />
                }
            </Form>
        );
    }
}

const WrappedLogin = Form.create()(LoginPage);

function mapStateToProps(state: any) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(WrappedLogin);
export default connectedLoginPage;