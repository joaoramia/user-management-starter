import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Input, Icon, Button, Checkbox, Col, Row, Tooltip } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

import { userActions } from '../../_actions/user.actions';
import { history } from '../../_helpers/history';
import { alertActions } from '../../_actions/alert.actions';
import './RegisterPage.scss';
import { Link } from 'react-router-dom';

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
    email?: string;
    submitted?: boolean;
    authentication?: any;
    confirmDirty?: any;
}

class RegisterPage extends React.Component<Props & FormComponentProps, State> {

    constructor(props: Props & FormComponentProps) {
        super(props);
        const { dispatch } = this.props;
        // reset login status
        dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            email: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);

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
        const { username, password, email } = this.state;

        this.props.form.validateFields((err, values) => {
            if (!err && username && password && email) {
              this.setState({ submitted: true });
              const { dispatch } = this.props;
              dispatch(userActions.register(email, username, password));
            }
        });
    }

    handleConfirmBlur(e: any) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    
    compareToFirstPassword (rule: any, value: any, callback: any) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
        callback('The passwords that you enter are inconsistent!');
        } else {
        callback();
        }
    }
    
    validateToNextPassword (rule: any, value: any, callback: any) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { loggingIn, alert } = this.props;
        const { getFieldDecorator } = this.props.form;
        const passwordTips = 'Minimum length of 6 characters';

        return (
            <Row type="flex" justify="center">
                <Form name="form" onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                            required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={this.handleChange} />
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                name="username"
                                onChange={this.handleChange} />
                        )}
                    </Form.Item>

                    <Form.Item help={passwordTips}>
                    {getFieldDecorator('password', {
                        rules: [{
                        required: true, message: 'Please input your password!',
                        }, {
                        validator: this.validateToNextPassword,
                        }, {
                        min: 6, message: 'Minimum length of 6 characters!'
                        }],
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
                        {getFieldDecorator('confirm', {
                            rules: [{
                            required: true, message: 'Please confirm your password!',
                            }, {
                            validator: this.compareToFirstPassword,
                            }],
                        })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm password"
                            onBlur={this.handleConfirmBlur}
                            onChange={this.handleChange} />
                    )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            { loggingIn ? <Icon type="loading" /> : 'Register' }
                        </Button>
                        Or, <Link to="/login">login now!</Link>
                    </Form.Item>
                    {alert.message &&
                    
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        closable />
                    }
                </Form>
            </Row>
        );
    }
}

const WrappedRegister = Form.create()(RegisterPage);

function mapStateToProps(state: any) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        alert
    };
}

const connectedRegisterPage = connect(mapStateToProps)(WrappedRegister);
export default connectedRegisterPage;