import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../assets/noImage.png'

// import { ShoppingCart} from '../CartContext/cartContext';

const DisplayAll = () => {

    const [results,setResults]= useState([])

    

    const options = {
        method: 'GET',
        url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
        params: {limit: '20'},
        headers: {
            'X-RapidAPI-Key':"SECRET_API",
            'X-RapidAPI-Host': 'SECRET_HOST'
        }
    };
    const getData = async ()=>{
        await axios.request(options)
            .then(function (response) {
                console.log(response.data.results);
                setResults(response.data.results)
            })      
            .catch(function (error) {
                console.log(error);
            });
        }

    useEffect(()=>{
        getData()
    },[])
    // const today = Date.now();
    //     console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
    // const globalState = useContext(ShoppingCart)

    // console.log(ShoppingCart)
    // // const dispatch = globalState.dispatch

  return (
    <div>
        <h1 id="home" className="mt-10 text-9xl dashboard">JUST 4 KICKS</h1>
        <div className='h-full pt-24 pb-20 mx-6'>
            <div className='grid grid-cols-4 gap-4 '>
                {results.map((item, index)=>{
                    return(
                        <div key={index} className='max-w-full max-h-full'>
                    
                            <div  className=" max-w-md h-[30rem] bg-white border border-cyan-700 rounded-lg shadow-lg shadow-zinc-600 dark:bg-gray-800 dark:border-gray-700">
                                {/* set up route */}
                                <Link to={'#'}>
                                    {item.image.small?
                                    <img className="rounded-t-md h-26 w-52 " src={item.image.small} alt="/" />:
                                    <img src={noImage} className="h-26 w-52" alt="/"/>}
                                    
                                </Link>
                            <div className="p-2">
                                {/* set up route */}
                                <Link to={'#'}>
                                    <div>
                                        <label  className='text-cyan-700 font-bold text-xl' >Brand: 
                                            <span className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {item.brand}</span>
                                        </label>
                                    </div>
                                </Link>
                                <div>
                                    <label className='text-cyan-700 font-bold'>Name:
                                        <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.name}</span>
                                    </label>
                                </div>
                                <div>
                                    <label  className='text-cyan-700 font-bold'>Color:
                                        <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.colorway}</span>
                                    </label >
                                </div>
                                <div>
                                    <label className='text-cyan-700 font-bold' >Gender:
                                        <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.gender}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className='text-cyan-700 font-bold'>Market Value:
                                        <span className=" font-normal text-gray-700 dark:text-gray-400"> ${item.estimatedMarketValue}</span>
                                    </label>
                                </div>
                                <div>
                                    <label className='text-cyan-700 font-bold'>Date Release:
                                    
                                        <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.releaseDate}</span>
                                    </label>
                                </div>




                                


                                {/* set up route */}
                                <div >

                                    <Link to={'#'} className="inline-flex items-center px-4 py-2 h-10 text-sm font-medium text-center text-white bg-sky-800 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                                        View
                                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </Link>
                                    <button 
                                    className=" ml-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-800 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                                        Add+
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </button>
                                    {/* {results?<p>Added in Bag</p>:null} */}
                                    </div>

                                    
                            </div>
                            </div>
                            
                    </div>
                    )
            })}
            </div>
        </div>
        
    </div>
  )
}

export default DisplayAll
