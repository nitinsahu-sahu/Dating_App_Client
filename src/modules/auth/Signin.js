import React, { useState } from 'react'
import { InputModule, LabelModule, ButtonModule } from '../../components/formField/FormField'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/action/userAuth.action'
import { useFormik } from 'formik';
import { signinSchema } from '../validationSchema'

const Signin = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.userAuth);
    const navigate = useNavigate();
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
                            loginWith === 'email' ? <><LabelModule title="Email address" for="email" />
                                <InputModule
                                    type="email"
                                    name="loginId"
                                    placeholder="Enter your email"
                                    value={values.loginId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {errors.loginId && <p className='text-xs text-red-500'>{errors.loginId}</p>}
                            </> : <>
                                <LabelModule title="Mobile number" for="number" />
                                <InputModule
                                    type="number"
                                    name="loginId"
                                    placeholder="Enter your number"
                                    value={values.loginId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.number && <p className='text-xs text-red-500'>{errors.number}</p>}
                            </>
                        }


                    </div>
                    <div className="mb-4 w-[75%]">
                        <LabelModule title="Password" for="password" />
                        <InputModule
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
                    </div>
                    <ButtonModule typ="submit" cn="w-[75%] mb-2" btnname="Sign In" />
                    {
                        auth.message == "" ? <p className="text-xs text-red-500">{auth.errors}</p> : <p className="text-xs text-green-500" >{auth.message}</p>
                    }
                </form>
                <div>Didn't have an account? <span className=" text-primary cursor-pointer underline" ><Link to="/users/sign_up">Sign up</Link></span></div>
            </div>
        </div>
    )
}

export default Signin