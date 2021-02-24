import React from 'react'
import { Modal } from 'antd';
import { getBoxInfo, getPeriods } from '../utlits'
import Reservation from './Reservation'
import store from '../../../../redux/store'

const showDetails = (props) => {
    const { dateObj } = props
    console.log(props)
    const { reservationState } = dateObj
    return () => {
        Modal.info({
            title: `场地${getBoxInfo(reservationState)}`,
            okText: '关闭',
            content: (
                <div>
                    <Reservation dateObj={dateObj} store={store} />
                </div>
            ),
            onOk() { },
        });
    }
    /*{
        availablePeriods: 0   ​​​
        day: "星期四"
        fieldName: "zc"                        ​​​
        id: 17
        reservationInfo: Array []
        reservationState: -1
    */

}

export { showDetails }