import React, { useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import { getReceiverProfile } from '../../../redux/action/profile.action';
import { ImageComponent } from '..';

const ContactInfo = (setShowContactInfo, showContactInfo) => {
    const dispatch = useDispatch()
    const ReceiverId = useSelector(state => state.allMessages.messages.receiver.receiverId);
    const Receiverinfo = useSelector(state => state.chatterInfo.chatUserData);
    let len = Object.keys(Receiverinfo.followers).length
    useEffect(() => {
        dispatch(getReceiverProfile(ReceiverId))
    }, [ReceiverId])
    return (
        <div className='m-2 py-2 px-2 '>
            <div className='flex justify-between bg-slate-100 p-2' onClick={() => setShowContactInfo(false)}>
                <div className='sm:text-xs md:text-sm lg:text-base font-bold '>People</div>
                <RxCross2 size={25} className='h-5 w-5 sm:h-2 sm:w-2 md:h-4 md:w-4 lg:h-6 lg:w-6 icons border border-black rounded-md cursor-pointer' />
            </div>
            <div className=' bg-slate-100 px-2 py-8 my-2 flex flex-col items-center rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                <div className='flex flex-col items-center my-3'>
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${process.env.REACT_APP_SERVER_IMG_URL}/${Receiverinfo.profile}`} alt={Receiverinfo.fullname} />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{Receiverinfo.fullname}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{Receiverinfo.email}</span>
                </div>

                <div className='flex w-[70%] justify-between my-1'>
                    {/* <div className='flex text-black '><h1 className='font-bold'>Followers</h1><span>&nbsp;{len}</span></div> */}
                    {/* <div className='flex text-black '><h1 className='font-bold'>Following</h1><span>&nbsp;{Receiverinfo.following.length}</span></div> */}
                </div>
                <div className='flex w-[70%] justify-between my-1'>
                    <div className='flex text-black '><h1 className='font-bold'>Number</h1><span>&nbsp;{Receiverinfo.number}</span></div>
                </div>
                <div className='flex w-[70%] justify-between my-1'>
                    <div className='flex text-black '><h1 className='font-bold'>Gender</h1><span>&nbsp;{Receiverinfo.gender}</span></div>
                </div>
                <div className='flex w-[70%] justify-between my-1'>
                    <div className='flex text-black '><h1 className='font-bold'>Date of Birth</h1><span>&nbsp;{Receiverinfo.dob}</span></div>
                </div>
                <div className='flex w-[70%] justify-between my-1'>
                    <div className='flex text-black '><h1 className='font-bold'>Intent</h1><span>&nbsp;{Receiverinfo.intent}</span></div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo