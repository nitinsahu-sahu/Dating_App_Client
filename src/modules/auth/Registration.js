import React, { useState } from 'react'
import { ButtonModule, InputModule, LabelModule, SelectModule } from '../../components/formField/FormField'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../redux/action/userAuth.action';
import OptionName from '../../components/staticData';
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
    const showMeOptions = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
        { value: 'both', label: 'Both' },
    ];
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
                            name="fullname"
                            id="fullname"
                            placeholder="Enter your full name"
                            value={data.fullname}
                            onChange={(e) => setData({ ...data, fullname: e.target.value })}
                            isRequired
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="mb-2 w-[75%]">
                        <LabelModule title="Email address" for="email" class="block text-gray-800 pb-0.2" />
                        <InputModule
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            isRequired
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="flex mb-2 w-[75%] ">
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Password" for="password" class="block text-gray-800 pb-0.2" />
                            <InputModule
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                isRequired
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                            />
                        </div>
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Confirm password" for="confirmprofile" class="block text-gray-800 pb-0.2" />
                            <InputModule
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                value={data.confirm_pwd}
                                onChange={(e) => setData({ ...data, confirm_pwd: e.target.value })}
                                isRequired
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                            />
                        </div>
                    </div>
                    <div className="flex mb-2 w-[75%] ">
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Mobile number" for="number" class="block text-gray-800 pb-0.2" />
                            <InputModule
                                type="number"
                                name="number"
                                id="number"
                                placeholder="Enter your number"
                                value={data.number}
                                onChange={(e) => setData({ ...data, number: e.target.value })}
                                maxLength="10"
                                isRequired
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                            />
                        </div>
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Date of birth" for="dob" class="block text-gray-800 pb-0.2" />
                            <InputModule
                                type="date"
                                name="dob"
                                id="dob"
                                value={data.dob}
                                onChange={(e) => setData({ ...data, dob: e.target.value })}
                                isRequired
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full"
                            />
                        </div>
                    </div>
                    <div className="flex mb-2 w-[75%] ">
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Gender" for="gender" class="block text-gray-800 pb-0.2" />
                            <div className="flex items-center">
                                <div className='w-20'>
                                    <InputModule
                                        type="radio"
                                        name="select-gender"
                                        id="men"
                                        value="men"
                                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked
                                    />&nbsp;
                                    <LabelModule title="Men" for="men" class="ms-2 text-gray-900 dark:text-gray-300" />
                                </div>
                                <div className='w-20'>
                                    <InputModule
                                        type="radio"
                                        name="select-gender"
                                        id="women"
                                        value="women"
                                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />&nbsp;
                                    <LabelModule title="Women" for="women" class="ms-2 text-gray-900 dark:text-gray-300" />
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%] pl-1">
                            <LabelModule title="Show me" for="showme" class="block text-gray-800 pb-0.2" />
                            <SelectModule
                                options={showMeOptions}
                                value={data.showme} 
                                onChange={(e) => setData({ ...data, showme: e.target.value })}
                                id="showme"
                                subTitile= "Show me"
                            />
                        </div>
                    </div>
                    <div className="mb-2 w-[75%]">
                        <LabelModule title="Intent" for="intent" class="block text-gray-800 pb-0.2" />
                        <SelectModule
                                options={OptionName}
                                value={data.intent} 
                                onChange={(e) => setData({ ...data, intent: e.target.value })}
                                id="intent"
                                subTitile= "Intent"
                            />
                    </div>
                    <ButtonModule typ="submit" cn="w-[75%] mb-1" btnname="Register here" />
                </form>
                <div>Alredy have an account?  <span className=" text-primary cursor-pointer underline" ><Link to="/users/sign_in">Sign in</Link></span></div>
            </div>
        </div>
    )
}

export default Registration