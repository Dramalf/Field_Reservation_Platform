import React, { Component } from 'react'
import { PageHeader } from 'antd';
import SignIn from './SignIn';

export default class Header extends Component {
    state = {
        userInfo: {},
        host: '计算机科学与技术学院'
    }
    getUserInfo = (values) => {
        this.setState({ userInfo: values })
    }
    render() {
        const username = this.state.userInfo.username || '请登录！'
        return (
            <div>
                <PageHeader
                    ref={(c) => { this.ph = c }}
                    className="site-page-header"
                    onBack={() => null}
                    title="HUST操场预定网站"
                    subTitle={'你好，' + username}>
                    <SignIn getUserInfo={this.getUserInfo.bind(this)} />
                </PageHeader>
            </div >
        )
    }
}
