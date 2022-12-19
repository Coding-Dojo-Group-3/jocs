// import {useContext} from 'react'
// import { ShoppingCart } from '../CartContext/cartContext' 




// const Cart = () => {
//     const globalState = useContext(ShoppingCart)
//     const state  = globalState.state
//     const dispatch = globalState.dispatch;

//     const totalSum = state.reduce((totalSum, item)=>{
//         return totalSum + item.estimatedMarketValue * 1

//     }, 0)

//     return (

//     <div>
//         <h1>Your KICKS Shopping Cart</h1>
//         {
//             state.map((item, index)=>{
//                 return (
//                     <div key={index}>
//                         <img src={item.image.small} alt= ''/>
//                         <p>{item.brand}</p>
//                         <p>{1 * item.estimatedMarketValue}</p>
//                         <div>
//                             <button 
//                             onClick={()=> dispatch({type :'INCREASE', payload :item})} >
//                                 + Add
//                             </button>
//                             <p>QTY:{1}</p>
//                             <button
//                             onClick={()=>{
//                                 if (1 > 1){
//                                     dispatch({type :'DECREASE', payload : item});
//                                 }else {
//                                     dispatch({type :'REMOVE', payload : item})}                      
                                
//                             }}>
//                                 - Remove
//                             </button>
//                             <button
//                             onClick={()=>{
//                                 dispatch({type :'REMOVE', payload : item});
//                             }}
//                             >
//                                 Empty It
//                             </button>
//                         </div>
//                         <h2
//                         onClick={()=> dispatch({type :'REMOVE', payload : item})}>
//                         X </h2>

//                     </div>
//                 )
//             })
//         }
//         {state.length > 0 && (
//             <p>{totalSum}</p>
//         )}
//     </div>
//     )
// }

// export default Cart