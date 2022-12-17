import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'
import { gsap } from "gsap";
import { ScrollTo } from "react-scroll-to";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Shoe from "../assets/cartoon.png"

const Dashboard = () => {

    const dispatch = useDispatch()

    // const counter = useSelector(state => state.value)
    const user = useSelector(state => state.user)

    // const handleIncrement = () => {
    //     dispatch(counterActions.increment())
    // }

    // const handleDecrement = () => {
    //     dispatch(counterActions.decrement())
    // }

    // const increaseHandler = () => {
    //     dispatch(counterActions.increase(5)) 
    // }

    // const toggleCounterHandler = () => {
    //     dispatch(counterActions.toggle())
    // }

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


    return (
        <>
            {/* {user} */}
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
                        <image fill="#fff" x="440" y="-20" width="350px" height="300px" xlinkHref={Shoe}></image>
                        <rect onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}  onClick={handleArrowClick} id="arrowBtn" width="100" height="100" opacity="0" x="550" y="220" className="cursor-pointer"/>
                        <polyline className="arrow" fill="#fff" points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" />
                    </svg>
                </div>
            </div>
            <h1 id="home" className="h-full text-9xl dashboard ">JUST 4 KICKS</h1>
            <h1 className="title">Shoe List</h1>
        </>
    )
}

export default Dashboard