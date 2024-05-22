import { Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action/userAuth.action';
import DeleteModel from '../modal/DeleteModel';

const Dropdown = ({ anchorEl, handleClose, open, msgId }) => {
    const dispatch = useDispatch()
    const ITEM_HEIGHT = 48;
    const logoutFun = () => {
        dispatch(logout())
    }
    return (
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            paper={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    left: '123px'
                },
            }}
        >
            <MenuItem onClick={handleClose} >
                <div className='sm:text-sm md:text-base lg:text-lg capitalize'>Setting</div>
            </MenuItem>
            <MenuItem onClick={() => logoutFun()}>
                Logout
            </MenuItem>
        </Menu>
    )
}

const MsgDropdown = ({ anchorEl, handleClose, open, msgId, own, isConvId, right_msg_status }) => {
    const ITEM_HEIGHT = 48;
    const [openModel, setOpenModel] = useState(false);
    const handleOpenModel = () => {
        setOpenModel(true)
    }
    const handleCloseModel = () => setOpenModel(false);
    return (
        <Menu
            id="msg-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            paper={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    padding: '0px',
                },
            }}
        >
            <MenuItem onClick={handleOpenModel}>
                Delete
            </MenuItem>
            <DeleteModel open={openModel} handleClose={handleCloseModel} handleClosemen={handleClose} msgId={msgId} own={own} isConvId={isConvId} right_msg_status={right_msg_status} />
            <MenuItem onClick={handleClose}>
                Forward
            </MenuItem>
            <MenuItem >
                Reply
            </MenuItem>
        </Menu>
    )
}

const ReceiverDropBox = ({ anchorEl, handleClose, open, setShowContactInfo, showContactInfo}) => {
    const ITEM_HEIGHT = 45;
    const ContactInfo = () => {
        handleClose(false)
        setShowContactInfo(!showContactInfo)
    }
    return (
        <Menu
            id="receiver-dropbox"
            MenuListProps={{
                'aria-labelledby': 'receiver-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            paper={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    left: '123px'
                },
            }}
        >
            <MenuItem onClick={handleClose} >
                Close chat
            </MenuItem>
            <MenuItem onClick={handleClose} >
                Select message
            </MenuItem>
            <MenuItem onClick={() => ContactInfo()} >
                Contact info
            </MenuItem>
            <MenuItem onClick={handleClose}>
                Block
            </MenuItem>
        </Menu>
    )
}

export { Dropdown, MsgDropdown, ReceiverDropBox }