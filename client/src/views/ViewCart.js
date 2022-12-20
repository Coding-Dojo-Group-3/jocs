import CartNavBar from "../components/CartNavBar"
import axios from 'axios'
import {React, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'
import Cart  from "../components/Cart"
import {useNavigate} from 'react-router-dom'

const ViewCart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const [state, setState] = useState()
    const navigate = useNavigate()

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
            navigate("/")
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
        },[user])

    const calcTotal = ()=> {
        let sum = 0
        user.cart.filter(item=>{
            console.log("All totals in cart: ", item.estimatedMarketValue)
            sum += item.estimatedMarketValue 
            return sum
        })
        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
    <>
        <h1 id="home" className="text-9xl dashboard">JUST 4 KICKS</h1>
        <CartNavBar/>
        {console.log("Cart size: ", user?.cart.length)}
        {
            user?.cart.length > 0 ?
            <div className="columns-2 flex justify-around">
                <Cart user={user}/>
                <div className="w-1/4 h-1/2 border p-6 mr-10 mt-10 summary">
                    <h1 className="text-xl font-bold mb-1">Summary</h1>
                    <hr/>
                    <div className="flex justify-between mt-3">
                        <h3>Subtotal</h3>
                        <h3>${calcTotal()}</h3>
                    </div>
                    <div className="flex justify-between">
                        <h3>Tax</h3>
                        <h3>$0.00</h3>
                    </div>
                    <hr/>
                    <div className="flex justify-between font-bold mt-3">
                        <h2 className="">Order Total</h2>
                        <h2>${calcTotal()}</h2>
                    </div>
                    <div className="grid place-items-center mt-10">
                        <button className="bg-black text-white pr-6 pl-6 pt-2 pb-2 uppercase">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            :
            <h1 className="mt-10 text-center text-2xl">Your shopping cart is empty!</h1>
        }
    </>
    )
}

export default ViewCart