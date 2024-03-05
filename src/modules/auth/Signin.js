import React, { useState } from 'react'
import { InputModule, LabelModule, ButtonModule } from '../../components/formField/FormField'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/action/userAuth.action'

const Signin = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.userAuth);
    const navigate = useNavigate();
    const [data, setData] = useState({
        loginId: '',
        password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(userLogin(data));
    }
    if (auth.authenticate) {
        setTimeout(() => {
            return navigate("/");
        }, "4000");
    }
    return (
        <div className="bg-light h-screen flex items-center justify-center">
            <div className=" bg-white w-[600px] h-[500px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className=" text-4xl font-extrabold">Welcome Back</div>
                <div className=" text-xl font-light ">Sign in to get explored</div>
                {
                    auth.message == "" ? <p className="text-red-600 font-bold capitalize">{auth.errors}</p> : <p className="text-success-600 font-bold capitalize" >{auth.message}</p>
                }
                <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-6 w-[75%]">
                        <LabelModule title="Email or Number" for="loginId" />
                        <InputModule
                            type="text"
                            name="loginId"
                            placeholder="Enter your email"
                            value={data.loginId}
                            onChange={(e) => setData({ ...data, loginId: e.target.value })}
                        />
                    </div>
                    <div className="mb-6 w-[75%]">
                        <LabelModule title="Password" for="password" />
                        <InputModule
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>
                    <ButtonModule typ="submit" cn="w-[75%] mb-2" btnname="Sign In" />
                </form>
                <div>Didn't have an account? <span className=" text-primary cursor-pointer underline" ><Link to="/users/sign_up">Sign up</Link></span></div>
            </div>
        </div>
    )
}

export default Signin