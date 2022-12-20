import React from 'react'
import { Link } from 'react-router-dom';
import noImage from '../assets/noImage.png'
import moment from 'moment'

const Cart = ({user}) => {
    return (
        <>
            <div className='h-full pt-3 pb-20 mx-6'>
                <div className='grid grid-cols-4 gap-5 text-center'>
                    {
                        user?.cart.map((item, index)=>{
                            return (
                                <div key={index} className='capitalize max-w-full max-h-full'>
                                    <div  className="grid place-items-center max-w-md h-[30rem] bg-white border border-cyan-700 rounded-lg shadow-lg shadow-zinc-600 dark:bg-gray-800 dark:border-gray-700">
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
                                                <span className=" font-normal text-gray-700 dark:text-gray-400"> {item.releaseDate === "" ? "TBA" : moment(item.releaseDate).format("ll")}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Cart