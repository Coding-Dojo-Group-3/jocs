import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Register from './Register'
import Login from './Login'
import Update from './Update'

export default function ShoeNavBar({shoe}) {
    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleLogout = (e) => {
    // console.log("Attempting to logout")
    axios.get('http://localhost:8000/api/users/logout', {withCredentials:true})
        .then(()=>{
            // console.log("Successfully logged out")
            dispatch(userActions.null_user()) 
            window.scrollTo(0,0);
            navigate("/")
        })
        .catch((err)=>{
            console.log("Unsuccessful logout: ", err)
        })
    }

    const handleUpdateModal = (e) => {
        setShowUpdate(true)
        setShowModal(true)
    }

    const handleHome = () => {
        navigate(`/dashboard`)
    }
    return (
        <nav className="w-full nav shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-2 md:block">
                        <div className="dashboard text-3xl uppercase">
                            {shoe.name}
                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-black-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            {
                                user &&
                                <li>
                                    <button onClick={handleLogout} className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-1 px-4 rounded-full">
                                        Logout
                                    </button>
                                </li>
                            }
                            {
                                user &&                                     
                                <li className="text-white hover:text-blue-600 cursor-pointer">
                                    <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={()=> handleUpdateModal() }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </li>
                            }
                            {
                                user &&
                                <li>
                                    <button onClick={()=> navigate(`/user/cart/${user._id}`)}>
                                        <svg className="shoe w-6 h-6 text-white hover:text-blue-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                        <div className="shoeBadge">
                                            {user.cart?.length}
                                        </div>
                                    </button>
                                </li>
                            }
                            <li>
                                <button onClick={handleHome} className="shoeHome">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mr-16">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                        {
                            showModal ? (
                                <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t gap-20">
                                        <h3 className="text-3xl font-semibold text-cyan-900">
                                            {showLogin? "Sign In" : showUpdate? "Update" : "Register"}
                                        </h3>
                                        <div className="close">
                                            <button
                                                className="text-red-600 ml-10 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150 close"
                                                onClick={() => setShowModal(false)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            </button>
                                        </div>
                                        <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        {
                                            showLogin ? 
                                            
                                            <Login setShowModal={setShowModal} setShowLogin={setShowLogin}/>
                                            : showUpdate ?
                                            <Update setShowModal={setShowModal}/>
                                            :
                                            <Register setShowModal={setShowModal} setShowLogin={setShowLogin}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                        ) : null
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}