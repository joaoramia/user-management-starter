import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, message, Menu, Icon } from 'antd';

import { userActions } from '../../../_actions/user.actions';
import './UsersMenu.scss';
import SubMenu from 'antd/lib/menu/SubMenu';

interface Props {
    dispatch?: any;
    alert?: any;
    users?: any;
    user?: any;
    history?: any;
    location?: any;
}

interface State {
    current: string;
}

class UsersMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    handleClick = (e: any) => {
        const { history } = this.props;
        history.push(e.key);
        this.setState({
          current: e.key,
        });
    }

    render() {
        const { location } = this.props;

        const pathname = location ? location.pathname : null;

        if (!pathname) {
            return null;
        }

        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[pathname]}
                mode="horizontal"
            >
                <Menu.Item key="/panel/users">
                    <Icon type="user" />Users List
                </Menu.Item>
                <Menu.Item key="/panel/users/create">
                    <Icon type="user-add" />Create User
                </Menu.Item>
                <Menu.Item key="/panel/users/" disabled>
                    <Icon type="user-add" />Edit User
                </Menu.Item>
            </Menu>
        );
    }
}

function mapStateToProps(state: any) {
    const { users, authentication } = state;
    const { user } = authentication;

    return {
        user,
        users
    };
}

const connectedUsersMenu = connect(mapStateToProps)(UsersMenu);
export { connectedUsersMenu as UsersMenu };
