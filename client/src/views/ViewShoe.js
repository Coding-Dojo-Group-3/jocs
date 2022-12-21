/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import ShoeNavBar from '../components/ShoeNavBar'
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment"
import {userActions} from '../store/index'
import {useNavigate} from 'react-router-dom'


const ViewShoe = () => {
    const API_HOST = process.env.REACT_APP_SECRET_HOST
    const API_KEY = process.env.REACT_APP_API_KEY
    const dispatch = useDispatch()
    const { id } = useParams();
    const [shoe, setShoe] = useState({});
    const user = useSelector(state => state.user)
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const [state, setState] = useState()
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    const options = {
        method: "GET",
        url: ` https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,

        headers: {
            "X-RapidAPI-Key":API_KEY ,
            "X-RapidAPI-Host":API_HOST
        },
    };
    useEffect( ()=> {
        if(isLoggedIn) {
            axios.get(`http://localhost:8000/api/users/${state.user.id}`, {withCredentials:true} )
            .then(res => {
                console.log("Logged In User: ", res.data)
                dispatch(userActions.set_user(res.data)) 
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    useEffect(()=>{
        axios.post('http://localhost:8000/api/users/isLoggedIn', {}, {withCredentials:true})
        .then((res)=>{
            console.log("Logged In State: ", res.data)
            setIsLoggedIn(true)
            setState(res.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
        },[user])
    
    const shoeData = async ()=>{
        await axios
        .request(options)
            .then(function (response) {
            console.log("SINGLE SHOE RESULTS", response.data.results);
            setShoe(response.data.results[0]);
            setLoaded(true)
            })
            .catch(function (error) {
            console.error("Response Error",error.response);
            })
    }

    useEffect(() => {
        window.scrollTo(0,0);
        setLoaded(false)
        shoeData()
    }, []);

    const addToCart = (item)=> {
        console.log("Attempting to add to cart", item)
        let newUserCart = [...user.cart, item]
        let newUser = {...user}
        newUser.cart = newUserCart
        console.log("New user cart: ", newUser.cart)
        let id = user._id
        delete newUser._id
        axios.patch(`http://localhost:8000/api/users/${id}`, newUser , {withCredentials:true})
            .then((res) => {
                console.log(res.data);
                dispatch(userActions.set_user()) 
                navigate(`/user/cart/${user._id}`);
            })
            .catch((err) => {
                console.log("Error in add to cart: ", err);
            });
    };

    const numberWithCommas= (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <div>
                <h1 id="home" className="text-9xl dashboard">JUST 4 KICKS</h1>
                <ShoeNavBar shoe={shoe}/>
        {
            loaded ?
                <div className="theme mt-10 ml-20">
                    <div className="columns-2 justify-between gap-10 min-w-100">
                        <main className="md:py-5 md:px-5 w-5/8 mr-20 ">
                            <div>
                                <img src={shoe.image?.original} alt={shoe.name} className="w-full h-full" loading="lazy" />
                            </div>
                        </main>
                            <div className="flex flex-col sm:w-fit ml-auto mr-40">
                                <h1 className="capitalize text-2xl"> {shoe.name}</h1>
                                <h1 className="capitalize mb-3 font-normal text-gray-700 dark:text-gray-400 text-md"> {shoe.gender} - {shoe.colorway}</h1>
                                <hr/>
                                <label className="mt-5">SKU#:
                                    <span className=""> {shoe.sku} IN STOCK</span>
                                </label>
                                <label className="text-2xl">Retail Price:
                                    <span className="text-red-600"> ${numberWithCommas(shoe.retailPrice)}</span>
                                </label>
                                <label className="text-2xl">Est.Market Value:
                                    <span className="text-red-600"> ${numberWithCommas(shoe.estimatedMarketValue)}</span>
                                </label>
                                <hr/>
                                <label className="mt-5 text-2xl">Release Date:
                                    <span className="text-2xl"> {moment(shoe.releaseDate).format("ll") }</span>
                                </label>
                                {console.log(user)}
                                {
                                    user ? 
                                    <button 
                                        onClick={(e)=>addToCart(shoe)}
                                        className="mx-4 mb-5 mt-4 text-center px-3 py-2 text-sm font-medium shadow-inner text-white bg-sky-800 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                                            Add To Bag
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-flex pl-2 w-6 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                    </button>
                                    :
                                    <h1 className="mb-5 text-center mt-2 text-xs italic text-gray-600">Login to add to cart</h1>
                                }
                                <hr/>
                                <label className="mt-3 text-lg">Description:
                                    <span className="text-base text-gray-600"> {shoe.story}</span>
                                </label>
                                <label className="links mt-3 text-lg flex flex-col">Links:</label>
                                    {
                                        shoe.links?.fightclub &&
                                        <a href={shoe.links?.fightclub} target='_blank' rel="noreferrer" className="font-bold text-blue-500 hover:text-sky-300 ml-20 cursor-pointer">FIGHT CLUB</a> 
                                    }
                                    {
                                        shoe.links?.goat &&
                                        <a href={shoe.links?.goat} target='_blank' rel="noreferrer" className="font-bold text-blue-500 hover:text-sky-300 ml-20">GOAT</a> 
                                    }
                                    {
                                        shoe.links?.stadiumGoods &&
                                        <a href={shoe.links?.stadiumGoods} target='_blank' rel="noreferrer" className="font-bold text-blue-500 hover:text-sky-300 ml-20">StadiumGoods</a>
                                    }
                                    {
                                        shoe.links?.stockX &&
                                        <a href={shoe.links?.stockX} target='_blank' rel="noreferrer" className="font-bold text-blue-500 hover:text-sky-300 ml-20">StockX</a>  
                                    }
                            </div>     
                        </div>
                </div>
            :
            <div className="text-center">
                    <button disabled type="button" className=" font-medium text-2xl items-center">
                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Loading...
                    </button>
                    <h1 className="list invisible">1</h1>
                </div>
        }
        </div>
        </>
    )
};

export default ViewShoe;

