import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Input, Icon, Button, Row } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

import { userActions } from '../../../_actions/user.actions';
import { history } from '../../../_helpers/history';
import { alertActions } from '../../../_actions/alert.actions';
import './EditUserPage.scss';

interface Props extends FormComponentProps {
    dispatch?: any;
    alert?: any;
    users?: any;
    user?: any;
    loading?: any;
    match?: any;
}

interface State {
    username?: string;
    password?: string;
    email?: string;
    submitted?: boolean;
    authentication?: any;
    confirmDirty?: any;
    user?: any;
    id?: any;
    loading?: any;
}

class EditUserPage extends React.Component<Props & FormComponentProps, State> {

    constructor(props: Props & FormComponentProps) {
        super(props);
        const { dispatch } = this.props;

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

        dispatch(userActions.getById(this.props.match.params.id));
    }

    hasErrors(fieldsError: any) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const { user } = this.props;
        const username = this.state.username || user && user.username;
        const email = this.state.email || user && user.email;
        const password = this.state.password || user && user.password;

        this.props.form.validateFields((err, values) => {
            if (!err) {
              this.setState({ ...this.state, submitted: true });
              const { dispatch } = this.props;
              dispatch(userActions.update({ username, password, email, id: this.props.user && this.props.user.id }));
            }
        });
    }

    handleConfirmBlur(e: any) {
        const value = e.target.value;
        this.setState({ ...this.state, confirmDirty: this.state.confirmDirty || !!value });
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
        const { alert, loading } = this.props;
        const { getFieldDecorator } = this.props.form;
        console.log(this.props);

        const { user } = this.props;
        if (user) {
            this.props.form.getFieldDecorator('email', { initialValue: this.state.email || user.email });
            this.props.form.getFieldDecorator('username', { initialValue: this.state.username || user.username });
        }
        const passwordTips = 'Minimum length of 6 characters';

        return (
            user ? 
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
                            validator: this.validateToNextPassword,
                            }, {
                            min: 6, message: 'Minimum length of 6 characters!'
                            }],
                            })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password - Keep empty if you don't want to change it"
                                name="password"
                                onChange={this.handleChange} />
                        )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                required: !!this.state.password, message: 'Please confirm your password!',
                                }, {
                                validator: this.compareToFirstPassword,
                                }],
                            })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Confirm new password"
                                onBlur={this.handleConfirmBlur}
                                onChange={this.handleChange} />
                        )}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                { loading.type === 'button' && loading.state ? <Icon type="loading" /> : 'Update User' }
                            </Button>
                        </Form.Item>
                        {alert.message &&
                        
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            closable />
                        }
                    </Form>
                </Row>
            : null
        );
    }
}

const WrappedRegister = Form.create()(EditUserPage);

function mapStateToProps(state: any) {
    const { alert, loading } = state;
    const { user } = state.users;
    return {
        alert,
        user,
        loading
    };
}

const connectedEditUserPage = connect(mapStateToProps)(WrappedRegister);
export default connectedEditUserPage;