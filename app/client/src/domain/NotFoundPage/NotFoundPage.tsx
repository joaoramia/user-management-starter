import React from 'react';
import Exception from 'ant-design-pro/lib/Exception';

export class NotFoundPage extends React.Component {

    render() {
        return (
            <Exception
                type="404"
                desc="This page does not exist"
                redirect="/"
                backText="Send me back home!"
            />
        );
    }
}