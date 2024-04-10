import React from 'react'
import { IoDocumentTextOutline } from 'react-icons/io5'

const ImageComponent = ({ alt, externalClass, srcLink }) => {
    return (
        <img
            src={`${process.env.REACT_APP_SERVER_IMG_URL}/${srcLink}`}
            className={
                `p-[2px] rounded-full min-w-10 ${externalClass} `
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

const ConvAndUserPanel = ({ index, onClick, user, displayUser, externalClass }) => {
    return (
        <div key={index} className={`flex items-center py-2 mb-1 border-b border-b-gray-300 ${displayUser} ${externalClass}`}>
            <div className='cursor-pointer md:container columns-2 flex items-center' onClick={onClick}>
                <div className='min-w-30'>
                    <ImageComponent
                        srcLink={user?.profile}
                        externalClass="mp-profile border border-primary"
                        alt={user?.fullname}
                    />
                </div>
                <div className='ml-3'>
                    <h4 className='capitalize font-semibold'>{user?.fullname}</h4>
                    <p >{user?.email}</p>
                </div>
            </div>
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