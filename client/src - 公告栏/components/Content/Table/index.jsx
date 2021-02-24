import React, { Component } from 'react'
import { getBgc, getBoxInfo } from './utlits'
import { showDetails } from './CheckBox'
import './index.css'


export default class FieldTable extends Component {
    state = {
        dateInfo: []
    }
    componentDidMount() {
        this.setState({ dateInfo: this.props.dateInfo })
    }
    render() {
        const { dateInfo } = this.props
        return (

            <div className="infoTable">
                {
                    <ul>
                        {
                            dateInfo.map(dateObj => {
                                const { id, day, fieldName, resvationInfo, reservationState } = dateObj
                                const bgc = getBgc(reservationState)
                                const boxInfo = getBoxInfo(reservationState)
                                return (
                                    <li key={id}
                                        className='dateItem'
                                        onClick={showDetails({ dateObj })}
                                        style={{
                                            backgroundColor: bgc
                                        }}>
                                        <h3>{day}</h3>
                                        {id + '号'}
                                        <p>{boxInfo}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    /*{
                        availablePeriods: 0   ​​​
                        day: "星期四"
                        fieldName: "zc"                        ​​​
                        id: 17
                        reservationInfo: Array []
                        reservationState: -1
                    */
                }
            </div>
        )
    }
}

