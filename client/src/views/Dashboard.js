import {React, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'
import { gsap } from "gsap";
import Shoe from "../assets/cartoon.png"
import NavBar from "../components/NavBar"
import axios from 'axios'
import DisplayAll from '../components/DisplayAll';


const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [search, setSearch]= useState("")
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const [state, setState] = useState()

    const mouseEnter = (e) => {
        gsap.to('.arrow', {y:10, duration:0.8, ease:'back.inOut(3)', 
        overwrite:'auto'});
    }

    const mouseLeave = (e) => {
        gsap.to('.arrow', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'});
    }
    const handleArrowClick = (e) => {
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'});
    }

    useEffect( ()=> {
        if(isLoggedIn) {
            document.getElementById('home').scrollIntoView({
                behavior: 'smooth'});
            axios.get(`http://localhost:8000/api/users/${state.user.id}`, {withCredentials:true} )
            .then(res => {
                // console.log("Redux User: ", res.data)
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
            // console.log("Logged In State: ", res.data)
            setIsLoggedIn(true)
            setState(res.data)
        })
        .catch((err)=>{
            console.log(err)
            dispatch(userActions.null_user()) 
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
        },[user])

    return (
        <>
            <div className="dashboard">
                <div className="scrollDist"></div>
                <div className="main">
                    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                        <mask id="m">
                            <g className="cloud1">
                                <rect fill="#fff" width="100%" height="801" y="799" />
                                <image xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg" width="1200" height="200"/>
                            </g>
                        </mask>
                        <image className="sky" xlinkHref="https://assets.codepen.io/721952/sky.jpg"  width="1200" height="590" />
                        <image className="mountBg" xlinkHref="https://assets.codepen.io/721952/mountBg.png" width="1200" height="800"/>    
                        <image className="mountMg" xlinkHref="https://assets.codepen.io/721952/mountMg.png" width="1200" height="800"/>    
                        <image className="cloud2" xlinkHref="https://assets.codepen.io/721952/cloud2.png" width="1200" height="800"/>    
                        <image className="mountFg" xlinkHref="https://assets.codepen.io/721952/mountFg.png" width="1200" height="800"/>
                        <image className="cloud1" xlinkHref="https://assets.codepen.io/721952/cloud1.png" width="1200" height="800"/>
                        <image className="cloud3" xlinkHref="https://assets.codepen.io/721952/cloud3.png" width="1200" height="800"/>
                        <image fill="#fff" x="440" y="-20" width="350px" height="300px" xlinkHref={Shoe} onClick={handleArrowClick} className="cursor-pointer "></image>
                        <rect onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}  onClick={handleArrowClick} id="arrowBtn" width="100" height="100" opacity="0" x="550" y="220" className="cursor-pointer"/>
                        <polyline className="arrow" fill="#fff" points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" />
                    </svg>
                </div>
            </div>
            <h1 id="home" className="mt-10 text-9xl dashboard">JUST 4 KICKS</h1>
            <NavBar search={search} setSearch={setSearch} setIsLoggedIn={setIsLoggedIn}/>
            <DisplayAll search={search} setSearch={setSearch}/>
        </>
    )
}

export default Dashboard