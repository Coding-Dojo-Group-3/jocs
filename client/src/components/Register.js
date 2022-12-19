import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'



const Register = ({setShowModal, setShowLogin}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [input,setInput] = useState({})
    const [errors, setErrors] = useState({});

    const submitHandler=(e)=>{
        console.log("Attempting to register")
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/register', input, {withCredentials:true})
            .then((res)=>{
                console.log("Success Registration: ", res.data)
                dispatch(userActions.set_user(res.data)) 
                setShowModal(false)
                setInput({})
                setErrors({})
                console.log("Saved User Cart:", user.user.cart)
                navigate('/')
            })
            .catch((err)=>{
                console.log("Registration errors: ", err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            })
    }

    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const handleSignIn = (e)=>{
        setShowLogin(true)
    }
    
    return (
        <>
                    <div>
                        <form className="mt-3"  onSubmit={submitHandler}>
                            <div className="mb-2">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    First Name:
                                </label>
                                <input
                                    name="firstName"
                                    autoComplete="firstName"
                                    value={input.firstName}
                                    onChange={changeHandler}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                { 
                                errors?.firstName ? (<p className="text-red-500 text-xs italic">{errors?.firstName.message}</p>) : null
                                }
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Last Name:
                                </label>
                                <input
                                    name="lastName"
                                    autoComplete="lastName"
                                    value={input.lastName}
                                    onChange={changeHandler}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                { 
                                errors?.lastName ? (<p className="text-red-500 text-xs italic">{errors?.lastName.message}</p>) : null
                                }
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email:
                                </label>
                                <input
                                    name="email"
                                    autoComplete="email"
                                    value={input.email}
                                    onChange={changeHandler}
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                { 
                                errors?.email ? (<p className="text-red-500 text-xs italic">{errors?.email.message}</p>) : null
                                }
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password:
                                </label>
                                <input
                                    name="password"
                                    autoComplete="password"
                                    value={input.password}
                                    onChange={changeHandler}
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                { 
                                    errors?.password ? (<p className="text-red-500 text-xs italic">{errors?.password.message}</p>) : null
                                }
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Confirm Password:
                                </label>
                                <input
                                    name="confirmPassword"
                                    autoComplete="confirmPassword"
                                    value={input.confirmPassword}
                                    onChange={changeHandler}
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                { 
                                    errors?.confirmPassword ? (<p className="text-red-500 text-xs italic">{errors?.confirmPassword.message}</p>) : null
                                }
                            </div>
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
                                    Submit
                                </button>
                            </div>
                        </form> 

                        <p className="mt-8 text-xs font-bold text-center text-cyan-700">
                            {" "}Already have an account?{" "}
                        </p>
                        <p className="mt-2 text-xs font-light text-center text-gray-700">
                            <button 
                                onClick={handleSignIn}
                                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

        </>
    )
}

export default Register