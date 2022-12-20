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
        },[])

    return (
    <>
        <h1 id="home" className="text-9xl dashboard">JUST 4 KICKS</h1>
        <CartNavBar/>
        <Cart user={user}/>
    </>
    )
}

export default ViewCart