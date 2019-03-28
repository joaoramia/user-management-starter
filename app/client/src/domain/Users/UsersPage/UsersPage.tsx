import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Divider, Popconfirm } from 'antd';

import { userActions } from '../../../_actions/user.actions';

interface Props {
    dispatch?: any;
    alert?: any;
    users?: any;
    user?: any;
    history?: any;
}

interface State {
    users?: any;
}

class UsersPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { users: null }
    }

    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => <a href="javascript:;">{text}</a>,
      }, {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      }, {
        title: 'Action',
        key: 'action',
        render: (text: string, record: any) => (
          <span>
            <a href="javascript:;">Edit {record.name}</a>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => this.deleteUser(record.id)}>
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
    }];

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    deleteUser(id: string) {
        this.props.dispatch(userActions._delete(id));
    }

    render() {
        const { users } = this.props;
        return (
            users && users.items ? <Table columns={this.columns} dataSource={users.items} rowKey="id"  /> : null
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

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };
