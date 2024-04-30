import React, { useRef, useState, use } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { ImageComponent } from '../common-component'
import { FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { editPersonalINfo, logout, updateProfilePic } from '../../redux/action/userAuth.action'
import { InputModule } from '../formField/FormField'
import { Drawer, Menu, MenuItem } from '@mui/material'
import OptionName from '../staticData'

const InforEditDropbox = ({ isDrawerOpen, setIsDrawerOpen }) => {
    const info = JSON.parse(localStorage.getItem("u_info"))
    const [inputFieldShow, setInputFieldShow] = useState(false)
    const dispatch = useDispatch()
    const [editdata, setEditData] = useState({
        fullname: info.fullname,
        showme: info.showme,
        intent: info.intent,
        dob: info.dob,
        number: info.number,
        gender: info.gender
    })
    const inputFile = useRef(null);
    const openFile = () => {
        inputFile.current.click();
    };
    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        const formData = new FormData();
        formData.append("profile", fileObj);
        formData.append("_id", info?._id);
        dispatch(updateProfilePic(formData));
    };
    const handleSubmit = async (e) => {
        dispatch(editPersonalINfo(editdata, info?._id));
        setInputFieldShow(!inputFieldShow)
    }
    return (
        <Drawer anchor='left' open={isDrawerOpen} onClose={setIsDrawerOpen}>
            <div>
                <div className='bg-peach px-3 pt-3 pb-1' >
                    <div className='flex justify-end dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg' onClick={() => setIsDrawerOpen(false)}>
                        <RxCross2 size={25} className='h-5 w-5 sm:h-2 sm:w-2 md:h-4 md:w-4 lg:h-6 lg:w-6 icons border border-black rounded-md cursor-pointer' />
                    </div>
                    <div className='pt-10'>
                        <p className='sm:text-xs md:text-sm lg:text-base font-semibold'>Profile</p>
                    </div>
                </div>
                <div className='p-3'>
                    <div className='flex justify-center ' style={{ marginTop: -47 }}>
                        <ImageComponent
                            srcLink={info?.profile}
                            externalClass="ddpro-profile border border-primary"
                            alt={info?.fullname}
                        />
                        <div className='relative right-4 '>
                            <input
                                type="file"
                                ref={inputFile}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept='image/*'
                            />
                            <FiEdit size={20} className='h-5 w-5 sm:h-2 sm:w-2 md:h-4 md:w-4 lg:h-6 lg:w-6 mt-12 cursor-pointer text-denger' onClick={openFile} />
                        </div>
                    </div>
                    <div className='mt-4 bg-pink px-3'>
                        <div className='flex pb-1 pt-3 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Fullname</p>
                                <form onBlur={(e) => handleSubmit(e)}>
                                    {
                                        inputFieldShow === 'fullname' ? <InputModule class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full" type="text" name="fullname" value={editdata.fullname} placeholder="Fullname" onChange={(e) => setEditData({ ...editdata, fullname: e.target.value })} /> : <p className='ml-1'>{info?.fullname}</p>
                                    }
                                </form>
                            </div>
                            <div className='self-center'>
                                <FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('fullname')} />
                            </div>
                        </div>
                        <div className='flex pb-1 pt-1 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Email</p>
                                <p className='ml-1'>{info?.email}</p>
                            </div>
                        </div>
                        <div className='flex pb-1 pt-1 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Gender</p>
                                {
                                    inputFieldShow === 'gender' ?
                                        <form onBlur={(e) => handleSubmit(e)}>
                                            <select id="gender" value={editdata.gender} onChange={(e) => setEditData({ ...editdata, gender: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Choose a gender</option>
                                                <option value="men">Men</option>
                                                <option value="women">Women</option>
                                            </select>
                                        </form> : <p className='ml-1'>{info?.gender}</p>
                                }
                            </div>
                            <div className='self-center'>
                                <FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('gender')} />
                            </div>
                        </div>
                        <div className='flex pb-1 pt-1 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Contact number</p>
                                {
                                    inputFieldShow === 'number' ?
                                        <form onBlur={(e) => handleSubmit(e)}>
                                            <InputModule
                                                type="number"
                                                name="number"
                                                value={editdata.number}
                                                placeholder="Number"
                                                onChange={(e) => setEditData({ ...editdata, number: e.target.value })}
                                                maxLength={10}
                                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                                                isRequired
                                            />
                                        </form> : <p className='ml-1'>{info?.number}</p>
                                }
                            </div>
                            <div className='self-center'>
                                <FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('number')} />
                            </div>
                        </div>
                        <div className='flex pb-1 pt-1 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Showme</p>
                                {
                                    inputFieldShow === 'showme' ?
                                        <form onBlur={(e) => handleSubmit(e)}>
                                            <select id="showme" value={editdata.showme} onChange={(e) => setEditData({ ...editdata, showme: e.target.value })} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Choose a showme</option>
                                                <option value="men">Men</option>
                                                <option value="women">Women</option>
                                                <option value="both">Both</option>
                                            </select>
                                        </form> : <p className='ml-1'>{info?.showme}</p>
                                }
                            </div>
                            <div className='self-center'>
                                <FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow("showme")} />
                            </div>
                        </div>
                        <div className='flex pb-1 pt-1 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Date of birth</p>
                                {
                                    inputFieldShow === 'dob' ?
                                        <form onBlur={(e) => handleSubmit(e)}>
                                            <InputModule class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full" type="date" name="dob" value={editdata.dob} placeholder="Date of birth" onChange={(e) => setEditData({ ...editdata, dob: e.target.value })} />
                                        </form> : <p className='ml-1'>{info?.dob}</p>
                                }
                            </div>
                            <div className='self-center'>
                                <FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('dob')} />
                            </div>
                        </div>
                        <div className='flex pb-1 pt-1 justify-between'>
                            <div className='w-[75%]'>
                                <p className='sm:text-xs md:text-sm lg:text-base font-bold'>Relationship intent</p>
                                {
                                    inputFieldShow === 'intent' ?
                                        <form onBlur={(e) => handleSubmit(e)}>
                                            <select id="intent" value={editdata.intent} onChange={(e) => setEditData({ ...editdata, intent: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Choose a intent</option>
                                                {
                                                    OptionName.map((item) => <option value={item.value}>{item.value}</option>)
                                                }
                                            </select>
                                        </form> : <p className='ml-1'>{info?.intent}</p>
                                }
                            </div>
                            <div className='self-center'>
                                <FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('intent')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>

    )
}


const MenuDropbox = ({ open, anchorEl, handleClose }) => {
    const dispatch = useDispatch()

    return (
        <Menu
            id="burgger-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
        </Menu>
    )
}

export { MenuDropbox, InforEditDropbox }