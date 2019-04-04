import React from "react";
import { connect } from "react-redux";
import { Alert, Form, Input, Icon, Button, Row, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";

import { userActions } from "../../../_actions/user.actions";
import { history } from "../../../_helpers/history";
import { alertActions } from "../../../_actions/alert.actions";
import "./CreateUserPage.scss";
import { UsersMenu } from "../UsersMenu/UsersMenu";
import RadioGroup from "antd/lib/radio/group";

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
  role?: string;
  submitted?: boolean;
  authentication?: any;
  confirmDirty?: any;
  user?: any;
  id?: any;
  loading?: any;
}

class CreateUserPage extends React.Component<
  Props & FormComponentProps,
  State
> {
  constructor(props: Props & FormComponentProps) {
    super(props);
    const { dispatch } = this.props;

    this.state = {
      username: "",
      password: "",
      email: "",
      submitted: false,
      role: 'User'
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
    this.setState({ ...this.state, [name]: value });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const role = this.state.role;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ ...this.state, submitted: true });
        const { dispatch } = this.props;
        dispatch(userActions.create({ username, password, email, role }));
      }
    });
  }

  handleConfirmBlur(e: any) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      confirmDirty: this.state.confirmDirty || !!value
    });
  }

  compareToFirstPassword(rule: any, value: any, callback: any) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("The passwords that you enter are inconsistent!");
    } else {
      callback();
    }
  }

  validateToNextPassword(rule: any, value: any, callback: any) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }

  render() {
    const { alert, loading, user } = this.props;
    const { getFieldDecorator } = this.props.form;

    const passwordTips = "Minimum length of 6 characters";

    return (
      <div>
        <UsersMenu {...this.props} />
        <Row type="flex" justify="center">
          <Form
            name="form"
            onSubmit={this.handleSubmit}
            className="register-form"
          >
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
              )}
            </Form.Item>

            <Form.Item help={passwordTips}>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input the password!",
                    whitespace: true
                  },
                  {
                    validator: this.validateToNextPassword
                  },
                  {
                    min: 6,
                    message: "Minimum length of 6 characters!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm the password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Confirm new password"
                  onBlur={this.handleConfirmBlur}
                  onChange={this.handleChange}
                />
              )}
            </Form.Item>

            {
              user && user.role === 'Admin' ? 
              <Form.Item>
                <RadioGroup onChange={this.handleChange} name="role" value={this.state.role}>
                  <Radio value={"User"}>
                    User
                  </Radio>
                  <Radio value={"Admin"}>Admin</Radio>
                </RadioGroup>
              </Form.Item> :
              null
            }

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                {loading.type === "button" && loading.state ? (
                  <Icon type="loading" />
                ) : (
                  "Create User"
                )}
              </Button>
            </Form.Item>
            {alert.message && (
              <Alert message={alert.message} type={alert.type} closable />
            )}
          </Form>
        </Row>
      </div>
    );
  }
}

const WrappedRegister = Form.create()(CreateUserPage);

function mapStateToProps(state: any) {
  const { alert, loading } = state;
  const { user } = state.authentication;
  return {
    alert,
    user,
    loading
  };
}

const connectedCreateUserPage = connect(mapStateToProps)(WrappedRegister);
export default connectedCreateUserPage;
