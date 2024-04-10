import React, { memo } from 'react'
import { formateDate } from '../../components/common-component/DateFormat'
import { IoMdStopwatch } from 'react-icons/io'

const TextTypeMsg = ({ msg, updatedAt }) => {
    return (
        <>
            <div>{msg}</div>
            <div className='msg-time '>
                <span className='pt-0.5' style={{ color: '#b71c1c' }}><IoMdStopwatch /></span>{formateDate(updatedAt)}
            </div>
        </>
    )
}

export default memo(TextTypeMsg)