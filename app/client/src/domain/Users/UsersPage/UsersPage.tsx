import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, message } from 'antd';

import { userActions } from '../../../_actions/user.actions';
import './UsersPage.scss';

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

    getColumns = (role: string) => {
      const adminColumns = [{
        title: 'Action',
        key: 'action',
        render: (text: string, record: any) => (
          <span>
            <Link to={`/panel/users/${record.id}`}>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => this.deleteUser(record.id)}>
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      }];
    return [{
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          render: (text: string, record: any) => <Link to={`/panel/users/${record.id}`}>{text}</Link>,
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
        },
        ...(role === 'Admin' ? adminColumns : [])
      ]
    };

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    deleteUser(id: string) {
        this.props.dispatch(userActions._delete(id));
    }

    render() {
        const { users, user } = this.props;
        return (
            users && users.items ? <Table columns={this.getColumns(user.role)} dataSource={users.items} rowKey="id"  /> : null
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
