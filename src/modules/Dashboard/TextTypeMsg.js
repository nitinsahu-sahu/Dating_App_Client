import React, { memo, useState } from 'react'
import { formateDate } from '../../components/common-component/DateFormat'
import { IoMdStopwatch } from 'react-icons/io'
import { IoIosArrowDown } from "react-icons/io";
import { IconButton } from '@mui/material';
import { MsgDropdown } from '../../components/dropdown/Dropdown';


const TextTypeMsg = ({ msg, updatedAt, msgId, own, isConvId, right_msg_status, messageRef}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <>
            <div className='flex justify-between'>
                <div className='msg-overflow'>{msg}</div>
                <div >
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'msg-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <IoIosArrowDown size={15} />
                    </IconButton>
                    <MsgDropdown anchorEl={anchorEl} open={open} handleClose={handleClose} msgId={msgId} own={own} isConvId={isConvId} right_msg_status={right_msg_status}/>
                </div>
            </div>
            <div className='msg-time '>
                <span className='pt-0.5' style={{ color: '#b71c1c' }}><IoMdStopwatch /></span>{formateDate(updatedAt)}
            </div>
        </>
    )
}

export default memo(TextTypeMsg)