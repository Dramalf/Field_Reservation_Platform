import React, { Component } from 'react'
import { Button, PageHeader } from 'antd';
import { withRouter } from "react-router-dom";
import SignIn from './SignIn';
import './index.css'
import { clearToken } from '../../utils/auth'
class Header extends Component {
    state = {
        userInfo: {},
        host: '计算机科学与技术学院'
    }
    getUserInfo = (values) => {
        this.setState({ userInfo: values })
    }
    signOut = () => {
        clearToken();
        this.props.history.push('/login')
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
                    subTitle={'你好'}
                    extra={
                        [
                            <Button primay onClick={this.signOut}>退出登录</Button>
                        ]
                    }>
                    {/* <SignIn getUserInfo={this.getUserInfo.bind(this)} /> */}

                </PageHeader>
            </div >
        )
    }
}

export default withRouter(Header);