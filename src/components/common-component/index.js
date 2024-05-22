import React from 'react'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { ButtonModule, FollowUnfollowModule } from '../formField/FormField'
import { useDispatch, useSelector } from 'react-redux'
import { userFollow } from '../../redux/action/allusers.action'

const ImageComponent = ({ alt, externalClass, srcLink }) => {
    return (
        <img
            src={`${process.env.REACT_APP_SERVER_IMG_URL}/${srcLink}`}
            className={
                `p-[2px] rounded-full h-8 w-8 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 border border-primary ${externalClass} `
            }
            alt={alt}
        />
    )
}

const EmptyTextComponent = ({ emptyText }) => {
    return (
        <div className="text-center text-lg font-semibold mt-24">{emptyText}</div>
    )
}

const ConvAndUserPanel = ({ index, onClick, user, displayUser, externalClass, users }) => {
    const peoples = useSelector(state => state.usersList.allusers);
    const isUserLogin = useSelector(state => state.userAuth.user._id);

    let dispatch = useDispatch()
    let followuser = (userData) => {
        dispatch(userFollow(userData._id))
    }

    const isFollowing = peoples.some(obj => obj.followers.includes(isUserLogin));
    return (
        <div key={index} className={`items-center py-2 mb-1 border-b border-b-gray-300 ${displayUser} ${externalClass}`}>
            <div className='cursor-pointer md:container columns-2 flex items-center' onClick={onClick}>
                <div className='min-w-30'>
                    <ImageComponent
                        srcLink={user?.profile}
                        alt={user?.fullname}
                    />
                </div>
                <div className='ml-3'>
                    <h4 className='sm:text-xs md:text-sm lg:text-base font-semibold capitalize'>{user?.fullname}</h4>
                    <p className='last_msg_panal'>{user?.email}</p>
                </div>
            </div>
            {
                users === "followuser" ? <div className='flex justify-end'>
                    {
                        isFollowing ?
                            <FollowUnfollowModule typ="submit" cn="w-[75%] mb-1" btnname="unfollow" />
                            :
                            <FollowUnfollowModule typ="submit" cn="w-[75%] mb-1" btnname="Follow" onClick={() => followuser(user)} />

                    }
                </div> : null
            }

        </div>
    )
}


const PlusMenuItem = ({ btnTitle, onClick, TextColor, ref, onChange, acceptType }) => {
    return (
        <div className='m-2 flex border-2 rounded-md' onClick={onClick} style={{ color: `${TextColor}` }}>
            <IoDocumentTextOutline size={28} className="mr-2 icon icon-tabler icon-tabler-send" />
            <h2 className='font-semibold'>{btnTitle}</h2>
            <input type='file' ref={ref} onChange={onChange} accept={acceptType} className='hidden' />
        </div>
    )
}


export { ImageComponent, EmptyTextComponent, ConvAndUserPanel, PlusMenuItem }