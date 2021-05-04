import React, { Component } from 'react'
import './index.css'
import { Layout } from 'antd';
import FieldNav from './Nav'
import Notice from './Notice'
import axios from 'axios'
import FieldTable from './Table'
import { connect } from 'react-redux'
import { updateTable } from '../../redux/actions/updateTable'

function getfn(state) {
    switch (state) {
        case 'xc':
            return '西操'
        case 'zc':
            return '中操'
        case 'dc':
            return '东操'

    }
}
const { Content } = Layout;
class FieldContent extends Component {
    state = {
        userInfo: {},
        host: '',
        fieldName: 'xc',
        dateInfo: []
    }
    getFieldName = (fieldName) => {
        this.setState({ fieldName: fieldName })
        axios.get(`http://localhost:3000/api1/field-info`, {
            params: {
                fieldName: fieldName
            }
        }).then(res => res.data)
            .then(data => {
                console.log("AAA", data)
                this.props.updateTable(data.dateInfo)
                this.setState({ dateInfo: data.dateInfo })
            }).catch(err => {
                console.log(err)
            })
    }


    render() {
        const { dateInfo } = this.props.table
        const { fieldName } = this.state
        return (
            <Content style={{ padding: '0 10px' }}>
                <Layout className="site-layout-background" style={{ padding: '14px 0' }}>
                    <FieldNav getFieldName={this.getFieldName.bind(this)} />
                    <Content style={{ padding: '0 24px', minHeight: 480 }}>
                        <h3>当前浏览场地：{getfn(fieldName)}</h3>
                        <FieldTable dateInfo={dateInfo || this.state.dateInfo} />

                    </Content>
                    <Notice fieldName={fieldName} />
                </Layout>
            </Content>

        )
    }
}
export default connect(
    state => ({
        table: state.dateInfo
    }),
    {
        updateTable
    }
)(FieldContent)
