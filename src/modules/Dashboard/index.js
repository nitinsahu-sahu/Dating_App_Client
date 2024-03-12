import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import axios from "../../redux/helper/axios";
import { InputModule } from '../../components/formField/FormField'
import { FiSend } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { editPersonalINfo, logout } from '../../redux/action/userAuth.action.js';
import { HiDotsVertical } from "react-icons/hi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { getAllUsers } from '../../redux/action/allusers.action.js';
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
const Dashboard = () => {
	const users = useSelector(state => state.usersList.allusers);
	const dispatch = useDispatch()
	const info = JSON.parse(localStorage.getItem("u_info"))
	const [conversations, setConversations] = useState([])
	const [messages, setMessages] = useState({})
	const [message, setMessage] = useState('')
	const [socket, setSocket] = useState(null)
	const [online, setOnline] = useState([])
	const messageRef = useRef(null)
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [emojiShow, setEmojiShow] = useState(false)
	const [inputFieldShow, setInputFieldShow] = useState(false)
	const [editdata, setEditData] = useState({
		fullname: info.fullname,
		showme: info.showme,
		intent: info.intent,
		dob: info.dob,
		number: info.number,
		gender: info.gender
	})
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		dispatch(getAllUsers())
	}, [])
	useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])

	useEffect(() => {
		socket?.emit('addUser', info?._id);
		socket?.on('getUsers', users => {
			console.log('active>>>', users)
			setOnline(users);
		})
		socket?.on('getMessage', data => {
			setMessages(prev => ({
				...prev,
				messages: [
					...prev.messages,
					{
						user: data.user,
						message: data.message
					}
				]
			}))
		})
	}, [socket])

	useEffect(() => {
		messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages?.messages])

	useEffect(() => {
		const fetchConversations = async () => {
			await axios.get(`/conversations/${info?._id}`).then(function (response) {
				setConversations(response?.data)
			}).catch((error) => {
				console.log("Conversation not found");
			})
		}
		fetchConversations()
	}, [])

	const fetchMessages = async (conversationId, receiver) => {
		await axios.get(`/message/${conversationId}?senderId=${info?._id}&&receiverId=${receiver?.receiverId}`).then(function (response) {
			setMessages({ messages: response?.data, receiver, conversationId })

		}).catch((error) => {
			console.log("Conversation not found");
		})
	}

	const sendMessage = async (e) => {
		setMessage('')
		socket?.emit('sendMessage', {
			conversationId: messages?.conversationId,
			senderId: info?._id,
			message,
			receiverId: messages?.receiver?.receiverId
		});
		let msginfo = {
			conversationId: messages?.conversationId,
			senderId: info?._id,
			message,
			receiverId: messages?.receiver?.receiverId
		}
		await axios.post(`/message`, msginfo).then(function (response) {
			console.log(response);
		}).catch((error) => {
			console.log("Conversation not found");
		})
	}

	const handleEmojiSelect = (emoji) => {
		setMessage(prev => prev + emoji.native)
		setEmojiShow(!emojiShow);
	};

	const handleSubmit = async (e) => {
		dispatch(editPersonalINfo(editdata, info?._id));
		setInputFieldShow(!inputFieldShow)
	}

	return (
		<div className='w-screen flex'>
			<div className='w-[25%] h-screen bg-secondary'>
				<div className='items-center my-5 mx-5'>
					<div className='flex justify-between'>
						<div className='flex'>

							<div className='cursor-pointer grid content-center' data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example" >
								<img
									src={`http://localhost:8000/public/${info?.profile}`}
									width={60}
									height={60}
									className='border border-primary p-[2px] rounded-full min-w-10'
								/>
							</div>
							<div className='ml-4 mt-1'>
								<h3 className='sm:text-sm md:text-base lg:text-lg'>{info?.fullname}</h3>
								<p className='sm:text-xs md:text-sm lg:text-base font-light'>{info?.intent}</p>
							</div>
						</div>
						<div
							className='grid content-center cursor-pointer'
							id="basic-button"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<HiDotsVertical size={30} />
						</div>
						<Menu
							id="basic-menu"
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
					</div>
				</div>
				<hr />
				<div id="drawer-example" class="fixed top-0 left-0 z-40 h-screen  overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-label">
					<div className='bg-peach px-3 pt-3 pb-1'>
						<div data-drawer-hide="drawer-example" aria-controls="drawer-example" className='flex justify-end dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  rounded-lg' >
							<RxCross2 size={25} className='border border-black rounded-md cursor-pointer' />
							<span class="sr-only">Close menu</span>
						</div>
						<div className='pt-10'>
							<p className='text-lg font-semibold'>Profile</p>
						</div>
					</div>
					<div className='p-3'>
						<div className='flex justify-center ' style={{ marginTop: -47 }}>
							<img
								src={`http://localhost:8000/public/${info?.profile}`}
								width={80}
								height={80}
								className='border border-primary p-[2px] rounded-full min-w-10'
							/>
							<div className='relative right-4 '>
								<FiEdit size={20} className='mt-14 cursor-pointer text-denger' />
							</div>
						</div>
						<div className='mt-4 bg-pink px-3'>
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Full name</p>
									<form onBlur={(e) => handleSubmit(e)}>
										{
											inputFieldShow === 'fullname' ? <InputModule type="text" name="fullname" value={editdata.fullname} placeholder="Fullname" onChange={(e) => setEditData({ ...editdata, fullname: e.target.value })} /> : <p className='ml-1'>{info?.fullname}</p>
										}
									</form>
								</div>
								<div className='self-center'>
									<FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('fullname')} />
								</div>
							</div>
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Email</p>
									<p className='ml-1'>{info?.email}</p>
								</div>
							</div>
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Gender</p>
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
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Contact number</p>
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
													isRequired
												/>
											</form> : <p className='ml-1'>{info?.number}</p>
									}
								</div>
								<div className='self-center'>
									<FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('number')} />
								</div>
							</div>
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Showme</p>
									{
										inputFieldShow === 'showme' ?
											<form onBlur={(e) => handleSubmit(e)}>
												<select id="showme" value={editdata.showme} onChange={(e) => setEditData({ ...editdata, showme: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Date of birth</p>
									{
										inputFieldShow === 'dob' ?
											<form onBlur={(e) => handleSubmit(e)}>
												<InputModule type="date" name="dob" value={editdata.dob} placeholder="Date of birth" onChange={(e) => setEditData({ ...editdata, dob: e.target.value })} />
											</form> : <p className='ml-1'>{info?.dob}</p>
									}
								</div>
								<div className='self-center'>
									<FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('dob')} />
								</div>
							</div>
							<div className='flex pb-1 pt-3 justify-between'>
								<div className='w-[75%]'>
									<p className='text-lg font-bold'>Relationship intent</p>
									{
										inputFieldShow === 'intent' ?
											<form onBlur={(e) => handleSubmit(e)}>
												<select id="intent" value={editdata.intent} onChange={(e) => setEditData({ ...editdata, intent: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
													<option selected>Choose a intent</option>
													<option value="long-term partner">Long-term partner</option>
													<option value="long-term, open to short">Long-term, open to short</option>
													<option value="short-term, open to long">Short-term, open to long</option>
													<option value="new friends">New friends</option>
												</select>
											</form> : <p className='ml-1'>{info?.intent}</p>
									}
								</div>
								<div className='self-center'>
									<FiEdit size={20} className='cursor-pointer text-denger' onClick={() => setInputFieldShow('intent')} />
								</div>
							</div>
							{/* 
							
							<Editbox f_title='Date of Birth' f_value={info?.dob} _id={info?._id} name='dob' />
							<Editbox f_title='Relationship intent' f_value={info?.intent} _id={info?._id} name='intent' /> */}
						</div>
					</div>

				</div>

				<div className='mx-8 mt-10'>
					<div className='text-primary text-lg'>Messages</div>
					<div>
						{
							conversations.length > 0 ?
								conversations.map(({ conversationId, user }, index) => {
									return (
										<div key={index} className='flex items-center py-8 border-b border-b-gray-300'>
											<div className='cursor-pointer flex items-center' onClick={() => fetchMessages(conversationId, user)}>
												<div className='min-w-30'>
													<img
														src={`http://localhost:8000/public/${user?.profile}`}
														width={60}
														height={60}
														className="p-[2px] rounded-full border border-primary "
													/>
												</div>
												<div className='ml-6'>
													<h3 className='sm:text-sm md:text-base lg:text-lg font-semibold'>{user?.fullname}</h3>
													<p className='text-sm font-light text-gray-600'>{user?.email}</p>
												</div>
											</div>
										</div>
									)
								}) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
						}
					</div>
				</div>
			</div>
			<div className='w-[50%] h-screen bg-white flex flex-col items-center'>
				{
					messages?.receiver?.fullname &&
					<div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2'>
						<div className='cursor-pointer'>
							<img
								src={`http://localhost:8000/public/${messages?.receiver?.profile}`}
								width={60}
								height={60}
								className="rounded-full"
							/>
						</div>
						<div className='ml-6 mr-auto'>
							<h3 className='sm:text-sm md:text-base lg:text-lg'>{messages?.receiver?.fullname}</h3>
							<p className='sm:text-xs md:text-sm lg:text-base font-light text-gray-600'>Online/Offline</p>
						</div>
					</div>
				}
				<div className='h-[75%] w-full overflow-scroll shadow-sm'>
					<div className='p-14'>
						{
							messages?.messages?.length > 0 ?
								messages.messages.map(({ message, user }) => {
									return (
										<>
											<div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${user?._id === user?.user?._id ? 'bg-primary text-white rounded-tl-xl mr-auto' : 'bg-secondary rounded-tr-xl ml-auto'} `}>{message}</div>
											<div ref={messageRef}></div>
										</>
									)
								}) : <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
						}
					</div>
				</div>
				{
					messages?.receiver?.fullname &&
					<div className='p-5 w-full flex items-center'>
						<div className='mr-4 p-2 cursor-pointer bg-light rounded-full' >
							<MdOutlineEmojiEmotions size={24} onClick={() => setEmojiShow(!emojiShow)} />
							{
								emojiShow ? <div className='picker'><Picker data={data} onEmojiSelect={handleEmojiSelect} /></div> : null
							}

						</div>
						<InputModule placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' class='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
							<FiSend size={24} className="icon icon-tabler icon-tabler-send" />
						</div>
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
							<GoPlusCircle size={24} className="icon icon-tabler icon-tabler-send" />
						</div>
					</div>
				}
			</div>
			<div className='w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
				<div>
					<div className='text-primary text-lg '>People</div>
					{
						users.length > 0 ?
							users.map((item, index) =>
								<div key={index} className='flex items-center py-8 border-b border-b-gray-300 overflow-scroll'>
									<div className='cursor-pointer flex items-center' onClick={() => fetchMessages('new', item)}>
										<div>
											<img
												src={`http://localhost:8000/public/${item.profile}`}
												alt={item?.fullname}
												width={60}
												height={60}
												className={
													` rounded-full p-[2px]
                                                    ${online.map(
														(onlineusers) =>
															onlineusers.userId === item._id ? `border border-green` : `border border-denger`
													)
													}`

												}
											/>
										</div>
										<div className='ml-6'>
											<h3 className='sm:text-sm md:text-base lg:text-lg font-semibold'>{item?.fullname}</h3>
											<p className='sm:text-xs md:text-sm lg:text-base font-light text-gray-600'>{item?.email}</p>
										</div>
									</div>
								</div>
							) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
					}
				</div>
			</div>
		</div>
	)
}

export default Dashboard