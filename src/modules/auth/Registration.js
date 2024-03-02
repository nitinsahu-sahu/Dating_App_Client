import React, { useState } from 'react'
import { ButtonModule, InputModule, LabelModule } from '../../components/formField/FormField'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../redux/action/userAuth.action';
const Registration = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.userAuth);
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        showme: '',
        intent: '',
        dob: '',
        number: '',
        gender: '',
        confirm_pwd: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(register(data));
    }
    if (auth.message) {
        setTimeout(() => {
          return navigate("/users/sign_in");
        }, "2000");
      }
    return (
        <div className="bg-light h-screen flex items-center justify-center">
            <div className=" bg-white w-[700px] h-[570px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className=" text-3xl font-extrabold">Welcome</div>
                <div className=" text-base font-light ">Sign up to get started</div>
                {
                    auth.message == "" ? <p className="text-red-600 font-bold capitalize">{auth.errors}</p> : <p className="text-green-600 font-bold capitalize" >{auth.message}</p>
                }
                <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)} >
                    <div className="mb-2 w-[75%]">
                        <LabelModule title="Full name" for="fullName" />
                        <InputModule
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={data.fullname}
                            onChange={(e) => setData({ ...data, fullname: e.target.value })}
                        />
                    </div>
                    <div className="mb-2 w-[75%]">
                        <LabelModule title="Email address" for="email" />
                        <InputModule
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className="flex mb-2 w-[75%] ">
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Password" for="password" />
                            <InputModule
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}

                            />
                        </div>
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Confirm password" for="profile" />
                            <InputModule
                                type="password"
                                name="profile"
                                value={data.confirm_pwd}
                                onChange={(e) => setData({ ...data, confirm_pwd: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex mb-2 w-[75%] ">
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Mobile number" for="number" />
                            <InputModule
                                type="number"
                                name="number"
                                placeholder="Enter your number"
                                value={data.number}
                                onChange={(e) => setData({ ...data, number: e.target.value })}
                            />
                        </div>
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Date of birth" for="dob" />
                            <InputModule
                                type="date"
                                name="dob"
                                value={data.dob}
                                onChange={(e) => setData({ ...data, dob: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex mb-2 w-[75%] ">
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Gender" for="gender" />
                            <div className="flex items-center">
                                <div className='w-20'>
                                    <input id="men" onClick={(e) => setData({ ...data, gender: e.target.value })} type="radio" value="men" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />&nbsp;
                                    <label for="men" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Men</label>
                                </div>
                                <div className='w-20'>
                                    <input id="women" type="radio" onClick={(e) => setData({ ...data, gender: e.target.value })} value="women" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />&nbsp;
                                    <label for="women" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Women</label>
                                </div>
                            </div>

                        </div>
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Show me" for="showme" />
                            <select id="showme" value={data.showme} onChange={(e) => setData({ ...data, showme: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a show me</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2 w-[75%]">
                        <LabelModule title="Intent" for="intent" />
                        <select id="intent" value={data.intent} onChange={(e) => setData({ ...data, intent: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a intent</option>
                            <option value="long-term partner">Long-term partner</option>
                            <option value="long-term, open to short">Long-term, open to short</option>
                            <option value="short-term, open to long">Short-term, open to long</option>
                            <option value="new friends">New friends</option>
                        </select>
                    </div>
                    <ButtonModule typ="submit" cn="w-[75%] mb-1" btnname="Register here" />
                </form>
                <div>Alredy have an account?  <span className=" text-primary cursor-pointer underline" ><Link to="/users/sign_in">Sign in</Link></span></div>
            </div>
        </div>
    )
}

export default Registration