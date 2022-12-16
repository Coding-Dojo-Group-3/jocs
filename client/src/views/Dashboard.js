import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../store/index'

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

    return (
        <>
            {user}
        </>
    )
}

export default Dashboard