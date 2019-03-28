import React from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import { connect } from 'react-redux';

import './PublicLayout.scss';
import { Route, Redirect, Switch } from 'react-router';
import connectedLoginPage from '../../LoginPage/LoginPage';
import { Link } from 'react-router-dom';
import connectedRegisterPage from '../../RegisterPage/RegisterPage';

const { Header, Sider, Content } = Layout;

class PublicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const topMenu = (
      <Menu>
        <Menu.Item key="0">
          <Link to={`/login`}>Login</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={`/register`}>Register</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout id="public-layout-component">
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Dropdown overlay={topMenu} trigger={['click']}>
                <a className="ant-dropdown-link user-avatar" href="#">
                    <Avatar icon="user">
                    </Avatar>
                </a>
            </Dropdown>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <Switch>
              <Route path="/login" exact component={connectedLoginPage}/>
              <Route path={['/signup', '/register']} exact component={connectedRegisterPage}/>
              <Route render={() => (<Redirect to='/login' />)} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedPublicLayout = connect(mapStateToProps)(PublicLayout);
export { connectedPublicLayout as PublicLayout };