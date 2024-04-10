import { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import axios from "../../redux/helper/axios";
import { ButtonModule, InputModule } from '../../components/formField/FormField'
import { ConvAndUserPanel, EmptyTextComponent, ImageComponent } from '../../components/common-component/index.js';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { getAllUsers } from '../../redux/action/allusers.action.js';
import FileTypeMsg from './FileTypeMsg.js';
import TextTypeMsg from './TextTypeMsg.js';
import Webcam from "react-webcam";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

//React Icons
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaCameraRetro } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { InforEditDropbox, MenuDropbox } from '../../components/dropbox/InforEditDropbox.js';
import { base64ToImage } from '../../components/common-component/Base67ToFile.js';



const Dashboard = () => {
	const users = useSelector(state => state.usersList.allusers);
	const isLoginUser = useSelector(state => state.userAuth.user);
	const dispatch = useDispatch()
	const info = JSON.parse(localStorage.getItem("u_info"))
	const [conversations, setConversations] = useState([])
	const [messages, setMessages] = useState({})
	const [message, setMessage] = useState('')
	const [socket, setSocket] = useState(null)
	const [online, setOnline] = useState([])
	const [url, setUrl] = useState(null)
	const [pdfurl, setpdfUrl] = useState(null)
	const [imagevideourl, setimagevideoUrl] = useState(null)
	const [fileError, setFileError] = useState(null)
	const [uploadPdfFile, setUploadPdfFile] = useState('')
	const [anchorEl, setAnchorEl] = useState(null);
	const [emojiShow, setEmojiShow] = useState(false)
	const [plusMenuShow, setPlusMenuShow] = useState(false)
	const [cameraShow, setCameraShow] = useState(false)
	const [searchPeople, setSearchPeople] = useState('')
	const [searchConv, setSearchConv] = useState('')
	const webcamRef = useRef(null)
	const docsInputFile = useRef(null);
	const messageRef = useRef(null)
	const PicandVideoInputFile = useRef(null)
	const open = Boolean(anchorEl);

	//--------- Socket Related Method---------------
	useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])
	useEffect(() => {
		socket?.emit('addUser', info?._id);
		socket?.on('getUsers', users => {
			setOnline(users);
		})

		socket?.on('getMessage', data => {
			setMessages(prev => ({
				...prev,
				messages: [
					...prev.messages,
					{
						user: data.user,
						message: data.message,
						updatedAt: data.updatedAt,
						type: data.type,
					}
				]
			}))
		})
	}, [socket])
	//-----------------------------------------------

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
	}, [messages])

	const fetchMessages = async (conversationId, receiver) => {
		await axios.get(`/message/${conversationId}?senderId=${info?._id}&&receiverId=${receiver?.receiverId}`).then(function (response) {
			setMessages({ messages: response?.data, receiver, conversationId })
		}).catch((error) => {
			console.log("Conversation not found");
		})
	}

	const handleEmojiSelect = (emoji) => {
		setMessage(prev => prev + emoji.native)
		setEmojiShow(!emojiShow);
	};

	const openDocsFile = () => {
		docsInputFile.current.click();
	};
	const handleDocsFileChange = event => {
		setpdfUrl(event.target.files[0]);

	};
	const openPicandVideoFile = () => {
		PicandVideoInputFile.current.click();
	};
	const handlePicandVideoFileChange = event => {
		setimagevideoUrl(event.target.files[0]);
	};



	const sendMessage = async (e) => {
		setMessage('')
		socket?.emit('sendMessage', {
			conversationId: messages?.conversationId,
			senderId: info?._id,
			message,
			receiverId: messages?.receiver?.receiverId,
			type: "text"
		});
		let msginfo = {
			conversationId: messages?.conversationId,
			senderId: info?._id,
			message,
			receiverId: messages?.receiver?.receiverId,
			type: "text"
		}
		await axios.post(`/message`, msginfo).then().catch((error) => {
			console.log("Server error");
		})
	}

	//Pdf upload api calll
	useEffect(() => {
		const getImage = async () => {
			if (pdfurl) {
				let data = new FormData()
				data.append("name", pdfurl.name)
				data.append("file", pdfurl)
				data.append("contentType", 'pdf')
				await axios.post(`/file/upload`, data).then(function (response) {
					let ressplit = response.data.split("/")
					let orignalFilename = ressplit.pop()
					socket?.emit('sendMessage', {
						conversationId: messages?.conversationId,
						senderId: info?._id,
						message: orignalFilename,
						receiverId: messages?.receiver?.receiverId,
						type: "file"
					});
					let msginfo = {
						conversationId: messages?.conversationId,
						senderId: info?._id,
						message: orignalFilename,
						receiverId: messages?.receiver?.receiverId,
						type: "file"
					}
					axios.post(`/message`, msginfo).then(function (response) {
						setUploadPdfFile(null);

					}).catch((error) => {
						console.log("Conversation not found");
					})
				}).catch((error) => {
					setFileError(error.response.data.message);
				})
			}
		}
		getImage()

	}, [pdfurl])

	// Photo and video upload function
	useEffect(() => {
		const getImage = async () => {
			if (imagevideourl) {
				let data = new FormData()
				data.append("name", imagevideourl.name)
				data.append("file", imagevideourl)
				data.append("contentType", 'image')

				await axios.post(`/file/upload`, data).then(function (response) {
					let ressplit = response.data.split("/")
					let orignalFilename = ressplit.pop()
					socket?.emit('sendMessage', {
						conversationId: messages?.conversationId,
						senderId: info?._id,
						message: orignalFilename,
						receiverId: messages?.receiver?.receiverId,
						type: "file"
					});
					let msginfo = {
						conversationId: messages?.conversationId,
						senderId: info?._id,
						message: orignalFilename,
						receiverId: messages?.receiver?.receiverId,
						type: "file"
					}
					axios.post(`/message`, msginfo).then(function (response) {
						setimagevideoUrl(null);
					}).catch((error) => {
						console.log("Conversation not found");
					})
				}).catch((errors) => {
					setFileError(errors.message);
				})
			}
		}
		getImage()


	}, [imagevideourl])

	
	//----------------capture image ------------------------
	const lowerCaseName = uniqueNamesGenerator({
		dictionaries: [adjectives],
		style: 'lowerCase'
	});
	useEffect(() => {
		const getCaptureImage = async () => {
			if (url) {
				let date = new Date()
				let fileName = `${date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + lowerCaseName + ".png"}`
				console.log(fileName);
				const imageFile = base64ToImage(url, fileName);
				let data = new FormData()
				data.append("name", imageFile.name)
				data.append("file", imageFile)
				data.append("contentType", 'image')
				await axios.post(`/file/upload`, data).then(function (response) {
					let ressplit = response.data.split("/")
					let orignalFilename = ressplit.pop()
					socket?.emit('sendMessage', {
						conversationId: messages?.conversationId,
						senderId: info?._id,
						message: orignalFilename,
						receiverId: messages?.receiver?.receiverId,
						type: "file"
					});
					let msginfo = {
						conversationId: messages?.conversationId,
						senderId: info?._id,
						message: orignalFilename,
						receiverId: messages?.receiver?.receiverId,
						type: "file"
					}
					axios.post(`/message`, msginfo).then(function (response) {
						setCameraShow(!cameraShow)
						setUrl(null);
					}).catch((error) => {
						console.log("Conversation not found");
					})
				}).catch((error) => {
					console.log("Error while calling uploading api", error.message);
				})
			}
		}
		getCaptureImage()
	}, [url])

	const videoConstraints = {
		width: 1280,
		height: 820,
		facingMode: "user"
	};
	const capture = useCallback(
		() => {
			const imageSrc = webcamRef.current.getScreenshot();
			setUrl(imageSrc);
			setCameraShow(!cameraShow);
		},
		[webcamRef]
	);

	const openCameraWebCam = () => {
		setCameraShow(!cameraShow)
		setPlusMenuShow(!plusMenuShow)
	};

	//-----------------------------------------------All type filters------------------------------------------------------
	let isUserOnline = online.some(onlinedata => onlinedata.userId === isLoginUser._id);
	let filteredOnlineArray = users.filter(item1 => online.some(item2 => item2.userId === item1._id));
	let displayUser = users.filter(item1 => conversations.some(item2 => item2.user.receiverId === item1._id));
	let searchPeoplesForUsers = users.filter(item => item.fullname.toLowerCase().includes(searchPeople.toLocaleLowerCase()))
	let filterConv = conversations.filter(item => item?.user?.fullname.toLowerCase().includes(searchConv.toLocaleLowerCase()))
	//----------------------------------------------*********-----------------------------------------------------------------



	return (
		<div className='w-screen flex'>
			{/* ------------------------------Messages Section Code/ Left Section------------------------------------------------ */}
			<div className='w-[20%] h-screen bg-secondary'>
				<div className='items-center my-1 mx-1'>
					<div className='flex justify-between'>
						<div className='flex'>
							<div className='cursor-pointer grid content-center' data-drawer-target="information-edit-dropbox" data-drawer-show="information-edit-dropbox" aria-controls="information-edit-dropbox" >
								<div>
									<ImageComponent
										srcLink={info?.profile}
										externalClass="sm:h-7 sm:w-7 md:h-12 md:w-12 border border-primary"
										alt={info?.fullname}
									/>
									<div className={`online border-4 ${isUserOnline ? 'border-success' : 'border-denger'}`}></div>

								</div>
							</div>
							<div className='ml-4 self-center'>
								<h4 className='sm:text-sm md:text-base lg:text-base font-semibold'>{info?.fullname}</h4>
								<p>{info?.intent}</p>
							</div>
						</div>
						<div
							className='grid content-center cursor-pointer'
							id="basic-button"
							aria-controls={open ? 'burgger-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<HiDotsVertical size={20} />
						</div>
						<MenuDropbox anchorEl={anchorEl} open={open} handleClose={handleClose} />
					</div>
				</div>
				<hr />
				<div className='flex justify-center'>
					<InputModule
						placeholder='Search users...'
						onChange={(e) => setSearchConv(e.target.value)}
						style={{
							fontSize: '12px'
						}}
						class='w-[90%] my-2 p-2 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none'
					/>
				</div>
				<hr />
				<InforEditDropbox />
				<div className='mx-3 mt-5'>
					<div className='text-primary text-lg'>Messages</div>
					<div>
						{
							filterConv.length > 0 ?
								filterConv.map(({ conversationId, user }, index) => {
									return (
										<ConvAndUserPanel index={index} onClick={() => fetchMessages(conversationId, user)} user={user} />
									)
								}) : <EmptyTextComponent emptyText="No conversation" />
						}
					</div>
				</div>
			</div>
			{/* ------------------------------People Chat Section Code/ Middle Section------------------------------------------------ */}
			<div className='w-[60%] h-screen bg-white flex flex-col items-center'>
				{
					messages?.receiver?.fullname &&
					<div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2'>
						<div className='cursor-pointer'>
							<ImageComponent
								srcLink={messages?.receiver?.profile}
								externalClass="mp-profile border border-primary"
								alt={messages?.receiver?.fullname}
							/>
						</div>
						<div className='ml-6 mr-auto'>
							<h3 className='sm:text-sm md:text-base lg:text-lg capitalize'>{messages?.receiver?.fullname}</h3>
							{
								filteredOnlineArray.map((item) => console.log("hii"))
							}
						</div>
					</div>
				}
				{
					cameraShow ? <div>
						<div >
							<Webcam
								audio={false}
								height={720}
								ref={webcamRef}
								screenshotFormat="image/jpeg"
								width={1280}
								videoConstraints={videoConstraints}
							/>
						</div>
						<div className='flex justify-center my-2'>
							<ButtonModule onClick={capture} btnname="Capture picture" />
						</div>
					</div> : <div className='h-[75%] w-full overflow-scroll shadow-sm'>
						<div className='py-14 px-8'>
							{
								messages?.messages?.length > 0 ?
									messages.messages.map(
										(
											{
												type,
												message,
												user,
												updatedAt
											}, index
										) => {
											return (
												<>
													{
														user?._id === isLoginUser?._id ? <div
															key={index}
															className={`max-w-[29%] rounded-b-xl p-2 mb-6 bg-secondary rounded-tl-xl ml-auto`}
														>
															{type === 'file' ? <FileTypeMsg msg={message} updatedAt={updatedAt} /> : <TextTypeMsg msg={message} updatedAt={updatedAt} />}
														</div>
															:
															<div
																key={index}
																className="max-w-[29%] rounded-b-xl p-2 mb-6 bg-primary text-white rounded-tr-xl mr-auto"
															>
																{type === 'file' ? <FileTypeMsg msg={message} updatedAt={updatedAt} /> : <TextTypeMsg msg={message} updatedAt={updatedAt} />}
															</div>
													}
													<div ref={messageRef}></div>
												</>
											)
										}
									) : <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
							}
						</div>
					</div>
				}
				{
					messages?.receiver?.fullname &&
					<div className='p-5 w-full flex items-center'>
						<div className='mr-4 p-2 cursor-pointer bg-light rounded-full' >
							<MdOutlineEmojiEmotions size={24} onClick={() => setEmojiShow(!emojiShow)} />
							{
								emojiShow ? <div className='picker'><Picker data={data} onEmojiSelect={handleEmojiSelect} /></div> : null
							}

						</div>
						<InputModule
							placeholder='Type a message...'
							value={message} onChange={(e) => setMessage(e.target.value)}
							class='w-[75%] p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none'
						/>
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
							<FiSend size={24} className="icon icon-tabler icon-tabler-send" />
						</div>
						<div className={`ml-4 p-2  bg-light rounded-full`} >
							<div onClick={() => setPlusMenuShow(!plusMenuShow)} >
								<GoPlusCircle
									size={24}
									className="gopluscircle-icon icon icon-tabler cursor-pointer icon-tabler-send"
								/>
							</div>
							<span>
								{
									plusMenuShow ? <div tabIndex='-1' className='_2sDI2 _1b6oD'>
										<div className='m-2 flex border-2 rounded-md' onClick={openDocsFile} style={{ color: "#58D68D" }}>
											<IoDocumentTextOutline size={28} className="mr-2 icon icon-tabler icon-tabler-send" />
											<h2 className='font-semibold'>Document</h2>
											<input type='file' ref={docsInputFile} onChange={handleDocsFileChange} accept='*' className='hidden' />
										</div>
										<div className='m-2 flex border-2 rounded-md' onClick={openPicandVideoFile} style={{ color: "#5499C7 " }} >
											<FaPhotoFilm size={28} className="mr-2 icon icon-tabler icon-tabler-send" />
											<h2 className='font-semibold'>Photo & Video</h2>
											<input type='file' ref={PicandVideoInputFile} onChange={handlePicandVideoFileChange} accept='image/*,video/mp4,video/3gpp,video/quicktime' className='hidden' />
										</div>
										<div className='m-2 flex border-2 rounded-md' onClick={() => openCameraWebCam()} style={{ color: "#D98880 " }} >
											<FaCameraRetro size={28} className=" mr-2 icon icon-tabler icon-tabler-send" />
											<h2 className='font-semibold'>Camera</h2>
										</div>
									</div> : null
								}
							</span>
						</div>

					</div>

				}
			</div>

			{/* ------------------------------People Section Code/ Right Section------------------------------------------------ */}

			<div className='w-[20%] h-screen bg-light py-7 overflow-scroll'>
				<div>
					<div className='text-primary text-lg my-2 px-4'>People</div>
					<hr />
					<div className='flex justify-center'>
						<InputModule
							placeholder='Search peoples...'
							onChange={(e) => setSearchPeople(e.target.value)}
							style={{
								fontSize: '12px'
							}}
							class='w-[90%] my-2 p-2 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none'
						/>
					</div>
					<hr />
					<div className='mx-6'>
						{
							searchPeoplesForUsers?.length > 0 ?
								searchPeoplesForUsers?.map((item, index) =>
									<ConvAndUserPanel index={index} onClick={() => fetchMessages('new', item)} user={item} displayUser={displayUser.map((data) => data._id === item._id ? "hidden" : null).join('')} externalClass='mt-2' />
								) : <EmptyTextComponent emptyText="No Conversations" />
						}
					</div>
				</div>
			</div>
		</div>
	)
}




export default Dashboard