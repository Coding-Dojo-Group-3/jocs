import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import NavBar from './NavBar'
import { useSelector } from 'react-redux'
import moment from "moment"


const SingleProduct = () => {

    const API_HOST = process.env.REACT_APP_SECRET_HOST
    const API_KEY = process.env.REACT_APP_API_KEY


    const { id } = useParams();
    const [singleOne, setSingleOne] = useState("");
    const user = useSelector(state => state.user)

    const navigate = useNavigate()

    const options = {
        method: "GET",
        url: ` https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,

        headers: {
            "X-RapidAPI-Key":API_KEY ,
            "X-RapidAPI-Host":API_HOST
        },
};
    const shoeData = async ()=>{
        await axios
        .request(options)

        .then(function (response) {
        console.log("SINGLE SHOE RESULTS", response.data.results);
        setSingleOne(response.data.results[0]);
        })
        .catch(function (error) {
        console.error("Response Errr",error.response);
    })
}

    useEffect(() => {
        shoeData()
}, [singleOne]);

    const addToCart = ()=> {

    }

    return (
        <div>
            <h1 id="home" className="mt-8 text-9xl dashboard hover:text-sky-500 cursor-pointer" onClick={()=>navigate('/')}>JUST 4 KICKS</h1>
            <NavBar/>
            <div className="mx-52 max-w-full capitalize font-mono pt-1 ">
                <div className="mx-30 py-12 flex flex-col items-center border rounded-lg bg-zinc-50 shadow-lg shadow-sky-500 md:flex-row border-double  border-sky-500  ">
                    <main className="py-8 px-4 sm:p-6 md:py-10 md:px-52 mt-12 w-full">
                        <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                            <img src={singleOne.image?.original} alt="" className="w-full h-60 object-cover rounded-lg sm:h-96 sm:col-span-4 lg:col-span-full" loading="lazy" />
                            {/* <div></div> */}
                            {/* <img src={singleOne.image?.small} alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
                            <img src={singleOne.image?.thumbnail}  alt="" className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" /> */}

                        </div>
                    </main>
            
                    <div className="px-8  " >

                    </div>

                        <div class="relative p-3 m-10 pb-20 col-start-1 row-start-1 flex flex-col rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1 divide-y-4 divide-zinc-200/25  h-full  bg-zinc-100">
                            
                            <h5 class="mb-2 mt-10 text-2xl mx-4 font-bold tracking-tight text-gray-900 dark:text-white">{singleOne.name}</h5>
                        
                            <label className="mx-4 mb-2 pt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Color:
                                <span class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-md"> {singleOne.colorway}</span>
                            </label>
                            

                            <label className="mx-4 mb-2 pt-4  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Gender:
                                <span class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-md"> {singleOne.gender}'s</span>
                            </label>
                            <label className="mx-4 mb-2 pt-4  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Retail Price:
                                <span class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-md"> ${singleOne.retailPrice}.00</span>
                            </label>
                            <label className="mx-4 mb-2 pt-4  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Est.Market Value:
                                <span class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-md"> ${singleOne.estimatedMarketValue}.00</span>
                            </label>
                            <label className="mx-4 mb-2 pt-4  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Release Date:
                                <span class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-md"> {moment(singleOne.releaseDate).format("DD-MM-YYYY") }</span>
                            </label>
                            
                            
                            {
                                                    user?.user ? 
                            
                                
                                <button 
                                    onClick={addToCart}
                                    className="mx-4 mb-3 mt-4 text-center px-3 py-2 text-sm font-medium shadow-inner text-white bg-sky-800 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                                        Add To Bag
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-flex pl-2 w-6 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                </button>
                            :
                            <h1 className="mt-2 text-xs italic font-bold">Login to add to cart</h1>
                        }
                        </div>     
                    </div>
            
            </div>
                <div className="pt-5 ">
            
                    <div className="flex flex-col items-center mx-20 pt-8 mb-20 font-mono pb-10 border-1 bg-gradient-to-r from-sky-200 to-cyan-600 hover:shadow-2xl">
                        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What's The Story?</h3>
                        {singleOne.story?
                            <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">{singleOne.story}</p>:
                            <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">Story is not given...</p>}
                            
                            
                            <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Can Also Find On:</p>
                                <a href={singleOne.links?.fightclub} target='_blank' rel="noreferrer" className="font-bold text-sky-100 hover:text-blue-500">FIGHT CLUB</a> 
                                <a href={singleOne.links?.goat} target='_blank' rel="noreferrer" className="font-bold text-sky-100 hover:text-blue-500">GOAT</a> 
                                <a href={singleOne.links?.stadiumGoods} target='_blank' rel="noreferrer" className="font-bold text-sky-100 hover:text-blue-500">StadiumGoods</a>
                                <a href={singleOne.links?.stockX} target='_blank' rel="noreferrer" className="font-bold text-sky-100 hover:text-blue-500">StockX</a>  
                    </div>
                </div>
            
            
        
        </div>
    )
};

export default SingleProduct;

