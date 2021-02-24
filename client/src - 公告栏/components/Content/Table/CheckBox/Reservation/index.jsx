import React, { useState, Component } from 'react';
import { Form, Select, Button, Modal } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux'
import { updateTable } from '../../../../../redux/actions/updateTable'
import { getFieldName } from '../../utlits'
import { nanoid } from 'nanoid';

const { Option } = Select;

const ReservationInput = ({ rezList, value = {}, onChange }) => {

    const [period, setPeriod] = useState('');
    const [event, setEvent] = useState('');
    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange({
                period,
                event,
                ...value,
                ...changedValue,
            });
        }
    };
    const onPeriodChange = (newPeriod) => {
        if (!('period' in value)) {
            setPeriod(newPeriod);
        }

        triggerChange({
            period: newPeriod,
        });
    };

    const onEventChange = (newEvent) => {
        if (!('event' in value)) {
            setEvent(newEvent);
        }

        triggerChange({
            event: newEvent,
        });
    };
    return (
        <span>
            <Select
                placeholder='请选择时段'
                defaultValue='12:00~14:00'
                style={{
                    width: 120,
                    margin: '0 8px'
                }}
                onChange={onPeriodChange}>
                {
                    rezList.map(rezObj => {
                        if (rezObj.state) {
                            return (
                                <Option key={nanoid()} value={rezObj.period}>{rezObj.period}</Option>
                            )
                        }
                    })
                }
            </Select>
            <Select
                defaultValue='训练'
                style={{
                    width: 80,
                    margin: '0 8px',
                }}
                onChange={onEventChange}>
                <Option value="训练">训练</Option>
                <Option value="比赛">比赛</Option>
            </Select>
        </span>
    );
};

class Reservation extends Component {

    handleOk = (reservation) => {
        axios.post(`http://localhost:3000/api1/reservation`, {
            ...reservation
        }
        ).then(
            res => {
                //console.log("ooo", res.data)
                alert(res.data.errMsg || "预定成功！")
                this.props.updateTable(res.data)

            },
            err => {
                console.log('reservation错误post')
            }
        )


    }


    onFinish = (values) => {
        console.log("&&&", this.props)
        const { id, fieldName, day } = this.props.dateObj
        const { host } = this.props.host
        const { period } = values.reservation
        values.reservation = { ...values.reservation, day: day, dateid: id, host: host, chosedField: fieldName }

        Modal.confirm({
            title: `${host} 确认预约 ${getFieldName(fieldName)} ${id}号${day} ${period}的场地吗？`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.handleOk(values.reservation)
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        })

    };


    render() {
        const { reservationInfo } = this.props.dateObj
        return (
            <Form
                name="customized_form_controls"
                layout="inline"
                onFinish={this.onFinish}
                initialValues={{
                    reservation: {
                        host: '',
                        event: '训练',
                        dateid: '',
                        day: '',
                        chosedField: '',
                        period: '12:00~14:00'
                    }

                }}
            >
                <Form.Item
                    name="reservation"
                    label="详细信息"
                >
                    <ReservationInput rezList={reservationInfo} />
                </Form.Item>
                <Form.Item>

                    <Button type="primary"
                        style={{
                            margin: '13px 50px',
                        }}
                        htmlType="submit"
                        onClick={this.popconfirm}
                    >
                        预约
                </Button >

                </Form.Item>
            </Form >
        );
    }

};

export default connect(
    state => ({
        host: state.userInfo
    }),
    {
        updateTable
    }
)(Reservation)