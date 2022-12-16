import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Dashboard = () => {

    // const dispatch = useDispatch()

    // const counter = useSelector(state => state.value)
    const user = useSelector(state => state.user)

    // const handleIncrement = () => {
    //     dispatch({type: 'counter/incremented'})
    // }

    // const handleDecrement = () => {
    //     dispatch({type: 'counter/decremented'})
    // }

    return (
        <>
            {user}
        </>
    )
}

export default Dashboard