import { Modal } from '@mui/material'
import React from 'react'
import { ButtonModule } from '../formField/FormField'
import { deleteMsgEveryOne} from '../../redux/action/message.action';
import { useDispatch } from 'react-redux';

const DeleteModel = ({ open, handleClose, msgId, own, isConvId, right_msg_status}) => {
    const dispatch = useDispatch()
    const deleteMsgEveryone = async (data) => {
        dispatch(deleteMsgEveryOne(data, isConvId))
    }
    const deleteMsgForMe = (data) => {
        console.log(data);
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='deleteModelContent'>
                <h6>Delete Message?</h6>
                <div className='mt-3 '>
                    {
                        own === 'left' ? null : <>
                            <div className='mt-1'>
                                <ButtonModule btnname="Delete for everyone" onClick={() => deleteMsgEveryone(msgId)} />
                            </div></>
                    }
                    <div className='mt-1'>
                        <ButtonModule btnname="Delete for me" onClick={() => deleteMsgForMe(msgId)} />
                    </div>
                    <div className='mt-1'>
                        <ButtonModule btnname="Cancel" onClick={handleClose} />
                    </div>

                </div>
            </div>
        </Modal>
    )
}

export default DeleteModel