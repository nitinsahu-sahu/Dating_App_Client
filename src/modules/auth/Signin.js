import React, { useState } from 'react'
import { InputModule, LabelModule, ButtonModule } from '../../components/formField/FormField'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/action/userAuth.action'
import { useFormik } from 'formik';
import { signinSchema } from '../validationSchema'
import axios from '../../redux/helper/axios'
import FacebookAuth from 'react-facebook-auth';
import { FaFacebookF } from "react-icons/fa6";
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'


const Signin = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.userAuth);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [googleinfo, setGoogleinfo] = useState({});
    console.log(googleinfo);
    const data = localStorage.getItem("GoogleToken");
    // console.log(data);
    // console.log(JSON.parse(data));
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const [loginWith, setLoginWith] = useState('email')
    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            loginId: '',
            password: '',
        },
        validationSchema: signinSchema,
        onSubmit: values => {
            dispatch(userLogin(values));
        },
    });
    if (auth.authenticate) {
        setTimeout(() => {
            return navigate("/");
        }, "4000");
    }
    const onSuccessFB = async (response) => {
        console.log(response);
        await axios.post(`/auth/fb`, response).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    };
    const onFailureFB = (error) => {
        console.log(error);
        // Api call to server so we can validate the token
    };
    const onSuccessGoogle = async (credentialResponse) => {
        let credentialResponseDecode = jwtDecode(credentialResponse.credential)
        let { credential, clientId } = credentialResponse
        let { email, name, picture } = credentialResponseDecode
        let googleData = { email, name, picture, credential, clientId }
        setGoogleinfo(googleData)
        localStorage.setItem("GoogleToken", JSON.stringify(credential));
        // let loginWith = "googleLogin"
        setTimeout(() => {
            setIsModalOpen(true)
        }, "3000");


        // dispatch(userLogin(googleData, loginWith));
        // await axios.post(`/auth/socialLogin`, googleData).then((data) => {
        //     console.log(data);
        // }).catch((error) => {
        //     console.log(error);
        // })
    };
    const onFailureGoogle = (error) => {
        console.log(error);
        // Api call to server so we can validate the token
    };
    return (
        <div className="bg-light h-screen flex items-center justify-center">
            <div className=" bg-white w-[600px] h-[500px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className=" text-4xl font-extrabold">Welcome Back</div>
                <div className=" text-xl font-light ">Sign in with</div>

                <div className='flex w-[75%] justify-center'>
                    <div
                        className={`p-2 w-[20%] border-2 text-center m-1 cursor-pointer rounded-md ${loginWith === 'email' ? 'border-orange-400' : null}`}
                        onClick={() => setLoginWith('email')}
                    >
                        <p>Email</p>
                    </div>
                    <div className={`p-2 w-[20%] border-2 text-center m-1 cursor-pointer rounded-md ${loginWith === 'number' ? 'border-orange-400' : null}`} onClick={() => setLoginWith('number')}>
                        <p>Number</p>
                    </div>
                </div>
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    <div className="mb-4 w-[75%]">
                        {
                            loginWith === 'email' ? <><LabelModule title="Email address" for="email" class="block text-gray-800 pb-0.2" />
                                <InputModule
                                    type="email"
                                    name="loginId"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={values.loginId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"

                                />
                                {errors.loginId && <p className='text-xs text-red-500'>{errors.loginId}</p>}
                            </> : <>
                                <LabelModule title="Mobile number" for="number" class="block text-gray-800 pb-0.2" />
                                <InputModule
                                    type="number"
                                    name="loginId"
                                    id="number"
                                    placeholder="Enter your number"
                                    value={values.loginId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                                />
                                {errors.number && <p className='text-xs text-red-500'>{errors.number}</p>}
                            </>
                        }


                    </div>
                    <div className="mb-4 w-[75%]">
                        <LabelModule title="Password" for="password" class="block text-gray-800 pb-0.2" />
                        <InputModule
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                        />
                        {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
                    </div>
                    <ButtonModule typ="submit" cn="w-[75%] mb-2" btnname="Sign In" />
                    {
                        auth.message == "" ? <p className="text-xs text-red-500">{auth.errors}</p> : <p className="text-xs text-green-500" >{auth.message}</p>
                    }
                </form>
                <div>Didn't have an account? <span className=" text-primary cursor-pointer underline" ><Link to="/users/sign_up">Sign up</Link></span></div>
                <hr className='border border-solid w-10/12 m-1 hr-text-center' data-content="OR" />
                <FacebookAuth
                    appId="993484551624926"
                    callback={onSuccessFB}
                    onFailure={onFailureFB}
                    component={MyFacebookButton}
                />
                <GoogleLogin
                    onSuccess={onSuccessGoogle}
                    onError={onFailureGoogle}
                    auto_select={true}
                    component={MyFacebookButton}
                />
                {
                    isModalOpen ? <div
                        id="default-modal"
                        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Update Details
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleToggleModal}
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form className="flex flex-col items-center w-full"  >
                                    <div className="flex mb-2 w-[75%] ">
                                        <div className="w-[50%] pl-1">
                                            <LabelModule title="Fullname" for="number" class="block text-gray-800 pb-0.2" />
                                            <InputModule
                                                type="text"
                                                name="fullname"
                                                id="Fullname"
                                                value={googleinfo.name}
                                                // onChange={(e) => setData({ ...data, number: e.target.value })}
                                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                                            />
                                        </div>
                                        <div className="w-[50%] pl-1">
                                            <LabelModule title="Email" for="email" class="block text-gray-800 pb-0.2" />
                                            <InputModule
                                                type="email"
                                                name="email"
                                                id="Fullname"
                                                value={googleinfo.name}
                                                // onChange={(e) => setData({ ...data, number: e.target.value })}
                                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mb-2 w-[75%] ">
                                        <div className="w-[50%] pl-1">
                                            <LabelModule title="Number" for="number" class="block text-gray-800 pb-0.2" />
                                            <InputModule
                                                type="number"
                                                name="Number"
                                                id="number"
                                                value={googleinfo.name}
                                                // onChange={(e) => setData({ ...data, number: e.target.value })}
                                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                                            />
                                        </div>
                                        <div className="w-[50%] pl-1">
                                            <LabelModule title="Email" for="number" class="block text-gray-800 pb-0.2" />
                                            <InputModule
                                                type="text"
                                                name="fullname"
                                                id="Fullname"
                                                value={googleinfo.name}
                                                // onChange={(e) => setData({ ...data, number: e.target.value })}
                                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                                            />
                                        </div>
                                    </div>

                                </form>
                                <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={handleToggleModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    // onClick={handleToggleModal}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }

            </div>
        </div>
    )
}

export default Signin

const MyFacebookButton = ({ onClick }) => (
    <button onClick={onClick} className='bg-fb-btn flex items-center py-2 px-38 rounded-md mb-2'>
        <FaFacebookF size={15} /> Login with facebook
    </button>
);