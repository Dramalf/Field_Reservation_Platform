import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux'
import { getHost } from '../../../redux/actions/updateUser'
import React, { Component } from 'react'
import './index.css'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};



class SignIn extends Component {
    state = {
        host: ''
    }
    onFinish = (values) => {
        this.props.getUserInfo(values)
        console.log('Success:', values);
        this.setState(values)
        this.SignBox.className += ' hide'
        axios.post(`http://localhost:3000/api1/login`, {
            ...values
        }).then(
            res => {
                this.props.getHost(res.data)
                this.setState({ host: res.data })
                console.log(res)
            }
        )
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (

            <div ref={c => this.SignBox = c} className='lockPage'>
                <Form
                    id="userSignInForm"
                    {...layout}
                    name="basic"
                    className="SignUp"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="学号"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: '请输入学号!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="姓名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
            </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

};

export default connect(
    state => state,
    { getHost }
)(SignIn)