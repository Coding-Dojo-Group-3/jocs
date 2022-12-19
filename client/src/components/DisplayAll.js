import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../assets/noImage.png'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const DisplayAll = ({search, setSearch}) => {

    const [results,setResults]= useState([])
    const [data,setData]= useState("estimatedMarketValue:desc")
    const [page, setPage]= useState("0")
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [loaded, setLoaded] = useState(false)

    const options = {
        method: 'GET',
        url: `https://the-sneaker-database.p.rapidapi.com/sneakers/`,
        params: {
            limit: '12',
            page: page,
            sort: data
        },
        headers: {
            'X-RapidAPI-Key': "bab2d550f1msh1c440e012c6df05p1b3d5ejsn1d8cfea8cd4e",
            'X-RapidAPI-Host': "the-sneaker-database.p.rapidapi.com",
        }
    };

    const searchOptions = {
        method: 'GET',
        url: `https://the-sneaker-database.p.rapidapi.com/search?limit=12&query=${search}&page=${page}`,
        headers: {
            'X-RapidAPI-Key': "bab2d550f1msh1c440e012c6df05p1b3d5ejsn1d8cfea8cd4e",
            'X-RapidAPI-Host': "the-sneaker-database.p.rapidapi.com",
        }
    }

    const getData = async ()=>{
        if(search === "") {
            await axios.request(options)
                .then(function (response) {
                    console.log("Shoe list: ", response.data.results);
                    setLoaded(true)
                    setResults(response.data.results)
                })      
                .catch(function (error) {
                    setLoaded(false)
                    console.log(error);
                });
        } else {
            console.log("Search:", search, typeof search)
            await axios.request(searchOptions)
            .then(function (response) {
                setLoaded(true)
                console.log("Shoe list: ", response.data.results);
                setResults(response.data.results)
            })      
            .catch(function (error) {
                setLoaded(false)
                console.log(error);
            });
        }
    }

    useEffect(()=>{
        setLoaded(false)
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, page, search])


    const addToCart = ()=> {

    }

    const handlePrevious = () => {
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'})
        let temp = page
        let number= Number(temp)
        if(number !== 0) {
            number--
            String(number)
            setPage(number)
        }
    }

    const resetPage = (e) => {
        setPage(0)
        setSearch("")
    }

    const handleNext = () => {
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'})
        let temp = page
        let number = Number(temp)
        number++
        String(number)
        setPage(number)
    }

    const handleSort = (e) => {
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'})
        setData(e.target.value)
    }

    return (
        <div>
            <div className={search && "flex justify-between"}>
                {
                    search ? 
                        <div>
                            <button className="ml-20 mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                onClick={resetPage}>
                                {search} <span className="clear">X</span>
                            </button>
                        </div>
                        :
                        <div className={!search && "grid place-items-end"}>
                            <form>
                                <select onChange={handleSort}>
                                    <option value="estimatedMarketValue:desc">Initial Results</option>
                                    <option value="name:asc">Alphabetical</option>
                                    <option value="brand:asc">Brand Names (A - Z)</option>
                                    <option value="brand:desc">Brand Names (Z - A)</option>
                                    <option value="releaseDate:desc">New Arrivals</option>
                                    <option value="retailPrice:asc">Retail Price (Low to High)</option>
                                    <option value="retailPrice:desc">Retail Price (High to Low)</option>
                                    <option value="estimatedMarketValue:asc">Market Value (Low to High)</option>
                                </select>
                            </form>
                        </div>
                }
            </div>
            {
            loaded ?
            <>
                    <div className='h-full pt-3 pb-20 mx-6'>
                        <div className='grid grid-cols-4 gap-5 text-center'>
                            {results.map((item, index)=>{
                                return(
                                    <div key={index} className='capitalize max-w-full max-h-full'>
                                
                                        <div  className="grid place-items-center max-w-md h-[30rem] bg-white border border-cyan-700 rounded-lg shadow-lg shadow-zinc-600 dark:bg-gray-800 dark:border-gray-700">
                                            {/* set up route */}
                                            <Link to={`/shoe/${item.id}`}>
                                                {item.image.small?
                                                <img className="rounded-t-md h-26 w-52 " src={item.image.small} alt="/" />:
                                                <img src={noImage} className="h-26 w-52" alt="/"/>}
                                                
                                            </Link>
                                        <div className="p-2">
                                            <div>
                                                <label  className='text-cyan-700 font-bold text-xl' >Brand: 
                                                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {item.brand}</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className='text-cyan-700 font-bold'>Name:
                                                    <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.name}</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className='text-cyan-700 font-bold' >Gender:
                                                    <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.gender}</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className='text-cyan-700 font-bold'>Retail Price:
                                                    <span className=" font-normal text-gray-700 dark:text-gray-400"> ${item.retailPrice}</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className='text-cyan-700 font-bold'>Market Value:
                                                    <span className=" font-normal text-gray-700 dark:text-gray-400"> ${item.estimatedMarketValue === 0 ? 100 : item.estimatedMarketValue }</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className='text-cyan-700 font-bold'>Release date:
                                                    <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.releaseDate === "" ? "TBA" : item.releaseDate}</span>
                                                </label>
                                            </div>
                                            <div className="mt-5">
                                                <Link to={`/shoe/${item.id}`} className="inline-flex items-center px-4 py-2 h-10 text-sm font-medium text-center text-white bg-sky-800 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                                                    View
                                                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </Link>
                                                {
                                                    user?.user  ?
                                                    <>
                                                        <button 
                                                        onClick={addToCart}
                                                        className="mb-10 ml-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-800 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                                                            Add+
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                    :
                                                    <h1 className="mt-2 text-xs italic font-bold">Login to add to cart</h1>
                                                }
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                )
                        })}
                        </div>
                    </div>
                    <div className="mb-10 grid place-items-center">
                        <form>
                            <ul className="inline-flex -space-x-px">
                                <li>
                                    <p onClick={handlePrevious} className="cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</p>
                                </li>
                                <li>
                                    <p  onClick={handleNext} className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
                                </li>
                            </ul>
                        </form>
                    </div>
                </>
                :
                <div className="text-center">
                    {/* <h1 className='list'>Loading</h1> */}
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
    )
}

export default DisplayAll