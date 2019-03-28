import React from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import './PrivateLayout.scss';
import { HomePage } from '../../HomePage/HomePage';
import { UsersPage } from '../../Users/UsersPage/UsersPage'
import { PrivateRoute } from '../../../_components/PrivateRoute';
import { userActions } from '../../../_actions/user.actions';

const { Header, Sider, Content } = Layout;

interface Props {
    dispatch?: any;
    alert?: any;
    users?: any;
    user?: any;
    history?: any;
}

interface State {}

class PrivateLayout extends React.Component<Props, State> {
  state = {
    collapsed: false,
  };

  constructor(props: Props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout() {
    const { dispatch } = this.props;
    // reset login status
    dispatch(userActions.logout());
    this.props.history.push('/login')
  }

  render() {
    const topMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link to={`/login`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={`/login`}>Settings</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2" onClick={this.logout}>Logout <Icon type="logout" /></Menu.Item>
        </Menu>
    );
    const { user } = this.props;

    return (
      <Layout id="private-layout-component">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="dark"
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/panel/users']} selectedKeys={[location.pathname]}>
            <Menu.Item key="/panel/users">
              <Icon type="user" />
              <NavLink to={`/panel/users`} className={this.state.collapsed ? '' : 'side-menu-link'}>Users</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Dropdown overlay={topMenu} trigger={['click']}>
                <a className="ant-dropdown-link user-avatar" href="#">
                    <Avatar>
                        {user.username}
                    </Avatar>
                </a>
            </Dropdown>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <PrivateRoute exact path="/panel" component={HomePage}/>
            <PrivateRoute exact path="/panel/users" component={UsersPage}/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
    const { alert, users, authentication } = state;
    const { user } = authentication;
    return {
        alert,
        user
    };
}

const connectedPrivateLayout = connect(mapStateToProps)(PrivateLayout);
export { connectedPrivateLayout as PrivateLayout };
