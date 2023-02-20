import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'



const Update = ({setShowModal, setIsLoggedIn}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [input,setInput] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
    })
    const [errors, setErrors] = useState({});

    const submitHandler=(e)=>{
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/users/${user._id}`, input, {withCredentials:true})
            .then((res)=>{
                dispatch(userActions.set_user(res.data)) 
                setShowModal(false)
                setInput({})
                setErrors({})
                navigate('/')
            })
            .catch((err)=>{
                console.log("Update errors: ", err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            })
    }

    const submitPassHandler=(e)=>{
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/users/${user._id}/password`, input, {withCredentials:true})
            .then((res)=>{
                if(res.data.cart===undefined){
                    res.data.cart = []
                }
                dispatch(userActions.set_user(res.data))
                setShowModal(false)
                setInput({})
                setErrors({})
                navigate('/')
            })
            .catch((err)=>{
                console.log("Update errors: ", err)
                setErrors(err)
            })
    }

    const id = user?._id

    const deleteHandler=(e)=>{
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then((res)=>{
                dispatch(userActions.null_user())
                setShowModal(false)
                setIsLoggedIn(false)
                setInput({})
                setErrors({})
                navigate('/')
            })
            .catch((err)=>{
                console.log("Delete errors: ", err)
                setErrors(err)
            })
    }

    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
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
                            <div className="mt-6 mb-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
                                    Update Settings
                                </button>
                            </div>
                        </form>
                    </div>
                    <div  className='border-t border-solid border-slate-200'>
                        <h3 className='mt-2 mb-2 text-lg font-bold'>Change Password</h3>
                        <form onSubmit={submitPassHandler}>
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
                            <div className="mt-6 mb-3">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                    <div  className='border-t border-solid border-slate-200'>
                        <div className="mt-3">
                            <button onClick={deleteHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                                Delete Account
                            </button>
                        </div>
                    </div>


        </>
    )
}

export default Update