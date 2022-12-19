import CartNavBar from "../components/CartNavBar"
import axios from 'axios'
import {React, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'
import Cart  from "../components/Cart"

const ViewCart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect( ()=> {
        console.log("User: ", user)
        if(user) {
            axios.get('http://localhost:8000/api/users/' + user._id, {withCredentials:true} )
            .then(res => {
                console.log("Logged In User: ", res.data)
                dispatch(userActions.set_user(res.data)) 
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.user])

    useEffect(()=>{
        axios.post('http://localhost:8000/api/users/isLoggedIn', {}, {withCredentials:true})
        .then((res)=>{
            console.log("Logged in: ",  res.data.user.firstName)
        })
        .catch((err)=>{
            console.log(err.response.data)
            dispatch(userActions.null_user()) 
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
    <>
        <h1 id="home" className="text-9xl dashboard">JUST 4 KICKS</h1>
        <CartNavBar/>
        <Cart user={user}/>
        {console.log("Redux user cart: ", user.cart)}
    </>
    )
}

export default ViewCart