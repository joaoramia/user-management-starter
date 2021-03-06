import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

import { userActions } from '../../_actions/user.actions';

interface Props {
    dispatch?: any;
    alert?: any;
    users?: any;
    user?: any;
    history?: any;
}

interface State {}

class HomePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    logout() {
        const { dispatch } = this.props;
        // reset login status
        dispatch(userActions.logout());
        this.props.history.push('/login')
    }

    render() {
        const { user, users } = this.props;
        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col span={12} offset={6}>
                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <h3>Users from secure api end point:</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ul>
                            {users.items.map((user: any, index: number) =>
                                <li key={user._id}>
                                    {user.email}
                                </li>
                            )}
                        </ul>
                    }
                    <p>
                        <Button type="primary" onClick={this.logout}>Logout</Button>
                    </p>
                </Col >
            </Row>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
