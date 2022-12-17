// import { createContext, useReducer } from "react";

// export const ShoppingCart = createContext()

// export const Context = (props)=>{
    
//     const reducer = (state,action)=> {

//         switch(action.type){
//             case 'ADD' :
//                 const tempState = state.filter((item)=> action.payload.id === item.id)
//                 if(tempState.length > 0){
//                     return state;

//                 }else {
//                     return [...state, action.payload];
//                 }
//             case 'INCREASE' :
//                 const tempState1 = state.map((item)=>{
//                     if(item.id === action.payload.id){
//                         return { ...item, quantity : 1 + 1}

//                     }else{
//                         return item
//                     }
//                 })

//                 return tempState1

//             case 'DECREASE' :
//                 const tempState2 = state.map((item)=>{
//                     if (item.id === action.payload.id){
//                         return {...item, quantity: 1 - 1}

//                     }else {
//                         return item
//                     }
//                 })

//                 return tempState2
                
//             case 'REMOVE':
//                 const tempState3 = state.filter((item)=> item.id !== action.payload.id)
//                 return tempState3

//             default:
//                 return state
//         }
//     }
//     const [state, dispatch] = useReducer( reducer, [])
//     const cartInfo = {state, dispatch}

//     return (
//         <ShoppingCart.Provider value = {cartInfo} >
//             {props.children}
//         </ShoppingCart.Provider>
//     )
// }