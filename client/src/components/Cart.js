import React from 'react'

const Cart = ({user}) => {
    return (
        <>
            {
                user?.cart.map((item, index)=>{
                    return (
                        <div key={index}>
                        {console.log("Items in our cart: ", item)}
                        </div>
                    )
                })
            }
        </>
    )
}

export default Cart