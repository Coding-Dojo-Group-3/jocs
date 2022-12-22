import {React, useEffect} from 'react'
import { Link } from 'react-router-dom';
import noImage from '../assets/noImage.png'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'

const Cart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(()=> {

    }, [user.cart])

    const numberWithCommas= (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const removeFromCart = (idx)=> {
        // console.log("Attempting to remove index from cart: ", idx)
        let newUserCart = [...user.cart]
        // console.log("Trying to remove: ", newUserCart[idx])
        newUserCart.splice(idx, 1)
        // console.log("Cart without item: ", newUserCart)
        
        let newUser = {...user}
        newUser.cart = newUserCart
        // console.log("New user cart: ", newUser.cart)
        let id = user._id
        delete newUser._id
        // console.log("New user without item and id: ", newUser)
        axios.patch(`http://localhost:8000/api/users/${id}`, newUser , {withCredentials:true})
            .then((res) => {
                // console.log(res.data);
                dispatch(userActions.set_user(res.data)) 
            })
            .catch((err) => {
                console.log("Error in remove from cart: ", err);
            });
    };

    return (
        <>
            {
                user?.cart.length > 0 ?
                <table className="hover:table-auto mt-10 ml-10 text-center lg:row-start-1 divide-y-4 divide-black">
                    <thead className="text-left">
                        <tr className="text-base">
                            <th className="pl-5">Item</th>
                            <th className="pl-10"></th>
                            <th className="pl-10">Price</th>
                            <th className="pl-10 pr-20">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user?.cart.map((item, idx)=>{
                                return (
                                    <tr key={idx} >
                                        <td >
                                            <Link to={`/shoe/${item.id}`} className="wrapper">
                                                {
                                                    item.image.small ?
                                                    <img className="rounded-t-md h-26 w-52 " src={item.image.small} alt="/" />
                                                    :
                                                    <img src={noImage} className="h-26 w-52" alt="/"/>
                                                }
                                            </Link>
                                        </td>
                                        <td className="text-left pl-10">
                                                <h2 className=" text-base font-bold text-black-600"> {item.brand}</h2>
                                                <h2 className=" font-normal text-gray-700 dark:text-gray-400"> {item.name}</h2>
                                        </td>
                                        <td className="text-left pl-10">
                                            <h2 className="text-base font-bold text-black-600"> ${item.estimatedMarketValue === 0 ? 100 :  numberWithCommas(item.estimatedMarketValue) }</h2>
                                        </td>
                                        <td className="text-left pl-10">
                                            <button className="hover:text-blue-600 underline" onClick={(e)=>removeFromCart(idx)}>Remove</button>
                                        </td>
                                    </tr>
                                )})
                        }
                    </tbody>
                </table>
                :
                null
            }
        </>
    )
}

export default Cart