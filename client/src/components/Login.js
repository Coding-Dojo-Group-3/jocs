import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {userActions} from '../store/index'


const Login = ({setShowLogin}) => {
    const dispatch = useDispatch()
    const [input,setInput] = useState({})
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        // console.log("Attempting to login")
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login' ,input, {withCredentials:true})
        .then((res)=>{
            // console.log("Login: ", res.data)
            dispatch(userActions.set_user(res.data)) 
            setInput({})
            setErrors({})
            navigate('/')
        })
        .catch((err)=>{
            console.log("Login errors: ", err.response.data)
            setErrors(err.response.data)
        })
    }

    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const handleRegister = (e)=>{
        setShowLogin(false)
    }

    return (
        
        <div>
                <form className="mt-3" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email:
                        </label>
                        <input
                            autoComplete="email"
                            value={input.email}
                            onChange={changeHandler}
                            type="email"
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password:
                        </label>
                        <input
                            autoComplete="password"
                            value={input.password}
                            onChange={changeHandler}
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors.message && (<p className="text-red-500 text-xs italic">{errors.message}</p>)
                        }
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-bold text-center text-cyan-700">
                    {" "}New to Just 4 Kicks?{" "}
                </p>
                <p className="mt-2 text-xs font-light text-center text-gray-700">
                <button 
                    onClick={handleRegister}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full"
                >
                    Register
                </button>
                </p>
        </div>
    )
}

export default Login