import React from 'react'
import {useNavigate
} from 'react-router-dom'


const NotFound = () => {
    const navigate = useNavigate()

    return (
    <div className='body_'>
        <section>
            <button className='btn2' onClick={()=>navigate('/dashboard')}>Home</button>
            <div className="ufo-container">
                <div className="lifting-ray-container">
                    <div className="lifting-ray"></div>
                    <div className="lifting-ray-overlay"></div>
                </div>
                <div className="ufo">
                    <div className="ufo-glass">
                        <div className="alien">
                            <div className="alien-eye alien-eye-left"></div>
                            <div className="alien-eye alien-eye-right"></div>
                            <div className="alien-mouth"></div>
                        </div>
                    </div>
                    <div className="ufo-bottom"></div>
                    <div className="ufo-ring">
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                        <div className="ufo-ring-light"></div>
                    </div>
                </div>
            </div>
            <h1 className='h1_'> The page is out there </h1>
            <div className="number number-left"> 4 </div>
            <div className="number number-right"> 4 </div>
            <div className="my-planet">
                <div className="my-planet-rings my-planet-rings-back"></div>
                <div className="my-planet-ellipsis-container">
                    <div className="my-planet-counter-rotation-container">
                        <div className="my-planet-planet">
                            <div className="my-planet-face">
                                <div className="my-planet-eye my-planet-eye-left"></div>
                                <div className="my-planet-eye my-planet-eye-right"></div>
                                <div className="my-planet-mouth"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-planet-rings my-planet-rings-front"></div>
            </div>

        </section>

    <div className="stars"></div>
    <div className="twinkling"></div>
</div>
)
}
export default NotFound


