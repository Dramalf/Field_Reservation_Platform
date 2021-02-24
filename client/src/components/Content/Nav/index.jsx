import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
const { SubMenu } = Menu;
const { Sider } = Layout;

export default class FieldNav extends Component {
    chooseField = (e) => {
        let chosedField = ''
        const key = e.key
        switch (key) {
            case '1':
                chosedField = 'xc'
                break;
            case '2':
                chosedField = 'zc'
                break;
            default:
                chosedField = 'dc'
                break;
        }
        this.props.getFieldName(chosedField)
    }


    render() {
        return (
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="场地"
                    >
                        <Menu.Item key="1" onClick={this.chooseField}>西操</Menu.Item>
                        <Menu.Item key="2" onClick={this.chooseField}>中操</Menu.Item>
                        <Menu.Item key="3" onClick={this.chooseField}>东操</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
