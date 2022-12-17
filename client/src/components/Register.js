import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'



const Register = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const [errors, setErrors] = useState({});

    const submitHandler=(e)=>{
        console.log("Attempting to register")
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/register', user, {withCredentials:true})
            .then((res)=>{
                console.log("Success Registration: ", res.data)
                // dispatch({
                //     type: "SET_USER",
                //     payload: {
                //         id: res.data.user._id,
                //         firstName: res.data.user.firstName
                //     }
                // })
                setUser({})
                setErrors({})
                // navigate('/dashboard')
            })
            .catch((err)=>{
                console.log("Registration errors: ", err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            })
    }

    const changeHandler=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    return (
        <>
                <form className="mt-6"  onSubmit={submitHandler}>
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
                            value={user.firstName}
                            onChange={changeHandler}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            value={user.lastName}
                            onChange={changeHandler}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            value={user.email}
                            onChange={changeHandler}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            value={user.password}
                            onChange={changeHandler}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            value={user.confirmPassword}
                            onChange={changeHandler}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        { 
                            errors?.confirmPassword ? (<p className="text-red-500 text-xs italic">{errors?.confirmPassword.message}</p>) : null
                        }
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Submit
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}Already have an account?{" "}
                </p>
                <p className="mt-2 text-xs font-light text-center text-gray-700">
                    {/* <Link to="/home"
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full"
                    >
                        Sign in
                    </Link> */}
                </p>
        </>
    )
}

export default Register