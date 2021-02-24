import { List, Typography, Pagination } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { updateTable } from '../../../redux/actions/updateTable'

class Notice extends Component {
    state = {
        data: []
    }
    componentDidMount() {

        setInterval(() => {
            const { fieldName } = this.props
            axios.get(`http://localhost:3000/api1/notice`,
                {
                    params: {
                        fieldName: fieldName,
                        id: nanoid()
                    }
                })
                .then(res => {
                    console.log(this.state.data)
                    this.props.updateTable(res.data)
                    this.setState({ data: res.data.notice })
                })
        }, 5000);
    }
    render() {
        const { data } = this.state
        return (
            <List
                header={<h3 style={{ fontWeight: '700' }}>预约公告</h3>}
                bordered
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 7
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>[{item.event}]</Typography.Text> {item.msg}
                    </List.Item>
                )}
            />
        );
    }
}

export default connect(
    state => ({
        host: state.userInfo
    }),
    {
        updateTable
    }
)(Notice)