import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { getHost } from '../../redux/actions/updateUser'
import './index.css'
import { setToken } from '../../utils/auth'
import PicArea from './Carousel'
import { Form, Input, Button, message } from 'antd';
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
function Login(props) {
    const onFinish = (values) => {
        console.log(values)
        axios.post(`http://localhost:3000/api1/login`, {
            ...values
        }).then(
            res => {
                const ret_code = res.data.ret_code
                const ret_msg = res.data.ret_msg
                if (ret_code === 0) {
                    message.success(ret_msg);
                    setToken(res.data.host)
                    props.history.push('./view')
                }
                else if (ret_code) {
                    message.error(ret_msg);
                }

            }
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="loginbox">

            {/* <PicArea /> */}
            <Form
                className='loginForm'
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <h2 >华中科技大学操场预定平台</h2>
                <Form.Item
                    label="学号"
                    name="userid"
                    rules={[
                        {
                            required: true,
                            message: '请输入学号',
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
                            message: '请输入姓名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{ marginTop: '8px' }}>
                        提交
            </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default connect(
    state => state,
    { getHost }
)(Login)
